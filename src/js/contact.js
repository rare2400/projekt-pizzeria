"use strict";

const form = document.getElementById("contact-form");

//elements for phone number input
const checkbox = document.getElementById("number-checkbox");
const phoneWrapper = document.getElementById("phone-wrapper");
const phoneInput = document.getElementById("phoneNr");

//eventlistener for checkbox
checkbox.addEventListener("change", toggleInput);

//toggle phone number input when checkbox is clicked
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
        const response = await fetch("https://projekt-api-73oa.onrender.com/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });

        if (response.ok) {
            //message to user
            errorMsg.textContent = "Meddelandet är skickat! Vi återkommer vi e-post eller telefon så snart vi kan.";

            //clear form
            form.reset();

        } else {
            errorMsg.textContent = "Ett fel uppstod när meddelandet skulle skickas.";
            throw new Error("message creation failed");
        }

    } catch (error) {
        console.log("Något blev fel när meddelandet skulle skickas:", error);
        errorMsg.textContent = "Ett fel uppstod när meddelandet skulle skickas.";
    }
}