// import { isDarkMode, toggleDarkMode } from "../common/common.js";
import { dataType } from "../types/types.js";
const backButtonElement = document.querySelector(
	".back-btn"
) as HTMLButtonElement;

const detailsContainerElement = document.querySelector(
	".details-container"
) as HTMLElement;

const colorSchemeBtn = document.querySelector(
	".color-scheme-btn"
) as HTMLElement;

let isDarkMode = false;
colorSchemeBtn.addEventListener("click", () => {
	isDarkMode = !isDarkMode;
	darkMode();
});
backButtonElement.addEventListener("click", () => {
	window.history.back();
});

const init = () => {
	const urlParams = new URLSearchParams(window.location.search);
	let name = urlParams.get("name");
	fetch("https://restcountries.com/v3.1/all")
		.then((response) => response.json())
		.then((data) => {
			if (name) {
				let item = findItem(data, name);
				if (item) {
					document.title = item.name.official;
					renderDetails(item, data);
				}
			}
		})
		.catch((error) => {
			throw error;
		});
};
init();

const findItem = (data: dataType[], name: string) => {
	return data.find((item) => {
		let n = item.name.common.split(" ").join("_");
		if (n == name) {
			return item;
		}
	});
};

const renderDetails = (item: dataType, data: dataType[]) => {
	const flagContainer = document.createElement("span");
	const flag = document.createElement("img");
	const detailsInfo = details(item, data);
	flag.src = item.flags.svg;
	flag.alt = item.flags.alt;

	flagContainer.classList.add("details-flag");
	flagContainer.appendChild(flag);
	darkMode();

	detailsContainerElement.append(flagContainer, detailsInfo);
};

