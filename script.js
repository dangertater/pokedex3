// let body = document.getElementById("body")
let main = document.getElementById("main")
let pokemonAccordion = document.getElementById("pokemonAccordion")
let searchBarText = document.getElementById("searchBarText")
let searcehButton = document.getElementById("searchButton")
let pokemonNames = []
let fetchedData = []
let numbers = []
let numbersAsString = []
let searchBarInnerText = searchBarText
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

//will generate HTML and modify html main to include a new accordian each time a pokemon is fetched
let accordianItemGenerator = (pokemonName) => {
	let accordianItem = `<div class="accordion-item" id="${pokemonName}">
	<h2 class="accordion-header" id="heading${pokemonName}">
	  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${pokemonName}" aria-expanded="true" aria-controls="collapse${pokemonName}">
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

// let postSearchAccordianItemGenerator = (pokemonName) => {
// 	let postSearchAccordianItem = `<div class="accordion-item" id="${pokemonName}">
// 	<h2 class="accordion-header" id="heading${pokemonName}">
// 	  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${pokemonName}" aria-expanded="true" aria-controls="collapse${pokemonName}">
// 	  ${pokemonName}
// 	  </button>
// 	</h2>
// 	<div id="collapse${pokemonName}" class="accordion-collapse collapse" aria-labelledby="heading${pokemonName}" data-bs-parent="#pokemonAccordion">
// 	  <div class="accordion-body">
// 		<strong>${pokemonName} is a badass</strong>
// 	  </div>
// 	</div>
// 	</div>`
// 	pokemonAccordion.innerHTML = postSearchAccordianItem
// }

searcehButton.addEventListener("click", function () {
	let postSearchAccordianItem = `<div class="accordion-item" id="${searchBarText.value}">
<h2 class="accordion-header" id="heading${searchBarText.value}">
  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${searchBarText.value}" aria-expanded="true" aria-controls="collapse${searchBarText.value}">
  ${searchBarText.value}
  </button>
</h2>
<div id="collapse${searchBarText.value}" class="accordion-collapse collapse" aria-labelledby="heading${searchBarText.value}" data-bs-parent="#pokemonAccordion">
  <div class="accordion-body">
	<strong>${searchBarText.value} is a badass</strong>
  </div>
</div>
</div>`
	pokemonAccordion.innerHTML = postSearchAccordianItem
})
fetchAPI("https://pokeapi.co/api/v2/pokemon")
