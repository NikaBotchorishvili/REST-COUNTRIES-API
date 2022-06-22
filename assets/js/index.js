"use strict";
const xhr = new XMLHttpRequest();

let darkModeCounter = 0;

const countriesEl = document.getElementById("countries");
const paginationEl = document.getElementById("pagination");
const body = document.getElementsByTagName("body")[0];
let current_page = 1;
let rows = 20;

const regionValues = ["Africa", "America", "Asia", "Australia", "Europe"];

const FilterByRegion = () => {
	const filterInput = document.getElementById("region").value;

	if (regionValues.includes(filterInput)) {
		xhr.open("GET", `https://restcountries.com/v3.1/region/${filterInput}`);
	} else {
		xhr.open("GET", "https://restcountries.com/v3.1/all", true);
	}
	xhr.send();
};

xhr.open("GET", "https://restcountries.com/v3.1/all", true);

xhr.send();

xhr.onload = () => {
	if (xhr.status === 200) {
		let json = JSON.parse(xhr.response);
		DisplayCountries(json, rows, current_page);
		SetupPagination(json, paginationEl, rows);
	} else {
		console.log(`Error: ${xhr.status}`);
	}
};

const DisplayCountries = (data, rows_per_page, page) => {
	countriesEl.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;

	for (let i = start; i < end; i++) {
		let card = document.createElement("div");
		let countryFlagEl = document.createElement("img");
		let countryNameEl = document.createElement("h1");
		let countryPopulationEl = document.createElement("h5");
		let countryRegionEl = document.createElement("h5");
		let countryCapitalEl = document.createElement("h5");
		let countryInfoEl = document.createElement("div");

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
		countryInfoEl.classList.add("country_info");

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

const SetupPagination = (countries, wrapper, rows_per_page) => {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(countries.length / rows_per_page);

	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, countries);

		wrapper.appendChild(btn);
	}
};

const PaginationButton = (page, items) => {
	let button = document.createElement("button");
	button.classList.add("p-btn");
	button.innerText = page;

	if (current_page == page) button.classList.add("active");

	button.addEventListener("click", () => {
		current_page = page;

		DisplayCountries(items, rows, page);

		let currentBtn = document.querySelector("#pagination button.active");
		currentBtn.classList.remove("active");

		button.classList.add("active");
	});
	return button;
};

const DarkMode = () => {
	const header = document.getElementById("header");
	const darkModeBtn = document.getElementById("dark-mode-btn");
	const darkModeImage = document.getElementById("dm-img");
	const cards = document.querySelectorAll(".card");
	const inputs = document.querySelectorAll(".inputs");
	const paginationBtns = document.querySelectorAll(".p-btn");

	paginationBtns.forEach((btn) => {
		btn.classList.toggle("dark-p-btn");
	});
	cards.forEach((card) => {
		card.classList.toggle("dark-mode-bg");
	});

	inputs.forEach((e) => {
		e.classList.toggle("dark-mode-bg");
	});

	body.classList.toggle("dark-bg");

	header.classList.toggle("dark-mode-bg");
	darkModeBtn.classList.toggle("dark-btn");
	darkModeImage.classList.toggle("white-dark-mode-img");

	darkModeCounter++;
};
