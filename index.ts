import {
	FetchHttpClient,
	HttpClient,
	HttpClientResponse,
} from "@effect/platform";
import type { HttpClientError } from "@effect/platform/HttpClientError";
import { Console, Effect, Schema } from "effect";
import type { ParseError } from "effect/ParseResult";
import { BunRuntime } from "@effect/platform-bun";

// divide by zero
// const divide = (a: number, b: number): Effect.Effect<number, Error> => {
// 	return b === 0
// 		? Effect.fail(new Error("Can't devide by zero"))
// 		: Effect.succeed(a / b);
// };
// Effect.runSync(divide(10, 2).pipe(Effect.map((res) => console.log(res))));

//simple fetch API
const UserSchema = Schema.Struct({
	id: Schema.Number,
	name: Schema.String,
});
type User = typeof UserSchema.Type;

const getUser = (
	id: number,
): Effect.Effect<User, HttpClientError | ParseError> => {
	return HttpClient.get(
		`https://jsonplaceholder.typicode.com/users/${id}`,
	).pipe(
		Effect.flatMap(HttpClientResponse.schemaBodyJson(UserSchema)),
		Effect.scoped,
		Effect.provide(FetchHttpClient.layer),
	);
};

const d = Effect.match(getUser(1), {
	onFailure: (error) => {
		if (error.name === "RequestError") {
			return "Request error";
		} else if (error.name === "ResponseError") {
			return "Response error";
		} else if (error.name === "ParseError") {
			return "parse error";
		} else {
			return "unknown error";
		}
	},
	onSuccess: (user) => {
		return user;
	},
});

BunRuntime.runMain(d.pipe(Effect.andThen((user) => console.log(user))));