const details = (item: dataType, data: dataType[]) => {
	const detailsInfoContainer = document.createElement("div");
	const detailsInfo = document.createElement("div");
	const borderingCountriesContainerElement = document.createElement("div");

	const countryElementContainer = document.createElement("div");
	const countryNameElement = document.createElement("h1");

	const detailsCol1 = document.createElement("div");

	const nativeNameContainer = document.createElement("div");
	const populationContainer = document.createElement("div");
	const regionContainer = document.createElement("div");
	const subRegionContainer = document.createElement("div");
	const capitalContainer = document.createElement("div");

	const nativeNameElementName = document.createElement("span");
	const populationElementName = document.createElement("span");
	const regionElementName = document.createElement("span");
	const subRegionElementName = document.createElement("span");
	const capitalElementName = document.createElement("span");

	const nativeNameElement = document.createElement("span");
	const populationElement = document.createElement("span");
	const regionElement = document.createElement("span");
	const subRegionElement = document.createElement("span");
	const capitalElement = document.createElement("span");

	countryNameElement.innerText = item.name.official;

	nativeNameElementName.innerText = "Native Name:";
	nativeNameElement.innerText = item.name.common;
	nativeNameContainer.append(nativeNameElementName, nativeNameElement);

	populationElementName.innerText = "Population:";
	populationElement.innerText = item.population.toString();
	populationContainer.append(populationElementName, populationElement);

	regionElementName.innerText = "Region:";
	regionElement.innerText = item.region;
	regionContainer.append(regionElementName, regionElement);

	subRegionElementName.innerText = "Sub Region:";
	subRegionElement.innerText = item.subregion;
	subRegionContainer.append(subRegionElementName, subRegionElement);

	capitalElementName.innerText = "Capital:";
	capitalElement.innerText =
		item.capital.length === 0 ? item.capital[0] : item.capital.join(", ");
	capitalContainer.append(capitalElementName, capitalElement);

	detailsCol1.append(
		nativeNameContainer,
		populationContainer,
		regionContainer,
		subRegionContainer,
		capitalContainer
	);
	const detailsCol2 = document.createElement("div");

	const topLevelDomainContainer = document.createElement("div");
	const currenciesContainer = document.createElement("div");
	const languagesContainer = document.createElement("div");

	const topLevelDomainElementName = document.createElement("span");
	const currenciesElementName = document.createElement("span");
	const languagesElementName = document.createElement("span");

	const topLevelDomainElement = document.createElement("span");
	const currenciesElement = document.createElement("span");
	const languagesElement = document.createElement("span");

	topLevelDomainElementName.innerText = "Top Level Domain:";
	topLevelDomainElement.innerText =
		item.tld.length > 1 ? item.tld.join(", ") : item.tld[0];
	topLevelDomainContainer.append(
		topLevelDomainElementName,
		topLevelDomainElement
	);

	let languages = Object.entries(item.languages).map((l) => l[1]);
	languagesElementName.innerText = "Languages:";
	languagesElement.innerText = `${
		languages.length === 1 ? languages[0] : languages.join(", ")
	}`;
	languagesContainer.append(languagesElementName, languagesElement);

	let currencies = Object.entries(item.currencies).map(
		(currency) => currency[0]
	);
	currenciesElementName.innerText = "Currencies:";
	currenciesElement.innerText = `${
		currencies.length === 1 ? currencies[0] : currencies.join(", ")
	}`;
	currenciesContainer.append(currenciesElementName, currenciesElement);

	detailsCol2.append(
		topLevelDomainContainer,
		languagesContainer,
		currenciesContainer
	);

	detailsInfo.append(detailsCol1, detailsCol2);

	countryElementContainer.classList.add("country_name");
	detailsInfoContainer.classList.add("details-info-container");

	detailsCol1.classList.add("details-col", "col-1");
	detailsCol2.classList.add("details-col", "col-2");
	detailsInfo.classList.add("details-info");

	countryElementContainer.appendChild(countryNameElement);

	const borderingHeaderElement = document.createElement("h2");
	const detailsBorderCountries = document.createElement("span");

	borderingHeaderElement.innerText = "Border Countries:";
	borderingCountriesContainerElement.classList.add(
		"details-border-countries-container"
	);
	detailsBorderCountries.classList.add("details-border-countries");
	if (item.borders) {
		data.forEach((it) => {
			if (item.borders.includes(it.cca3)) {
				let borderCountryLink = document.createElement("a");
				borderCountryLink.classList.add("border-link");
				borderCountryLink.innerText = it.name.common;
				borderCountryLink.href = `item.html?name=${it.name.common
					.split(" ")
					.join("_")}`;
				detailsBorderCountries.appendChild(borderCountryLink);
			}
		});
	}
	borderingCountriesContainerElement.append(
		borderingHeaderElement,
		detailsBorderCountries
	);
	detailsInfoContainer.append(
		countryElementContainer,
		detailsInfo,
		borderingCountriesContainerElement
	);
	return detailsInfoContainer;
};

const darkMode = () => {
	const header = document.querySelector(".header") as HTMLElement;
	const body = document.querySelector("body") as HTMLElement;
	const colorSchemeModeImage = document.querySelector(
		".color-scheme-image"
	) as HTMLElement;
	const borderLinks = document.querySelectorAll(".border-link");

	if (!isDarkMode) {
		header.classList.remove("dark-mode-bg");
		body.classList.remove("dark-bg");
		backButtonElement.classList.remove("dark-btn");
		colorSchemeBtn.classList.remove("dark-btn");
		colorSchemeModeImage.classList.remove("white-dark-mode-img");
		detailsContainerElement.classList.remove("white");
		borderLinks.forEach((link) => {
			link.classList.remove("dark-mode-bg")
			link.classList.remove("white")
			link.classList.remove("white-outline")
		})
		backButtonElement.classList.remove("dark-mode-bg", "white");
	} else {
		header.classList.add("dark-mode-bg");
		body.classList.add("dark-bg");
		colorSchemeBtn.classList.add("dark-btn");
		colorSchemeModeImage.classList.add("white-dark-mode-img");
		detailsContainerElement.classList.add("white");
		backButtonElement.classList.add("dark-btn");
		borderLinks.forEach((link) => {
			link.classList.add("dark-mode-bg")
			link.classList.add("white")
			link.classList.add("white-outline")

		})
		backButtonElement.classList.add("dark-mode-bg", "white")
	}
};
