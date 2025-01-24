export const LicenseService = {
	getLicenses() {
		const url = 'http://localhost:8080/license/list?page=0&perPage=20'; // Replace with your actual URL
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
