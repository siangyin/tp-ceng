"use strict";

let userAction;
const userAccessBtn = document.getElementById("userAccessBtn");
const alertMsg = document.getElementById("alertMsg");
const emailInput = document.getElementById("email");
const form = document.querySelector("form");
const formInput = document.querySelectorAll(".uk-input");

let requiredFields = [];

// set variable based on current path eg login or register
switch (currentPath) {
	case "/register.html":
		userAction = "register";
		requiredFields = [
			{
				name: "username",
				input: "input",
				type: "text",
			},
			{
				name: "email",
				input: "input",
				type: "email",
			},
			{
				name: "password",
				input: "input",
				type: "password",
			},
		];
		break;
	case "/login.html":
		userAction = "login";
		requiredFields = [
			{
				name: "email",
				input: "input",
				type: "email",
			},
			{
				name: "password",
				input: "input",
				type: "password",
			},
		];
		break;
}

// FUNCTIONS

function validateFormInput(requiredFields) {
	const reqBody = {};
	const missingField = [];

	// loop thru required field using id to find input value
	for (const field of requiredFields) {
		const fieldVal = document.getElementById(`${field.name}`).value;
		if (Boolean(fieldVal)) {
			reqBody[field.name] = fieldVal;
		} else {
			reqBody[field.name] = undefined;
			missingField.push(field.name);
		}
	}

	return { reqBody, missingField };
}

async function submitUserAccess(action, reqBody) {
	let url = `${BE_URL}/api/v1/auth/${action.toLowerCase()}`;
	try {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
			body: JSON.stringify(reqBody),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status !== "OK") {
					addAlertMsg(alertMsg, res.msg);
				} else {
					removeAllChildsElement(alertMsg);
					signedInUser = res.data;
					sessionStorage.setItem("token", res.token);
					// window.location.assign("/index.html");
				}
			});
	} catch (error) {
		console.log(error);
	}
}

// EVENT LISTENER

// based on form changes
// form.addEventListener("change", (e) => {
// 	const checkForm = validateFormInput();
// 	if (checkForm.missingField.length == 0) {
// 		removeAllChildsElement(alertMsg);
// 		formInput.forEach(
// 			(item) => (item.className = "uk-input uk-margin-small-bottom")
// 		);
// 	}
// });

// based on input onblur
formInput.forEach((item) => {
	item.addEventListener("focus", (e) => {
		item.className = "uk-input uk-margin-small-bottom";
	});

	item.addEventListener("blur", (e) => {
		const userInput = e.target.value;
		if (isEmptyStr(userInput)) {
			item.className = "uk-input uk-form-danger uk-margin-small-bottom";
		} else {
			item.className = "uk-input uk-margin-small-bottom";
		}
	});
});

// based on button onclick
userAccessBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const checkForm = validateFormInput(requiredFields);
	// if no missing field submit form request
	if (checkForm.missingField.length == 0) {
		formInput.forEach(
			(item) => (item.className = "uk-input uk-margin-small-bottom")
		);
		if (validateEmail(checkForm.reqBody.email)) {
			submitUserAccess(userAction, checkForm.reqBody);
		} else {
			addAlertMsg(alertMsg, "Please enter valid email address");
			emailInput.className = "uk-input uk-form-danger uk-margin-small-bottom";
		}
	} else {
		const msg =
			`Please enter missing ${
				checkForm.missingField.length > 1 ? "fields:" : "field:"
			} ` + checkForm.missingField.toString().replace(",", ", ");
		addAlertMsg(alertMsg, msg);
	}
});
