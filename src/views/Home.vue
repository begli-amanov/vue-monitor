<script setup>
import { LicenseService } from '@/services/LicenseService';
import { FilterMatchMode } from '@primevue/core/api';
import Toolbar from 'primevue/toolbar';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

// similar to Angular onInit function
onMounted(async () => {
	try {
		const data = await LicenseService.getListOfLicenses();
		licenses.value = data.licenses;
	} catch (error) {
		console.error('Failed to fetch licenses:', error);
		toast.add({
			severity: 'error',
			summary: 'Error',
			detail: 'Failed to fetch licenses',
		});
	}
});

const dt = ref();
const licenses = ref([]);
const license = ref({});
const toast = useToast();
const submitted = ref(false);
const selectedLicenses = ref();
const licenseDialog = ref(false);
const deleteLicenseDialog = ref(false);
const deleteLicensesDialog = ref(false);

// for search bar. it controls conditions for searching/filtering.
const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const statuses = ref([
	{ label: 'VALID', value: 'VALID' },
	{ label: 'EXPIRING SOON', value: 'EXPIRING SOON' },
	{ label: 'EXPIRED', value: 'EXPIRED' },
]);

const vendors = ref([
	{ label: 'DVEAS', value: 'DVEAS' },
	{ label: 'SIDEFX', value: 'SIDEFX' },
	{ label: 'FOUNDRY', value: 'FOUNDRY' },
]);

const manufacturers = ref([
	{ label: 'AUTODESK', value: 'AUTODESK' },
	{ label: 'SIDEFX', value: 'SIDEFX' },
	{ label: 'FOUNDRY', value: 'FOUNDRY' },
]);

const formatCurrency = (value) => {
	if (value) {
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	}
	return '';
};

const clearInput = () => {
	filters.value.global.value = null;
	document.getElementById('search-field').value = '';
};

const openNew = () => {
	license.value = {};
	submitted.value = false;
	licenseDialog.value = true;
};

const hideDialog = () => {
	licenseDialog.value = false;
	submitted.value = false;
};

