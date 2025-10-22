"use strict";

//fetch elements 
const menu = document.getElementById("menu");
const btnConatiner = document.getElementById("filter-btns");

//array for the dishes in the API
let dishes = [];

if (menu) {
    fetchMenu();
}


//fetch menu from API
async function fetchMenu() {
    try {
        const response = await fetch("https://projekt-api-73oa.onrender.com/api/menu");

        if (response.ok) {
            const data = await response.json();
            dishes = data;

            //create filterbuttons from categories in the fetched data
            createFilterBtns(dishes);

            //display the menu
            displayMenu(dishes);
        } else {
            console.error("Fel vid hämtning:", response.status);
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

//create filterbuttons
function createFilterBtns(data) {
    btnConatiner.innerHTML = "";

    //get unique categories from data
    const categories = [...new Set(data.map(dish => dish.category))];

    //button showing all dishes
    const allBtn = document.createElement("button");
    allBtn.textContent = "Visa alla";
    allBtn.dataset.category = "";
    btnConatiner.appendChild(allBtn);

    //create buttons för every unique category
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.dataset.category = category;
        btnConatiner.appendChild(btn);
    });

    //add eventlistener to buttons
    const filterBtns = btnConatiner.querySelectorAll("button");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            applyFilter(btn.dataset.category);

            //activate style on clicked button
            activateBtn(btn)
        });
    });
}

//add style on active button
function activateBtn(activeBtn) {
    const filterBtn = document.querySelectorAll("#filter-btns button");
    filterBtn.forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

//apply filter to menu
function applyFilter(category) {

    if (category === "") {
        displayMenu(dishes);
    } else {
        const filteredDishes = dishes.filter(dish => dish.category === category);
        displayMenu(filteredDishes);
    }
}

//display fetched dishes from API
function displayMenu(data) {
    menu.innerHTML = "";

    if (data.length === 0) {
        menu.textContent = "Det finns ingen meny att visa";
        return;
    }

    //order to display the menu in
    const menuOrder = [
        "Pizza klass 1",
        "Pizza klass 2",
        "Pizza klass 3",
        "Pizza klass 4",
        "Italian Pizza",
        "Sallad",
        "Kebab",
        "Hamburger",
        "Sauce",
        "Sides",
        "Dryck"
    ];

    //sorting
    data.sort((a, b) => {
        const indexA = menuOrder.indexOf(a.category);
        const indexB = menuOrder.indexOf(b.category);

        //if something is wrong with sorting, it gets in the bottom
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    //loop data and create elements for menu-items
    data.forEach(dish => {
        const dishBox = document.createElement("div");
        dishBox.classList.add("dish-box");

        const name = document.createElement("h2");

        const nameAndPrice = document.createElement("div");
        nameAndPrice.classList.add("name-and-price");

        const ingredients = document.createElement("p");
        ingredients.classList.add("ingredients");

        const price = document.createElement("p");
        price.classList.add("price");

        //set content for elements from data
        name.textContent = dish.name;

        if (dish.ingredients) {
            ingredients.textContent = dish.ingredients;
        } else {
            ingredients.textContent = "";
        }

        price.textContent = dish.price + "kr";

        //put the elements together
        nameAndPrice.appendChild(name);
        nameAndPrice.appendChild(price);
        dishBox.appendChild(nameAndPrice);
        dishBox.appendChild(ingredients);

        menu.appendChild(dishBox);
    });
}