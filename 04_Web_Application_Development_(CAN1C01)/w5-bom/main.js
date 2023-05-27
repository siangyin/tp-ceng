const getParams = () => {
	const params = new URLSearchParams(location.search);
	console.log(location.search); // ?username=yippee&password=12345
	const username = params.get("username");
	// const password = params.get("password");
	document.getElementById("welcomeMsg").innerHTML =
		"Hey " + username + "👋🏻 <br>Welcome to our app";
};

const restaurantClicked = (restName) => {
	window.sessionStorage.setItem("restaurant", restName);
	location.href = "detail.html?restaurant=" + restName;
};

const restList = [
	"Haidilao Hot Pot",
	"Putien",
	"Akimitsu",
	"Canton Paradise",
	"GyoGyo Japanese Grilled Fish & Sukiyaki",
	"Genki Sushi",
	"Harry's",
	"Nando's",
	"Pizza Hut",
	"Seorae",
	"Suki-ya",
].sort();

const mainContent = document.getElementById("main-content");

for (const element of restList) {
	// Create a button element
	const newBtn = document.createElement("button");

	// Set the button text to 'Can you click me?'
	newBtn.innerText = element;

	// Attach the "click" event to your button
	newBtn.addEventListener("click", () => {
		// When there is a "click"
		// it shows an alert in the browser
		restaurantClicked(element);
	});

	newBtn.style.minWidth = "100px";
	newBtn.style.margin = "0 5px 5px 0";
	//append button
	mainContent.appendChild(newBtn).setAttribute("class", "ui pink basic button");
}

getParams();
