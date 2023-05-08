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
	darkMode();
	isDarkMode = !isDarkMode;
})
backButtonElement.addEventListener("click", () => {
	window.history.back();
});

const init = () => {
	const urlParams = new URLSearchParams(window.location.search);
	let filterType = urlParams.get("filterType");
	let id = Number(urlParams.get("id"));
	fetch(
		`https://restcountries.com/v3.1/${
			filterType == "all" ? "all" : `region/${filterType}`
		}`
	)
		.then((response) => response.json())
		.then((data) => {
			data = findItem(data, id);
			document.title = data.name.official

			renderDetails(data);
		})
		.catch((error) => {
			throw error;
		});
};
init();

const findItem = (data: dataType[], id: number) => {
	return data.find((item, index) => {
		if (index === id) {
			return item;
		}
	});
};

const renderDetails = (data: dataType) => {
	const flagContainer = document.createElement("span");
	const flag = document.createElement("img");
	const detailsInfo = details(data);
	flag.src = data.flags.svg;
	flag.alt = data.flags.alt;

	flagContainer.classList.add("details-flag");
	flagContainer.appendChild(flag);

	detailsContainerElement.append(flagContainer, detailsInfo);
};

const details = (data: dataType) => {
	const detailsInfoContainer = document.createElement("div");
	const detailsInfo = document.createElement("div");

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

	countryNameElement.innerText = data.name.official;

	nativeNameElementName.innerText = "Native Name:";
	nativeNameElement.innerText = data.name.common;
	nativeNameContainer.append(nativeNameElementName, nativeNameElement);

	populationElementName.innerText = "Population:";
	populationElement.innerText = data.population.toString();
	populationContainer.append(populationElementName, populationElement);

	regionElementName.innerText = "Region:";
	regionElement.innerText = data.region;
	regionContainer.append(regionElementName, regionElement);

	subRegionElementName.innerText = "Sub Region:";
	subRegionElement.innerText = data.subregion;
	subRegionContainer.append(subRegionElementName, subRegionElement);

	capitalElementName.innerText = "Capital:";
	capitalElement.innerText = data.capital.length === 0? data.capital[0]: data.capital.join(", ");
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
		data.tld.length > 1 ? data.tld.join(", ") : data.tld[0];
	topLevelDomainContainer.append(
		topLevelDomainElementName,
		topLevelDomainElement
	);

    let languages = Object.entries(data.languages).map((l) => l[1]);
    languagesElementName.innerText = "Languages:";
    languagesElement.innerText = `${languages.length === 1? languages[0]: languages.join(", ")}`;
    languagesContainer.append(languagesElementName, languagesElement);

    let currencies = Object.entries(data.currencies).map((currency) => currency[0]);
	currenciesElementName.innerText = "Currencies:";
    currenciesElement.innerText = `${currencies.length === 1? currencies[0]: currencies.join(", ")}`
    currenciesContainer.append(currenciesElementName, currenciesElement);

	detailsCol2.append(topLevelDomainContainer, languagesContainer, currenciesContainer);

	detailsInfo.append(detailsCol1, detailsCol2);

	countryElementContainer.classList.add("country_name");
	detailsInfoContainer.classList.add("details-info-container");

	detailsCol1.classList.add("details-col", "col-1");
	detailsCol2.classList.add("details-col", "col-2");
	detailsInfo.classList.add("details-info");

	countryElementContainer.appendChild(countryNameElement);

	detailsInfoContainer.append(countryElementContainer, detailsInfo);

	return detailsInfoContainer;
};

const darkMode = () => {
	const header = document.querySelector(".header") as HTMLElement;
	const body = document.querySelector("body") as HTMLElement;
	const colorSchemeModeImage = document.querySelector(
		".color-scheme-image"
	) as HTMLElement;


	if(isDarkMode){
		header.classList.remove("dark-mode-bg");
		body.classList.remove("dark-bg");
		backButtonElement.classList.remove("dark-btn");
		colorSchemeBtn.classList.remove("dark-btn");
		colorSchemeModeImage.classList.remove("white-dark-mode-img");
		detailsContainerElement.classList.remove("white")
	}else{
		header.classList.add("dark-mode-bg")
		body.classList.add("dark-bg");
		colorSchemeBtn.classList.add("dark-btn");
		colorSchemeModeImage.classList.add("white-dark-mode-img");
		detailsContainerElement.classList.add("white")

		backButtonElement.classList.add("dark-btn")
	}
}