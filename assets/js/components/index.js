const countriesEl = document.querySelector("#countries");
const paginationEl = document.querySelector("#pagination");
const body = document.querySelector("body");
const regionInputElement = document.querySelector("#region");
const colorSchemeBtn = document.querySelector(".color-scheme-btn");
const searchInputElement = document.querySelector("input[name=search]");
const searchSubmitElement = document.querySelector(".search-submit");
let current_page = 1;
let rows = 20;
let isDarkMode = true;
searchSubmitElement.addEventListener("click", (e) => {
    e.preventDefault();
    let searchInputValue = searchInputElement.value.trim();
    if (searchInputValue.trim() != "") {
        fetch(`https://restcountries.com/v3.1/name/${searchInputValue}?fullText=true`)
            .then((response) => response.json())
            .then((data) => {
            DisplayCountries(data, rows, current_page);
            SetupPagination(data, paginationEl, rows);
        });
    }
});
colorSchemeBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    darkMode();
});
regionInputElement.addEventListener("change", () => {
    init();
});
const init = () => {
    const filterInputElement = document.getElementById("region");
    let filterInputValue = filterInputElement.value;
    fetch(`https://restcountries.com/v3.1/${filterInputValue == "all" ? "all" : `region/${filterInputValue}`}`)
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
const DisplayCountries = (data, rows_per_page, page) => {
    countriesEl.innerHTML = "";
    page--;
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    if (data.length == 1) {
        let card = document.createElement("div");
        let countryFlagEl = document.createElement("img");
        let countryNameEl = document.createElement("a");
        let countryPopulationEl = document.createElement("h5");
        let countryRegionEl = document.createElement("h5");
        let countryCapitalEl = document.createElement("h5");
        let countryInfoEl = document.createElement("div");
        console.log("search");
        let countryImage = data[0].flags.png;
        let countryName = data[0].name.common;
        let countryCapital = data[0].capital;
        let countryPopulation = data[0].population;
        let countryRegion = data[0].region;
        card.classList.add("card");
        countryNameEl.classList.add("country_name");
        countryNameEl.href = `item.html?name=${data[0].name.common.split(" ").join("_")}`;
        countryNameEl.classList.add("white");
        countryPopulationEl.classList.add("population");
        countryRegionEl.classList.add("region");
        countryCapitalEl.classList.add("capital");
        countryInfoEl.classList.add("country_info");
        countryFlagEl.src = countryImage;
        countryNameEl.innerText = countryName;
        countryPopulationEl.innerHTML = "Population: " + countryPopulation;
        countryRegionEl.innerHTML = "Region: " + countryRegion;
        countryCapitalEl.innerText = "Capital: " + countryCapital;
        countryInfoEl.append(countryNameEl, countryPopulationEl, countryRegionEl, countryCapitalEl);
        card.append(countryFlagEl, countryInfoEl);
        countriesEl.appendChild(card);
        darkMode();
    }
    else {
        for (let i = start; i < end; i++) {
            let card = document.createElement("div");
            let countryFlagEl = document.createElement("img");
            let countryNameEl = document.createElement("a");
            let countryPopulationEl = document.createElement("h5");
            let countryRegionEl = document.createElement("h5");
            let countryCapitalEl = document.createElement("h5");
            let countryInfoEl = document.createElement("div");
            let countryImage = data[i].flags.png;
            let countryName = data[i].name.common;
            let countryCapital = data[i].capital;
            let countryPopulation = data[i].population;
            let countryRegion = data[i].region;
            card.classList.add("card");
            countryNameEl.classList.add("country_name");
            countryNameEl.href = `item.html?name=${data[i].name.common
                .split(" ")
                .join("_")}`;
            countryNameEl.classList.add("white");
            countryPopulationEl.classList.add("population");
            countryRegionEl.classList.add("region");
            countryCapitalEl.classList.add("capital");
            countryInfoEl.classList.add("country_info");
            countryFlagEl.src = countryImage;
            countryNameEl.innerText = countryName;
            countryPopulationEl.innerHTML = "Population: " + countryPopulation;
            countryRegionEl.innerHTML = "Region: " + countryRegion;
            countryCapitalEl.innerText = "Capital: " + countryCapital;
            countryInfoEl.append(countryNameEl, countryPopulationEl, countryRegionEl, countryCapitalEl);
            card.append(countryFlagEl, countryInfoEl);
            darkMode();
            countriesEl.appendChild(card);
        }
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
    button.innerText += page;
    if (current_page == page)
        button.classList.add("active");
    button.addEventListener("click", () => {
        current_page = page;
        DisplayCountries(items, rows, page);
        let currentBtn = document.querySelector("#pagination button.active");
        currentBtn.classList.remove("active");
        button.classList.add("active");
    });
    return button;
};
const darkMode = () => {
    const header = document.querySelector(".header");
    const colorSchemeModeImage = document.querySelector(".color-scheme-image");
    const cards = document.querySelectorAll(".card");
    const inputs = document.querySelectorAll(".inputs");
    const paginationButtons = document.querySelectorAll(".p-btn");
    paginationButtons.forEach((btn) => {
        if (isDarkMode) {
            btn.classList.remove("dark-p-btn");
        }
        else {
            btn.classList.add("dark-p-btn");
        }
    });
    cards.forEach((card) => {
        let elements = [
            card.querySelector(".country_name"),
            card.querySelector(".population"),
            card.querySelector(".region"),
            card.querySelector(".capital"),
        ];
        if (isDarkMode) {
            card.classList.remove("dark-mode-bg");
            elements.forEach((element) => element.classList.remove("white"));
        }
        else {
            card.classList.add("dark-mode-bg");
            elements.forEach((element) => element.classList.add("white"));
        }
    });
    inputs.forEach((e) => {
        if (isDarkMode) {
            e.classList.remove("dark-mode-bg");
        }
        else {
            e.classList.add("dark-mode-bg");
        }
    });
    if (isDarkMode) {
        body.classList.remove("dark-bg");
        header.classList.remove("dark-mode-bg");
        colorSchemeBtn.classList.remove("dark-btn");
        colorSchemeModeImage.classList.remove("white-dark-mode-img");
    }
    else {
        body.classList.add("dark-bg");
        header.classList.add("dark-mode-bg");
        colorSchemeBtn.classList.add("dark-btn");
        colorSchemeModeImage.classList.add("white-dark-mode-img");
    }
};
export {};
