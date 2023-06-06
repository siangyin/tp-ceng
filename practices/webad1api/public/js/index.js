console.log("index js here ok");
console.log("BE URL:" + BE_URL);

// fetch(BE_URL + "/api/v1/restaurant")
// 	.then((response) => {
// 		//handle response
// 		console.log(response);
// 	})
// 	.then((data) => {
// 		//handle data
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		//handle error
// 	});

async function getAllRestaurants() {
	try {
		fetch(`${BE_URL}/api/v1/restaurant`, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
	} catch (error) {
		console.log(error);
	}
}
getAllRestaurants();
