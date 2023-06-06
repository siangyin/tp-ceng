// https://example.org:8080/foo/bar?q=baz#bang
// pathname : /index.html
// search ? uuuu=ooo eg: ?q=baz
// hash #bang

let currentPath = window.location.pathname;
let currentParams = new URLSearchParams(window.location.search);
console.log(currentPath, window.location.search); // /index.html, ?sampl=ooo&sample=oo
// const BE_URL = "http://localhost:3000";

function convertToChildNode(item) {
	const tmp = document.createElement("div");
	tmp.innerHTML = item;
	return tmp.childNodes;
}

const commonHeader = document.getElementById("commonHeader");
const commonFooter = document.getElementById("commonFooter");

const navbar = `
    <nav class="uk-navbar-container">
		<div class="uk-container">
			<div uk-navbar>
				<div class="uk-navbar-left">
					<ul class="uk-navbar-nav">
						<li class="uk-active"><a href="/">DININGADVISOR</a></li>
						<li>
							<a href="#">Restaurants<span uk-navbar-parent-icon></span></a>
							<div class="uk-navbar-dropdown">
                                <ul class="uk-nav uk-navbar-dropdown-nav">
                                    <li class="uk-active"><a href="#">All Restaurants</a></li>
                                    <li><a href="#">Popular Restaurants</a></li>
                                    <li class="uk-nav-header">Cuisine</li>
                                    <li><a href="#">Asian</a></li>
                                    <li><a href="#">Chinese</a></li>
                                    <li><a href="#">Cafe</a></li>
                                    <li class="uk-nav-divider"></li>
                                    <li><a href="#">Special Offers</a></li>
                                </ul>
							</div>
						</li>
					</ul>
				</div>
				<div class="uk-navbar-right">
					<ul class="uk-navbar-nav">
						<li>
							<a href="#"><span uk-icon="user"></span><span uk-navbar-parent-icon></span></a>
							<div class="uk-navbar-dropdown">
								<ul class="uk-nav uk-navbar-dropdown-nav">
									<li class="uk-active"><a href="#">Register</a></li>
									<li><a href="#">Login</a></li>
									<li class="uk-nav-header">Account</li>
									<li><a href="#">Profile</a></li>
									<li><a href="#">Reviews</a></li>
									<li><a href="#">Favourite</a></li>
									<li class="uk-nav-divider"></li>
									<li><a href="#">Log out</a></li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
`;

const breadCrumb = `
    <nav class="uk-container uk-margin" aria-label="Breadcrumb">
		<ul class="uk-breadcrumb">
			<li><a href="#">Home</a></li>
			<li><a href="#">Restaurants</a></li>
		</ul>
	</nav>
        `;

const footer = `
    <div class="uk-position-bottom-center uk-position-relative uk-margin uk-text-center">
        <ul class="uk-subnav uk-margin-remove-bottom">
            <li class="uk-text-bold"><a href="#">DINEADVISOR</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
        </ul>
        <span class="uk-text-meta">© 2023 DineAdvisor. All rights reserved.</span>
    </div>
`;

let childNodes = convertToChildNode(navbar);
commonHeader.append(...childNodes);

childNodes = convertToChildNode(breadCrumb);
commonHeader.append(...childNodes);

childNodes = convertToChildNode(footer);
commonFooter.append(...childNodes);

function updateHeadElements() {
	let newScript = document.createElement("script");
	newScript.setAttribute(
		"src",
		`js${currentPath.replace(".html", ".js").replace("/public", "")}`
	);
	newScript.setAttribute("type", "text/javascript");
	document.head.appendChild(newScript);
	// <link rel="stylesheet" href="css/index.css" />
	let newStyleLink = document.createElement("link");
	newStyleLink.setAttribute(
		"href",
		`css${currentPath.replace(".html", ".css").replace("/public", "")}`
	);
	newStyleLink.setAttribute("rel", "stylesheet");
	document.head.appendChild(newStyleLink);
}

window.addEventListener("DOMContentLoaded", (event) => {
	updateHeadElements();
	console.log(document.readyState); // loading - interactive - complete
	console.log("page is fully loaded" + event.timeStamp);
});
