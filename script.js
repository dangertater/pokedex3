// let body = document.getElementById("body")
// let main = document.getElementById("main")
let pushedArray = []
let fetchedData = []
let fetchAPI = async (url) => {
	const res = await fetch(url)
	const data = await res.json()
	pushArray(data)
	return data
}

let pushArray = (data) => {
	pushedArray.push(data)
	console.log(pushedArray[0])
}

fetchAPI("https://pokeapi.co/api/v2/pokemon")

// console.log(fetchedData)
// console.log("pushedArray", pushedArray.results)
