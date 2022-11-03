//TODO implement onclick to fetch pokemon api for pokedex info + starting abilities
//TODO replace input window with dropdown of all pokemon
//TODO accordian generator is producing CapCamelCase instead of camelCase, fix it
// let body = document.getElementById("body")
let main = document.getElementById("main")
let pokemonAccordion = document.getElementById("pokemonAccordion")
let searchBarText = document.getElementById("searchBarText")
let searcehButton = document.getElementById("searchButton")
let pokemonNames = []
let numbers = []
let numbersAsString = []
let searchBarInnerText = searchBarText
let onClickFetchedData = []

//initiates fetching of data and generation of html w pokemon
let fetchAPI = async (url) => {
	if (pokemonNames.length > 150) {
		return null
	}
	const res = await fetch(url)
	const data = await res.json()
	await pushPokemonNames(data)
	console.log(pokemonNames)
	let nextURL = data.next
	await fetchAPI(nextURL)
}

//onClick of pokemon will fetch the pokemon's API and add pokedex entry + starting abilities
//is async just for practice, it is farsically important for it only to run after 'importantFunc()' runs
let theReFetchening = async (url) => {
	let res = await fetch(url)
	let data = await res.json()
	console.log(data)
	await importantFunc()
	console.log(data)
}
//q4e, this right? added 'onClick=${indyPokemonButton()}' right into the accordian generator
//----https://stackoverflow.com/questions/4825295/onclick-to-get-the-id-of-the-clicked-button
let testButton = () => {
	console.log("testButton with onclick in html")
}

let indyPokemonButton = (pokemonNameTest) => {
	console.log("indyPokemonButton", pokemonNameTest)
}

// indyPokemonButton.addEventListener("click", function (e) {
// 	let indyPokemonButton = e.target
// 	console.log("indyPokemonButton", indyPokemonButton)
// })

//it is important this function completes its biz before theReFetchening() fetches and implements API
// returns truthy
let importantFunc = async () => {
	setTimeout(() => {
		console.log("importantFunc 2 second timer")
		return 2 + 2
	}, 2000)
}
//accordian item per pokemon is id="${pokemonName}
//will generate HTML and modify html main to include a new accordian each time a pokemon is fetched
let accordianItemGenerator = (pokemonName) => {
	let accordianItem = `<div class="accordion-item" id="${pokemonName}">
	<h2 class="accordion-header" id="heading${pokemonName}">
	  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${pokemonName}" aria-expanded="true" aria-controls="collapse${pokemonName}" id="${pokemonName}Button"
	  onClick='indyPokemonButton(this.id)' >
	  ${pokemonName}
	  </button>
	</h2>
	<div id="collapse${pokemonName}" class="accordion-collapse collapse" aria-labelledby="heading${pokemonName}" data-bs-parent="#pokemonAccordion">
	  <div class="accordion-body">
		<strong>${pokemonName} is a badass</strong>
	  </div>
	</div>
	</div>`
	pokemonAccordion.innerHTML = pokemonAccordion.innerHTML + accordianItem
}

//pushes the name property into an array pokemonNames
let pushPokemonNames = async (data) => {
	for (let singlePokemon of data.results) {
		let cappedName = _.capitalize(singlePokemon.name)
		pokemonNames.push(cappedName)
		if (cappedName === "Chikorita") {
			return null
		} else {
			accordianItemGenerator(cappedName)
		}
	}
}

//create false button
//make js 'click' it
searcehButton.addEventListener("click", function (e) {
	let searchText = searchBarText.value
	let pokemonButton = document.getElementById(`${searchText}Button`)
	if (pokemonButton === null) {
		window.alert("no pokemon jose")
	} else {
		pokemonButton.click()
	}
})
fetchAPI("https://pokeapi.co/api/v2/pokemon")
// the below function causes all accordian itmes except searched pokemon to disappear
// searcehButton.addEventListener("click", function () {
// 	let postSearchAccordianItem = `<div class="accordion-item" id="${searchBarText.value}">
// <h2 class="accordion-header" id="heading${searchBarText.value}">
//   <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${searchBarText.value}" aria-expanded="true" aria-controls="collapse${searchBarText.value}">
//   ${searchBarText.value}
//   </button>
// </h2>
// <div id="collapse${searchBarText.value}" class="accordion-collapse collapse" aria-labelledby="heading${searchBarText.value}" data-bs-parent="#pokemonAccordion">
//   <div class="accordion-body">
// 	<strong>${searchBarText.value} is a badass</strong>
//   </div>
// </div>
// </div>`
// 	pokemonAccordion.innerHTML = postSearchAccordianItem
// })
