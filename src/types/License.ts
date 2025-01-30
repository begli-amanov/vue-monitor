export interface License {
	id?: string;
	name: string;
	wbs: string;
	note: string;
	vendor: string | { label: string; value: string };
	manufacturer: string | { label: string; value: string };
	price: number;
	po: string;
	quantity: number;
	status: string | { label: string; value: string };
	expiryDate: Date | null;
}
