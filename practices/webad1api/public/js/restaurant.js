"use strict";

window.addEventListener("DOMContentLoaded", (event) => {
	for (const item of allFields) {
		appendFormItem(item);
	}
});

// CONSTANTS & VARIABLES
let pageStatus = {
	loading: false,
	action: "new",
};
// {loading: false, action: 'new', id: '1'}

let currentParams = new URLSearchParams(window.location.search);
// eg: action=new&id=1
for (const [key, value] of currentParams.entries()) {
	pageStatus[key] = value;
}

const allFields = [
	{
		label: "Restaurant Name",
		name: "name",
		input: "input",
		type: "text",
		placeholder: "Restaurant Name",
		required: true,
	},
	{
		name: "description",
		input: "textarea",
		type: "text",
	},
	{
		name: "website",
		input: "input",
		type: "text",
	},
	{
		name: "contact",
		input: "input",
		type: "number",
	},
	{
		name: "add1",
		input: "input",
		type: "text",
		label: "Address 1",
		placeholder: "Address 1",
		required: true,
	},
	{
		name: "add2",
		input: "input",
		type: "text",
		label: "Address 2",
		placeholder: "Address 2",
	},
	{
		name: "add3",
		input: "input",
		type: "text",
		label: "Address 3",
		placeholder: "Address 3",
	},
	{
		name: "city",
		input: "input",
		type: "text",
	},
	{
		name: "country",
		input: "input",
		type: "text",
	},
	{
		name: "postalCode",
		label: "Postal Code",
		input: "input",
		type: "number",
		placeholder: "Postal Code",
	},
	{
		name: "area",
		input: "input",
		type: "text",
	},
	{
		name: "type",
		input: "input",
		type: "text",
		placeholder: "Establishment types, each value to divide with comma ','",
		required: true,
	},
	{
		name: "cuisine",
		input: "input",
		type: "text",
		placeholder: "Cuisines type, each value to divide with comma ','",
		required: true,
	},
	{
		name: "openHrs",
		label: "Opening Hours",
		input: "input",
		type: "text",
		placeholder: "Eg: Daily = 09:00 AM - 10:00 PM ; PH = 10:00 AM - 11:00 PM",
		required: true,
	},
	{
		name: "photo1",
		label: "Primary photo",
		input: "input",
		type: "text",
		placeholder: "Image address url",
	},
	{
		name: "photos",
		input: "input",
		type: "text",
		placeholder: "Image(s) address url, each url to divide with comma ','",
	},
];

// DOM
const restaurantForm = document.getElementById("restaurantForm");
const submitBtn = document.getElementById("submitBtn");
const alertMsg = document.getElementById("alertMsg");

if (pageStatus.action == "edit" && pageStatus.id) {
	getRestaurant(pageStatus.id);
}

function appendFormItem(field) {
	let newFormItem = `
    <label for=${field.name} class="uk-width-1-4 ${
		field.type == "input" ? "uk-margin-auto-vertical" : "uk-margin-auto-bottom"
	}">${field.label ?? capitalised(field.name)}</label>
  `;
	if (field.input == "input") {
		newFormItem += `<input class="uk-input uk-width-3-4" 
    id=${field.name}
    type=${field.type} 
    placeholder="${field.placeholder ?? capitalised(field.name)}"/>`;
	} else if (field.input == "textarea") {
		newFormItem += `<textarea
				  id=${field.name}
					class="uk-textarea uk-width-3-4"
					rows="3"
					aria-label="Textarea"
    placeholder=${field.placeholder ?? capitalised(field.name)} ></textarea>`;
	}
	const result = convertToChildNode(newFormItem);
	restaurantForm.append(...result);
}

async function getRestaurant(id) {
	pageStatus.loading = true;
	let url = `${BE_URL}/api/v1/restaurant/${id}`;
	try {
		fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status == "OK") {
					pageStatus = {
						loading: false,
						detail: res.data,
					};
				}
			});
	} catch (error) {
		console.log(error);
	}
}

async function postRestaurant(reqBody) {
	let url = `${BE_URL}/api/v1/restaurant`;
	try {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			},
			body: JSON.stringify(reqBody),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status !== "OK") {
					addAlertMsg(alertMsg, res.msg.message ?? res.msg);
				} else {
					removeAllChildsElement(alertMsg);
					addAlertMsg(alertMsg, res.msg, "success");
					restaurantForm.reset();
					// window.location.assign("/index.html");
				}
			});
	} catch (error) {
		console.log(error);
	}
}
function getPhotoArr(photo1, photos) {
	const result = [];
	if (photo1) {
		result.push({ photoUrl: photo1, defaultPhoto: true });
	}
	if (photos) {
		const urlArr = photos.split(",").map((item) => item.trim());
		for (let url of urlArr) {
			result.push({ photoUrl: url });
		}
	}
	return result;
}

function generatePayload(formValues) {
	const openHrsObjArr =
		formValues.openHrs &&
		formValues.openHrs.split(";").map((item) => {
			const arr = item.split("=");
			return { dayOfWeek: arr[0].trim(), valueText: arr[1].trim() };
		});

	const result = {
		restaurant: {
			name: formValues.name,
			description: formValues.description,
			website: formValues.website,
			contact: formValues.contact,
			add1: formValues.add1,
			add2: formValues.add2,
			add3: formValues.add3,
			city: formValues.city,
			country: formValues.country,
			postalCode: formValues.postalCode,
			area: formValues.area,
		},
		categories: {
			type: formValues.type.split(",").map((item) => item.trim()),
			cuisine: formValues.cuisine.split(",").map((item) => item.trim()),
		},
		openHrs: openHrsObjArr,
		photos: getPhotoArr(formValues.photo1, formValues.photos),
	};
	return result;
}

submitBtn.addEventListener("click", (e) => {
	// check values
	let missingField = [];
	const formValues = {};
	for (const item of allFields) {
		const itemVal = document.getElementById(`${item.name}`).value;
		if (itemVal) {
			formValues[item.name] = itemVal.trim();
		} else {
			item.required && missingField.push(item.label ?? capitalised(item.name));
		}
	}

	if (missingField.length == 0) {
		const payload = generatePayload(formValues);
		postRestaurant(payload);
	} else {
		const msg =
			`Please enter missing ${
				missingField.length > 1 ? "fields:" : "field:"
			} ` + missingField.toString().replace(",", ", ");
		addAlertMsg(alertMsg, msg);
	}
});
