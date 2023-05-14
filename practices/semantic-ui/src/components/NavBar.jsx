const NavBar = () => {
	return (
		<>
			<div class="ui secondary  menu">
				<a class="item">DineAdvisor</a>

				<div class="right menu">
					<div class="item">
						<div class="ui icon input">
							<input type="text" placeholder="Search..." />
							<i class="search link icon"></i>
						</div>
					</div>
					<a class="ui item">Login</a>
					<a class="ui item">Register</a>
				</div>
			</div>
		</>
	);
};
export default NavBar;
