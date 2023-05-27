const getRestaurant = () => {
	const restaurantName = window.sessionStorage.getItem("restaurant");
	document.getElementById("restName").innerHTML = restaurantName;
};

getRestaurant();
