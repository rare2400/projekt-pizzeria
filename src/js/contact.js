"use strict";

const form = document.getElementById("contact-form");

//elements for phone number input
const checkbox = document.getElementById("number-checkbox");
const phoneWrapper = document.getElementById("phone-wrapper");
const phoneInput = document.getElementById("phoneNr");

//toggle phone number input
checkbox.addEventListener("change", toggleInput);

function toggleInput() {
    if (checkbox.checked) {
        phoneWrapper.style.display = "block";
        phoneInput.required = true;
    } else {
        phoneWrapper.style.display = "none";
        phoneInput.required = false;
        phoneInput.value = "";
    }
}

//check if form exists before adding event listener
if (form) {
    form.addEventListener("submit", createMessage);
} else {
    console.log("form not found");
}

//create a new message
async function createMessage(e) {
    e.preventDefault();

    //fetch input values
    let nameInput = document.getElementById("name").value;
    let emailInput = document.getElementById("email").value;
    let phoneNrInput = document.getElementById("phoneNr").value;
    let messageInput = document.getElementById("message").value;
    let errorMsg = document.getElementById("error-msg");

    //validate required input
    if (!nameInput || !emailInput || !messageInput) {
        errorMsg.textContent = "Fyll i alla fält!";
        return;
    }

    //create message-object
    let message = {
        name: nameInput,
        email: emailInput,
        phoneNumber: phoneNrInput,
        message: messageInput
    }

    //POST new message to API
    try {
        const response = await fetch("http://127.0.0.1:3000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });

        if (response.ok) {
            const data = await response.json();

            //message to user
            errorMsg.textContent = "Meddelandet är skickat! Vi återkommer vi e-post eller telefon så snart vi kan.";

            //clear form
            form.reset();

        } else {
            errorMsg.textContent = "Ett fel uppstod vid publiceringen av inlägget";
            throw new Error("Dish creation failed");
        }

    } catch (error) {
        console.log("Något blev fel när inlägget skapades:", error);
        errorMsg.textContent = "Ett fel uppstod vid publiceringen av inlägget";
    }
}