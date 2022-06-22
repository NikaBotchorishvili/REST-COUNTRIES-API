const xhr = new XMLHttpRequest();

const countriesEl = document.getElementById("countries");
const paginationEl = document.getElementById("pagination");
let current_page = 1;
let rows = 20;

xhr.open("GET", "https://restcountries.com/v3.1/all", true);
xhr.send();

xhr.onload = () => {
	if (xhr.status === 200) {
		let json = JSON.parse(xhr.response);

		DisplayCountries(json, rows, current_page);

	} else {
		console.log(`Error: ${xhr.status}`);
	}
};

const DisplayCountries = (data, rows_per_page, page) => {
	countriesEl.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginated_items = data.slice(start, end);

	for (let i = start; i < paginated_items.length; i++) {
		let card = document.createElement("div");
		let countryFlagEl = document.createElement("img");
		let countryNameEl = document.createElement("h1");
		let countryPopulationEl = document.createElement("h5");
		let countryRegionEl = document.createElement("h5");
		let countryCapitalEl = document.createElement("h5");

		let countryImageSvg = data[i].flags.png;
		let countryName = data[i].name.common;
		let countryCapital = data[i].capital;
		let countryPopulation = data[i].population;
		let countryRegion = data[i].region;

		card.classList.add("card");
		countryNameEl.classList.add("country_name");
		countryPopulationEl.classList.add("population");
		countryRegionEl.classList.add("region");
		countryCapitalEl.classList.add("capital");

		countryFlagEl.src = countryImageSvg;
		countryNameEl.innerText = countryName;
		countryPopulationEl.innerHTML = "Population: " + countryPopulation;
		countryRegionEl.innerHTML = "Region: " + countryRegion;
		countryCapitalEl.innerText = "Capital: " + countryCapital;

		card.appendChild(countryFlagEl);
		card.appendChild(countryNameEl);
		card.appendChild(countryPopulationEl);
		card.appendChild(countryRegionEl);
		card.appendChild(countryCapitalEl);

		countriesEl.appendChild(card);
	}
};

