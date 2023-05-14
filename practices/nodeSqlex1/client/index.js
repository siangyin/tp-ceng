document.addEventListener("DOMContentLoaded", () => {
	loadHtmlTable([]);
});

const loadHtmlTable = (data) => {
	const table = document.querySelector("table tbody");
	if (data.length === 0) {
		table.innerHTML = `<tr><td class="no-data" colspan="5" style="
    text-align: center">No data</td></tr>`;
	}
};
