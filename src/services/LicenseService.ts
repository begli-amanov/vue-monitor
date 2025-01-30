export const LicenseService = {
	async getListOfLicenses() {
		const url = 'http://localhost:8080/license/list?page=0&perPage=20';
		try {
			const response = await fetch(url);

			console.log('response', response);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return await response.json();
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	},
};
