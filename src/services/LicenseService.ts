export const LicenseService = {
	getListOfLicenses() {
		const url = 'http://localhost:8080/license/list?page=0&perPage=20';
		return fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.catch((error) => {
				console.error('There was a problem with the fetch operation:', error);
			});
	},
};
