import { Stream, Effect } from "effect"

const num = [1, 2, 3];

const s1 = Stream.make(num).pipe(
	Stream.concat(Stream.fail("Oh! Error!")),
	Stream.concat(Stream.make(4, 5))
)

const s2 = Stream.make("a", "b", "c")

const stream = Stream.orElse(s1, () => s2)

Effect.runPromise(Stream.runCollect(stream)).then(console.log)
/*
Output:
{
	_id: "Chunk",
	values: [ 1, 2, 3, "a", "b", "c" ]
}
*/
