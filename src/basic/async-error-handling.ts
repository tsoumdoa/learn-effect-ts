// https://effect.website/docs/getting-started/creating-effects
import { exitResponse } from "@effect/platform/HttpServerError"
import { Effect } from "effect"


//promise
const delay = (message: string) =>
	Effect.promise<string>(
		() =>
			new Promise((resolve) => {
				setTimeout(() => {
					resolve(message)
				}, 1000)
			})
	)

const programPromise = delay("Async operation completed successfully!")
const resPromise = await Effect.runPromiseExit(programPromise)
console.log(resPromise._tag === "Success")


//tryPromise
//
const getTodo = (id: number) =>
	Effect.tryPromise({
		try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
		catch: (unknown) => new Error(`something went wrong ${unknown}`)
	}
	)


const programTryPromise = getTodo(1)
const resTryPromise = await Effect.runPromiseExit(programTryPromise)
if (resTryPromise._tag === "Success") {
	console.log(resTryPromise.value)
} else {
	console.log(resTryPromise.cause)
	// console.log(resTryPromise._op)
}

