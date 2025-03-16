import { Effect } from "effect"

const parse = (input: string) =>
	// This might throw an error if input is not valid JSON
	Effect.try(() => JSON.parse(input))

{
	const program = parse("")
	console.log(Effect.runSyncExit(program)._tag === "Success")
}

{
	const mockJson = ` {"id":1,"first_name":"Herbert","last_name":"MacElharge","email":"hmacelharge0@myspace.com","gender":"Male","ip_address":"54.240.172.145"} `
	const program = parse(mockJson)
	console.log(Effect.runSyncExit(program))
}

{
	const mockJson = `
		[{"id":1,"first_name":"Herbert","last_name":"MacElharge","email":"hmacelharge0@myspace.com","gender":"Male","ip_address":"54.240.172.145"},
		{"id":2,"first_name":"Hilde","last_name":"Sparham","email":"hsparham1@ifeng.com","gender":"Polygender","ip_address":"83.152.39.126"},
		{"id":3,"first_name":"Juditha","last_name":"Dutson","email":"jdutson2@japanpost.jp","gender":"Female","ip_address":"149.44.187.155"},
		{"id":4,"first_name":"Anstice","last_name":"Randall","email":"arandall3@economist.com","gender":"Agender","ip_address":"73.230.182.51"},
		{"id":5,"first_name":"Rozalin","last_name":"Yeudall","email":"ryeudall4@networkadvertising.org","gender":"Female","ip_address":"239.171.105.252"}]
	`
	const program = parse(mockJson)
	console.log(Effect.runSyncExit(program))
}
