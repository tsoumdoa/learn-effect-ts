//https://effect.website/docs/getting-started/creating-effects/#succeed
//
import { Effect } from "effect"

// Define a User type
interface User {
	readonly id: number
	readonly name: string
}

const mockUserDatabase: Record<number, User> = {
	1: { id: 1, name: "John Doe" },
	2: { id: 2, name: "Jane Smith" }
}

// A mocked function to simulate fetching a user from a database
const getUser = (userId: number): Effect.Effect<User, Error> => {
	// Normally, you would access a database or API here, but we'll mock it

	// Check if the user exists in our "database" and return appropriately
	const user = mockUserDatabase[userId]
	if (user) {
		return Effect.succeed(user)
	} else {
		return Effect.fail(new Error("User not found"))
	}
}

// When executed, this will successfully return the user with id 1
const exampleUserEffect = getUser(2)
const result = Effect.runSync(exampleUserEffect)
console.log(result._tag === "Success")