const saveLicense = async () => {
	submitted.value = true;

	if (license?.value.name?.trim()) {
		if (license.value.id) {
			license.value.status = license.value.status.value
				? license.value.status.value
				: license.value.status;
			licenses.value[findIndexById(license.value.id)] = license.value;
			console.log('License updated:', license.value);
		} else {
			license.value.id = createId();
			license.value.status = license.value.status
				? license.value.status.value
				: 'VALID';
			licenses.value.push(license.value);
			console.log('License created:', license.value);
		}

		console.log('Object being sent:', license.value);

		try {
			const response = await fetch('http://localhost:8080/license/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(license.value),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			console.log('License saved successfully:', data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}

		licenseDialog.value = false;
		license.value = {};
	}
};

const editLicense = (prod) => {
	license.value = { ...prod };
	licenseDialog.value = true;
};

const createId = () => {
	let id = '';
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < 5; i++) {
		id += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return id;
};

const confirmDeleteLicense = (prod) => {
	license.value = prod;
	deleteLicenseDialog.value = true;
};

const deleteLicense = () => {
	licenses.value = licenses.value.filter((val) => val.id !== license.value.id);
	deleteLicenseDialog.value = false;
	license.value = {};
	toast.add({
		severity: 'success',
		summary: 'Successful',
		detail: 'License Deleted',
		life: 3000,
	});
};

const findIndexById = (id) => {
	let index = -1;
	for (let i = 0; i < licenses.value.length; i++) {
		if (licenses.value[i].id === id) {
			index = i;
			break;
		}
	}

	return index;
};

const confirmDeleteSelected = () => {
	deleteLicensesDialog.value = true;
};

const deleteSelectedLicenses = () => {
	licenses.value = licenses.value.filter(
		(val) => !selectedLicenses.value.includes(val)
	);
	deleteLicensesDialog.value = false;
	selectedLicenses.value = null;
	toast.add({
		severity: 'success',
		summary: 'Successful',
		detail: 'Licenses Deleted',
		life: 3000,
	});
};

const getStatusLabel = (status) => {
	switch (status) {
		case 'VALID':
			return 'success';

		case 'EXPIRING SOON':
			return 'warn';

		case 'EXPIRED':
			return 'danger';

		default:
			return null;
	}
};
</script>

<template>
	<!-- reference cards start here -->
	<div class="bg-surface-950 px-4 pt-6">
		<div class="grid grid-cols-12 gap-4">
			<!-- charts card-->
			<RouterLink to="/charts" class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border card-border">
					<div class="flex justify-between mb-4">
						<div>
							<div class="text-surface-0 font-medium !text-xl">Charts</div>
						</div>
						<div
							class="flex items-center justify-center bg-blue-100 rounded-border w-10 h-10"
						>
							<i class="pi pi-chart-bar text-blue-600 !text-xl" />
						</div>
					</div>
					<span class="text-green-500 font-medium">Quarter - Month</span>
				</div>
			</RouterLink>

			<!-- expires next card -->
			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border card-border">
					<div class="flex justify-between mb-4">
						<div>
							<div class="text-surface-0 font-medium !text-xl">
								Expires next
							</div>
						</div>
						<div
							class="flex items-center justify-center bg-orange-100 rounded-border w-10 h-10"
						>
							<i class="pi pi-clock text-orange-600 !text-xl" />
						</div>
					</div>
					<span class="text-green-500 font-medium">23-03-2023 </span>
					<span class="text-surface-400">PR3183421</span>
				</div>
			</div>

			<!-- value card -->
			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border card-border">
					<div class="flex justify-between mb-4">
						<div>
							<div class="text-surface-0 font-medium !text-xl">Value</div>
						</div>
						<div
							class="w-10 h-10 flex items-center justify-center bg-cyan-100 rounded-border"
						>
							<i class="pi pi-cart-plus text-cyan-600 !text-xl" />
						</div>
					</div>
					<span class="text-green-500 font-medium">52000$ </span>
				</div>
			</div>

			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border card-border">
					<div class="flex justify-between mb-4">
						<div>
							<div class="text-surface-0 font-medium !text-xl">
								Recent Purchase
							</div>
						</div>
						<div
							class="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-border"
						>
							<i class="pi pi-wallet text-purple-600 !text-xl" />
						</div>
					</div>
					<span class="text-green-500 font-medium">PR3183432 </span>
				</div>
			</div>
		</div>
	</div>

	<div class="bg-surface-950 p-4">
		<!-- toolbar starts here -->
		<Toolbar class="mb-4">
			<template #start>
				<Button
					label="New"
					icon="pi pi-pen-to-square"
					class="mr-2"
					@click="openNew"
				/>
				<Button
					label="Delete"
					icon="pi pi-trash"
					severity="danger"
					@click="confirmDeleteSelected"
					:disabled="!selectedLicenses || !selectedLicenses.length"
				/>
			</template>

			<template #end>
				<FileUpload
					mode="basic"
					accept="csv/*"
					:maxFileSize="1000000"
					label="Import"
					customUpload
					chooseLabel="Import"
					class="mr-2"
					auto
					:chooseButtonProps="{ severity: 'primary' }"
				/>
				<!-- signout button. a better place for this button? -->
				<RouterLink to="/login">
					<Button label="Out" icon="pi pi-power-off" severity="danger" />
				</RouterLink>
			</template>
		</Toolbar>

		<!-- here begins data table itself -->
		<DataTable
			:rows="10"
			:value="licenses"
			:filters="filters"
			:rowsPerPageOptions="[5, 10, 25]"
			paginator
			ref="dt"
			dataKey="id"
			removableSort
			showGridlines
			resizableColumns
			columnResizeMode="fit"
			v-model:selection="selectedLicenses"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
		>
			<!-- search input -->
			<template #header>
				<div class="flex flex-wrap gap-2 items-center justify-center">
					<IconField>
						<InputIcon>
							<i class="pi pi-search" />
						</InputIcon>

						<InputText
							v-model="filters['global'].value"
							placeholder="Search..."
							id="search-field"
						/>

						<!-- clear icon as svg -->
						<svg
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="p-icon p-select-clear-icon"
							aria-hidden="true"
							v-if="filters['global'].value"
							@click="clearInput"
						>
							<path
								d="M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z"
								fill="currentColor"
							></path>
						</svg>
					</IconField>
				</div>
			</template>

			<!-- no matching results message -->
			<template #empty> No licenses found. </template>
			<Column
				selectionMode="multiple"
				style="width: 3rem"
				:exportable="false"
			></Column>

			<!-- Name column -->
			<Column
				field="name"
				header="Name"
				style="min-width: 14rem"
				sortable
			></Column>

			<!-- WBS column -->
			<Column
				field="wbs"
				header="WBS"
				style="min-width: 10rem"
				sortable
			></Column>

			<!-- PO column -->
			<Column field="po" header="PO" style="min-width: 8rem" sortable></Column>

			<!-- Price column -->
			<Column field="price" header="Price" style="min-width: 8rem" sortable>
				<template #body="slotProps">
					{{ formatCurrency(slotProps.data.price) }}
				</template>
			</Column>

			<!-- Expiry column -->
			<Column
				field="expiryDate"
				header="Expiry Date"
				sortable
				style="min-width: 8rem"
			></Column>

			<!-- Status column -->
			<Column field="status" header="Status" style="min-width: 10rem" sortable>
				<template #body="slotProps">
					<Tag
						:value="slotProps.data.status"
						:severity="getStatusLabel(slotProps.data.status)"
					/>
				</template>
			</Column>

			<!-- Vendor column -->
			<Column
				field="vendor"
				header="Vendor"
				sortable
				style="min-width: 10rem"
			></Column>

			<!-- Manufacturer column -->
			<Column
				field="manufacturer"
				header="Manufacturer"
				sortable
				style="min-width: 10rem"
			></Column>

			<!-- Actions column -->
			<Column :exportable="false" header="Actions" style="width: 1rem">
				<template #body="slotProps">
					<Button
						icon="pi pi-pencil"
						outlined
						severity="success"
						class="mr-2"
						@click="editLicense(slotProps.data)"
					/>
					<Button
						icon="pi pi-trash"
						outlined
						severity="danger"
						@click="confirmDeleteLicense(slotProps.data)"
					/>
				</template>
			</Column>
		</DataTable>
		<Toast />
	</div>

	<!-- modal dialog for edition and creation of a new license -->
	<Dialog
		v-model:visible="licenseDialog"
		:style="{ width: '450px' }"
		header="License Details"
		:modal="true"
	>
		<div class="flex flex-col gap-4">
			<!-- name input on modal -->
			<div>
				<label for="name" class="block font-bold mb-3">Name</label>
				<InputText
					id="name"
					v-model.trim="license.name"
					required="true"
					autofocus
					:invalid="submitted && !license.name"
					fluid
				/>
				<small v-if="submitted && !license.name" class="text-red-500"
					>Name is required.</small
				>
			</div>

			<!-- po and wbs on modal -->
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-6">
					<label for="po" class="block font-bold mb-3">PO</label>
					<InputText
						id="po"
						v-model="license.po"
						mode="currency"
						currency="EUR"
						locale="en-US"
						fluid
					/>
				</div>

				<div class="col-span-6">
					<label for="wbs" class="block font-bold mb-3">WBS</label>
					<InputText id="wbs" v-model="license.wbs" fluid />
				</div>
			</div>

			<!-- license status on modal -->
			<div>
				<label for="status" class="block font-bold mb-3"
					>Inventory Status</label
				>

				<!-- optionValue value is from const statuses -->
				<Select
					id="status"
					v-model="license.status"
					:options="statuses"
					optionLabel="label"
					placeholder="Select a Status"
					fluid
				></Select>
			</div>

			<!-- vendor and manufacturer select -->
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-6">
					<label for="vendor" class="block font-bold mb-3">Vendor</label>
					<Select
						id="vendor"
						v-model="license.vendor"
						:options="vendors"
						optionLabel="label"
						optionValue="value"
						placeholder="Select a Vendor"
						fluid
					></Select>
				</div>
				<div class="col-span-6">
					<label for="manufacturer" class="block font-bold mb-3"
						>Manufacturer</label
					>
					<Select
						id="manufacturer"
						v-model="license.manufacturer"
						:options="manufacturers"
						optionLabel="label"
						optionValue="value"
						placeholder="Select a Manufacturer"
						fluid
					></Select>
				</div>
			</div>

			<!-- datepicker -->
			<div class="flex-auto">
				<label for="license.expiryDate" class="font-bold block mb-2">
					Expiry Date
				</label>
				<DatePicker
					v-model="license.expiryDate"
					showIcon
					fluid
					iconDisplay="input"
					inputId="license.expiryDate"
					dateFormat="dd-mm-yy"
				/>
			</div>

			<!-- price and quantity on modal -->
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-6">
					<label for="unit-price" class="block font-bold mb-3"
						>Unit Price</label
					>
					<InputNumber
						id="unit-price"
						v-model="license.price"
						mode="currency"
						currency="EUR"
						locale="en-US"
						fluid
					/>
				</div>

				<div class="col-span-6">
					<label for="quantity" class="block font-bold mb-3">Quantity</label>
					<InputNumber
						id="quantity"
						v-model="license.quantity"
						integeronly
						fluid
					/>
				</div>
			</div>

			<!-- for now it is hard coded price as total price, which should be displayed in the table. it should reactively multiply license quantity with its price. as a result it should generate the total price of a license -->
			<!-- <div class="grid grid-cols-12 gap-4">
				<div class="col-span-12">
					<label for="total-price" class="block font-bold mb-3"
						>Total Price</label
					>
					<InputNumber
						mode="currency"
						currency="EUR"
						id="total-price"
						v-model="license.totalPrice"
						integeronly
						fluid
					/>
				</div>
			</div> -->

			<!-- notes on modal -->
			<div>
				<label for="notes" class="block font-bold mb-3">Notes</label>
				<Textarea
					id="note"
					v-model="license.note"
					required="true"
					rows="3"
					cols="20"
					fluid
				/>
			</div>
		</div>

		<!-- cancel and save buttons on modal -->
		<template #footer>
			<Button
				label="Cancel"
				icon="pi pi-times"
				outlined
				@click="hideDialog"
				class="modal-dialog-btn mt-5"
			/>
			<Button
				label="Save"
				icon="pi pi-save"
				@click="saveLicense"
				class="modal-dialog-btn mt-5"
			/>
		</template>
	</Dialog>

	<!-- single license deletion modal dialog -->
	<Dialog
		v-model:visible="deleteLicenseDialog"
		:style="{ width: '450px' }"
		header="Confirm"
		:modal="true"
	>
		<div class="flex items-center gap-4">
			<i class="pi pi-exclamation-triangle !text-3xl" />
			<span v-if="license"
				>Are you sure you want to delete <b>{{ license.name }}</b
				>?</span
			>
		</div>
		<template #footer>
			<Button
				label="No"
				icon="pi pi-times"
				outlined
				@click="deleteLicenseDialog = false"
				class="modal-dialog-btn"
			/>

			<Button
				label="Yes"
				icon="pi pi-check"
				@click="deleteLicense"
				class="modal-dialog-btn"
			/>
		</template>
	</Dialog>

	<!-- multiple licenses deletion modal dialog -->
	<Dialog
		v-model:visible="deleteLicensesDialog"
		:style="{ width: '450px' }"
		header="Confirm"
		:modal="true"
	>
		<div class="flex items-center gap-4">
			<i class="pi pi-exclamation-triangle !text-3xl" />
			<span v-if="license"
				>Are you sure you want to delete the selected licenses?</span
			>
		</div>
		<template #footer>
			<Button
				label="No"
				icon="pi pi-times"
				outlined
				@click="deleteLicensesDialog = false"
				class="modal-dialog-btn"
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				@click="deleteSelectedLicenses"
				class="modal-dialog-btn"
			/>
		</template>
	</Dialog>
</template>

<style></style>
