import { Effect, Random } from "effect"

class HttpError {
	readonly _tag = "HttpError"
}

//      ┌─── Effect<string, HttpError, never>
//      ▼

const program = Effect.gen(function*() {
	// Generate a random number between 0 and 1
	const n = yield* Random.next

	// Simulate an HTTP error
	if (n < 0.5) {
		yield* Effect.fail(new HttpError())
	}

	return "some result"
})
