type data = {
	altSpellings: string[];
	area: number;
	borders: string[];
	capital: string[];
	capitalInfo: { latlng: number[] };
	car: { side: string; signs: string[] };
	cca2: string;
	cca3: string;
	ccn3: string;
	cioc: string;
	coatOfArms: { png: string; svg: string };
	continents: string[];
	fifa: string;
	flag: string;
	flags: { png: string; svg: string; alt: string };
	independent: boolean;
	landlocked: boolean;
	name: { common: string; official: string };
	population: number;
	region: string;
	startOfWeek: string;
	status: string;
	subregion: string;
	timezones: string[];
	tld: string[];
	unMember: boolean;
};

const countriesEl = document.querySelector("#countries") as HTMLElement;
const paginationEl = document.querySelector("#pagination") as HTMLElement; 
const body = document.querySelector("body") as HTMLElement;
const regionInputElement = document.querySelector("#region") as HTMLSelectElement;
const colorSchemeBtn = document.querySelector(
	".color-scheme-btn"
) as HTMLElement;
let current_page = 1;
let rows = 20;

const regionValues = ["Africa", "America", "Asia", "Australia", "Europe"];

colorSchemeBtn.addEventListener("click", () => {
	darkMode()
})

regionInputElement.addEventListener("change", () => {
	init();
})
const init = () => {
	const filterInputElement = document.getElementById(
		"region"
	) as HTMLInputElement;
	let filterInputValue = filterInputElement.value;

	fetch(
		`https://restcountries.com/v3.1/${
			filterInputValue == "all" ? "all" : `region/${filterInputValue}`
		}`
	)
		.then((response) => response.json())
		.then((data) => {
			DisplayCountries(data, rows, current_page);
			SetupPagination(data, paginationEl, rows);
		})
		.catch((error) => {
			console.log(`Error: ${error}`);
		});
};

init();

const DisplayCountries = (data: data[], rows_per_page: number, page: number) => {
	countriesEl.innerHTML = "";
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;

	for (let i = start; i < end; i++) {
		let card = document.createElement("div");
		let countryFlagEl = document.createElement("img");
		let countryNameEl = document.createElement("a");
		let countryPopulationEl = document.createElement("h5");
		let countryRegionEl = document.createElement("h5");
		let countryCapitalEl = document.createElement("h5");
		let countryInfoEl = document.createElement("div");

		let countryImage: string = data[i].flags.png;
		let countryName = data[i].name.common;
		let countryCapital = data[i].capital;
		let countryPopulation = data[i].population;
		let countryRegion = data[i].region;

		card.classList.add("card");
		countryNameEl.classList.add("country_name");

		countryNameEl.href = `item.html?id=${i}`;
		countryNameEl.classList.add("white")
		countryPopulationEl.classList.add("population");
		countryRegionEl.classList.add("region");
		countryCapitalEl.classList.add("capital");
		countryInfoEl.classList.add("country_info");

		countryFlagEl.src = countryImage;

		countryNameEl.innerText = countryName;
		countryPopulationEl.innerHTML = "Population: " + countryPopulation;
		countryRegionEl.innerHTML = "Region: " + countryRegion;
		countryCapitalEl.innerText = "Capital: " + countryCapital;

		countryInfoEl.append(
			countryNameEl,
			countryPopulationEl,
			countryRegionEl,
			countryCapitalEl
		);
		card.append(countryFlagEl, countryInfoEl);
		darkMode()
		countriesEl.appendChild(card);
	}
};

const SetupPagination = (countries: data[], wrapper: HTMLElement, rows_per_page: number) => {
	wrapper.innerHTML = "";
	let page_count = Math.ceil(countries.length / rows_per_page);

	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, countries);

		wrapper.appendChild(btn);
	}
};

const PaginationButton = (page: number, items: data[]) => {
	let button = document.createElement("button") as HTMLButtonElement;
	button.classList.add("p-btn");
	button.innerText += page;

	if (current_page == page) button.classList.add("active");

	button.addEventListener("click", () => {
		current_page = page;

		DisplayCountries(items, rows, page);

		let currentBtn = document.querySelector(
			"#pagination button.active"
		) as HTMLButtonElement;
		currentBtn.classList.remove("active");

		button.classList.add("active");
	});
	return button;
};

const darkMode = () => {
	const header = document.querySelector(".header") as HTMLElement;
	const colorSchemeModeImage = document.querySelector(
		".color-scheme-image"
	) as HTMLElement;
	const cards = document.querySelectorAll(".card");
	const inputs = document.querySelectorAll(".inputs");
	const paginationBtns = document.querySelectorAll(".p-btn");

	paginationBtns.forEach((btn) => {
		btn.classList.toggle("dark-p-btn");
	});
	cards.forEach((card) => {
		let elements = [
			card.querySelector(".country_name") as HTMLElement,
			card.querySelector(".population") as HTMLElement,
			card.querySelector(".region") as HTMLElement,
			card.querySelector(".capital") as HTMLElement,
		]
		if(isDarkMode){
			card.classList.remove("dark-mode-bg");
			elements.forEach((element) => element.classList.remove("white"))
			
		}else{
			card.classList.add("dark-mode-bg");
			elements.forEach((element) => element.classList.add("white"))

		}

	});

	inputs.forEach((e) => {
		e.classList.toggle("dark-mode-bg");
	});

	body.classList.toggle("dark-bg");

	header.classList.toggle("dark-mode-bg");
	colorSchemeBtn.classList.toggle("dark-btn");
	colorSchemeModeImage.classList.toggle("white-dark-mode-img");
	isDarkMode = !isDarkMode;
};
