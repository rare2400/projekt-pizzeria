"use strict";

window.onload = init;

const menu = document.getElementById("menu");
const filter = document.getElementById("filter");
//opening/closing nav-menu
let header = document.querySelector("header");
let navMenuEl = document.getElementById("nav-menu");
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

let dishes = [];

function init() {
    if (menu) {
        fetchMenu();
    }

    if (filter) {
        filter.addEventListener("change", applyFilter);
    }
}

//eventlisteners
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    header.classList.toggle("menu-open");
    navMenuEl.classList.toggle("active");
}

//fetch menu from API
async function fetchMenu() {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/menu")

        if (response.ok) {
            const data = await response.json();
            displayMenu(data);
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

//apply filter to menu
function applyFilter() {
    const filterValue = filter.value;

    if (filterValue === "") {
        displayMenu(dishes);
    } else {
        const filteredDishes = dishes.filter(dish => dish.category === filterValue);
        displayMenu(filteredDishes);
    }
}

//display fetched dishes from API
async function displayMenu(data) {
    menu.innerHTML = "";
    
    if(data.length === 0) {
        menu.textContent = "Det finns ingen meny att visa";
        return;
    }

    //loop data and create elements for menu-items
    data.forEach(dish => {
        const dishBox = document.createElement("div");
        dishBox.classList.add("dish-box");
        const name = document.createElement("h2");
        const ingrAndPrice = document.createElement("div");
        ingrAndPrice.classList.add("ingr-and-price");
        const ingredients = document.createElement("p");
        ingredients.classList.add("ingredients");
        const price = document.createElement("p");
        price.classList.add("price");

        //set content for elements from data
        name.textContent = dish.name;
        ingredients.textContent = dish.ingredients;
        price.textContent = dish.price + " kr";

        //put the elements together
        dishBox.appendChild(name);
        ingrAndPrice.appendChild(ingredients);
        ingrAndPrice.appendChild(price);
        dishBox.appendChild(ingrAndPrice);

        menu.appendChild(dishBox);
    });
}
