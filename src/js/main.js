"use strict";

//opening/closing nav-menu
let header = document.querySelector("header");
let navMenuEl = document.getElementById("nav-menu");
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");


//eventlisteners
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    header.classList.toggle("menu-open");
    navMenuEl.classList.toggle("active");
}