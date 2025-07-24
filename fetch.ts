
import { Effect, Schema, Schedule } from "effect";
import {
	FetchHttpClient,
	HttpClient,
	HttpClientResponse,
} from "@effect/platform";

const User = Schema.Struct({
	id: Schema.Number,
	name: Schema.String,
});


const fetchUser = Effect.fn(function*(id: number) {
	const client = yield* HttpClient.HttpClient;

	const response = yield* client.get(
		`https://jsonplaceholder.typicode.com/users/${id}`,
	);

	const user = yield* HttpClientResponse.schemaBodyJson(User)(response);
	return user;
});

const program = Effect.gen(function*() {
	const user = yield* fetchUser(3);
	return yield* Effect.succeed({ success: true, user } as const);
});

const r = await Effect.runPromise(
	program.pipe(
		Effect.tapError((error) =>
			//for logging 
			Effect.log(`Retry attempt failed: ${error._tag} - ${error.message}`)
		),
		Effect.retry(
			//retry 3 times
			Schedule.exponential("100 millis").pipe(
				Schedule.intersect(Schedule.recurs(3)),
			),
		),
		Effect.catchTags({
			//catching error based on tag
			ResponseError: (e) => {
				return Effect.succeed({ success: false, error: e } as const);
			},
			RequestError: (e) => {
				return Effect.succeed({ success: false, error: e } as const);
			},
		}),
		Effect.provide(FetchHttpClient.layer),
	)
)

console.log(r);
