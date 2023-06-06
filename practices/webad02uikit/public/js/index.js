console.log("index js here ok");
console.log("BE URL:" + BE_URL);

fetch(BE_URL)
	.then((response) => {
		//handle response
		console.log(response);
	})
	.then((data) => {
		//handle data
		console.log(data);
	})
	.catch((error) => {
		//handle error
	});
