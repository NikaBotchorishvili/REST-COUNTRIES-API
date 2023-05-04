"use strict";
const countriesEl = document.querySelector("#countries");
const paginationEl = document.querySelector("#pagination");
const body = document.querySelector("body");
let current_page = 1;
let rows = 20;
let darkMode = false;
let data = [];
const regionValues = ["Africa", "America", "Asia", "Australia", "Europe"];
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
        countryNameEl.href = `item.html?id=${i}`;
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
        DarkMode();
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
const DarkMode = () => {
    const header = document.querySelector(".header");
    const colorSchemeBtn = document.querySelector(".color-scheme-btn");
    const colorSchemeModeImage = document.querySelector(".color-scheme-image");
    const cards = document.querySelectorAll(".card");
    const inputs = document.querySelectorAll(".inputs");
    const paginationBtns = document.querySelectorAll(".p-btn");
    paginationBtns.forEach((btn) => {
        btn.classList.toggle("dark-p-btn");
    });
    cards.forEach((card) => {
        let countryName = card.querySelector(".country_name");
        if (darkMode) {
            card.classList.remove("dark-mode-bg");
            countryName.classList.remove("white");
        }
        else {
            card.classList.add("dark-mode-bg");
            countryName.classList.add("white");
        }
    });
    inputs.forEach((e) => {
        e.classList.toggle("dark-mode-bg");
    });
    body.classList.toggle("dark-bg");
    header.classList.toggle("dark-mode-bg");
    colorSchemeBtn.classList.toggle("dark-btn");
    colorSchemeModeImage.classList.toggle("white-dark-mode-img");
    darkMode = !darkMode;
};
