<script setup>
import { LicenseService } from '@/services/LicenseService';
import { FilterMatchMode } from '@primevue/core/api';
import Toolbar from 'primevue/toolbar';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

// similar to Angular onInit function
onMounted(() => {
	LicenseService.getLicenses().then((data) => (licenses.value = data));
});

const toast = useToast();
const dt = ref();
const licenses = ref();
const license = ref({});
const licenseDialog = ref(false);
const deleteLicenseDialog = ref(false);
const deleteLicensesDialog = ref(false);
const selectedLicenses = ref();

// for search bar
const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const submitted = ref(false);

const statuses = ref([
	{ label: 'VALID', value: 'VALID' },
	{ label: 'EXPIRING SOON', value: 'EXPIRING SOON' },
	{ label: 'EXPIRED', value: 'EXPIRED' },
]);

const formatCurrency = (value) => {
	if (value)
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'EUR',
		});
	return;
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

const saveLicense = () => {
	submitted.value = true;

	if (license?.value.name?.trim()) {
		if (license.value.id) {
			license.value.inventoryStatus = license.value.inventoryStatus.value
				? license.value.inventoryStatus.value
				: license.value.inventoryStatus;
			licenses.value[findIndexById(license.value.id)] = license.value;
			toast.add({
				severity: 'success',
				summary: 'Successful',
				detail: 'License Updated',
				life: 3000,
			});
		} else {
			license.value.id = createId();
			license.value.code = createId();
			// license.value.image = 'license-placeholder.svg';
			license.value.inventoryStatus = license.value.inventoryStatus
				? license.value.inventoryStatus.value
				: 'VALID';
			licenses.value.push(license.value);
			toast.add({
				severity: 'success',
				summary: 'Successful',
				detail: 'License Created',
				life: 3000,
			});
		}

		licenseDialog.value = false;
		license.value = {};
	}
};

const editLicense = (prod) => {
	license.value = { ...prod };
	licenseDialog.value = true;
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

const createId = () => {
	let id = '';
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < 5; i++) {
		id += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return id;
};

// was used to export CSV File. Disabled right now.
const exportCSV = () => {
	dt.value.exportCSV();
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
			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border card-border">
					<div class="flex justify-between mb-4">
						<div>
							<span class="block text-surface-400 font-medium mb-4"
								>Orders</span
							>
							<div class="text-surface-0 font-medium !text-xl">152</div>
						</div>
						<div
							class="flex items-center justify-center bg-blue-100 rounded-border w-10 h-10"
						>
							<i class="pi pi-shopping-cart text-blue-500 !text-xl" />
						</div>
					</div>
					<span class="text-green-500 font-medium">24 new </span>
					<span class="text-surface-400">since last visit</span>
				</div>
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border card-border">
					<div class="flex justify-between mb-4">
						<div>
							<span class="block text-surface-400 font-medium mb-4"
								>Revenue</span
							>
							<div class="text-surface-0 font-medium !text-xl">$2.100</div>
						</div>
						<div
							class="flex items-center justify-center bg-orange-100 rounded-border w-10 h-10"
						>
							<i class="pi pi-map-marker text-orange-500 !text-xl" />
						</div>
					</div>
					<span class="text-green-500 font-medium">%52+ </span>
					<span class="text-surface-400">since last week</span>
				</div>
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border card-border">
					<div class="flex justify-between mb-4">
						<div>
							<span class="block text-surface-400 font-medium mb-4"
								>Customers</span
							>
							<div class="text-surface-0 font-medium !text-xl">28441</div>
						</div>
						<div
							class="w-10 h-10 flex items-center justify-center bg-cyan-100 rounded-border"
						>
							<i class="pi pi-inbox text-cyan-500 !text-xl" />
						</div>
					</div>
					<span class="text-green-500 font-medium">520 </span>
					<span class="text-surface-400">newly registered</span>
				</div>
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border card-border">
					<div class="flex justify-between mb-4">
						<div>
							<span class="block text-surface-400 font-medium mb-4"
								>Comments</span
							>
							<div class="text-surface-0 font-medium !text-xl">152 Unread</div>
						</div>
						<div
							class="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-border"
						>
							<i class="pi pi-comment text-purple-500 !text-xl" />
						</div>
					</div>
					<span class="text-green-500 font-medium">85 </span>
					<span class="text-surface-400">responded</span>
				</div>
			</div>
		</div>
	</div>

	<!-- toolbar starts here -->
	<div class="bg-surface-950 p-4">
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
					outlined
					@click="confirmDeleteSelected"
					:disabled="!selectedLicenses || !selectedLicenses.length"
				/>
			</template>

			<template #end>
				<FileUpload
					mode="basic"
					accept="image/*"
					:maxFileSize="1000000"
					label="Import"
					customUpload
					chooseLabel="Import"
					class="mr-2"
					auto
					:chooseButtonProps="{ severity: 'secondary' }"
				/>
				<!-- <Button
					label="Export"
					icon="pi pi-upload"
					severity="primary"
					class="mr-2"
					@click="exportCSV($event)"
				/> -->

				<!-- signout button, a better place for this button? -->
				<Button label="Log Out" icon="pi pi-power-off" severity="danger" />
			</template>
		</Toolbar>

		<!-- here begins table itself -->
		<DataTable
			ref="dt"
			v-model:selection="selectedLicenses"
			:value="licenses"
			removableSort
			resizableColumns
			columnResizeMode="fit"
			showGridlines
			dataKey="id"
			:filters="filters"
			:rows="10"
			paginator
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
			:rowsPerPageOptions="[5, 10, 25]"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords} licenses"
		>
			<template #header>
				<div class="flex flex-wrap gap-2 items-center justify-center">
					<IconField>
						<InputIcon>
							<i class="pi pi-search" />
						</InputIcon>
						<InputText
							v-model="filters['global'].value"
							placeholder="Search..."
						/>
					</IconField>
					<!-- <h4 class="m-0">Manage Licenses</h4> -->
				</div>
			</template>
			<template #empty> No licenses found. </template>
			<Column
				selectionMode="multiple"
				style="width: 3rem"
				:exportable="false"
			></Column>
			<Column field="name" header="Name" sortable></Column>
			<!-- <Column header="Image">
					<template #body="slotProps">
						<img
							:src="`https://primefaces.org/cdn/primevue/images/license/${slotProps.data.image}`"
							:alt="slotProps.data.image"
							class="rounded"
							style="width: 64px"
						/>
					</template>
				</Column> -->
			<Column field="price" header="Price" sortable style="min-width: 8rem">
				<template #body="slotProps">
					{{ formatCurrency(slotProps.data.price) }}
				</template>
			</Column>
			<Column
				field="category"
				header="Category"
				sortable
				style="min-width: 10rem"
			></Column>
			<Column field="inventoryStatus" header="Status" sortable>
				<template #body="slotProps">
					<Tag
						:value="slotProps.data.inventoryStatus"
						:severity="getStatusLabel(slotProps.data.inventoryStatus)"
					/>
				</template>
			</Column>
			<Column
				field="expiryDate"
				header="Expiry Date"
				sortable
				style="min-width: 10rem"
			></Column>
			<Column
				field="vendor"
				header="Vendor"
				sortable
				style="min-width: 10rem"
			></Column>
			<Column
				field="manufacturer"
				header="Manufacturer"
				sortable
				style="min-width: 10rem"
			></Column>
			<Column :exportable="false" header="Actions">
				<template #body="slotProps">
					<Button
						icon="pi pi-pencil"
						outlined
						rounded
						severity="success"
						class="mr-2"
						@click="editLicense(slotProps.data)"
					/>
					<Button
						icon="pi pi-trash"
						outlined
						rounded
						severity="danger"
						@click="confirmDeleteLicense(slotProps.data)"
					/>
				</template>
			</Column>
		</DataTable>
	</div>

	<!-- modal dialog for edition and creation of a new license -->
	<Dialog
		v-model:visible="licenseDialog"
		:style="{ width: '450px' }"
		header="License Details"
		:modal="true"
	>
		<div class="flex flex-col gap-6">
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
			<div>
				<label for="description" class="block font-bold mb-3"
					>Description</label
				>
				<Textarea
					id="description"
					v-model="license.description"
					required="true"
					rows="3"
					cols="20"
					fluid
				/>
			</div>
			<div>
				<label for="inventoryStatus" class="block font-bold mb-3"
					>Inventory Status</label
				>

				<!-- both: optionValue value and optionLabel are from statuses object -->
				<Select
					id="inventoryStatus"
					v-model="license.inventoryStatus"
					:options="statuses"
					optionLabel="label"
					optionValue="value"
					placeholder="Select a Status"
					fluid
				></Select>
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

			<div>
				<span class="block font-bold mb-4">Category</span>
				<div class="grid grid-cols-12 gap-4">
					<div class="flex items-center gap-2 col-span-6">
						<RadioButton
							id="artists"
							v-model="license.category"
							name="category"
							value="Artists"
						/>
						<label for="artists">Artists</label>
					</div>
					<div class="flex items-center gap-2 col-span-6">
						<RadioButton
							id="renderfarm"
							v-model="license.category"
							name="category"
							value="Renderfarm"
						/>
						<label for="renderfarm">Renderfarm</label>
					</div>
					<div class="flex items-center gap-2 col-span-6">
						<RadioButton
							id="monitoring"
							v-model="license.category"
							name="category"
							value="Monitoring"
						/>
						<label for="monitoring">Monitoring</label>
					</div>
					<div class="flex items-center gap-2 col-span-6">
						<RadioButton
							id="finance"
							v-model="license.category"
							name="category"
							value="Finance"
						/>
						<label for="finance">Finance</label>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-6">
					<label for="price" class="block font-bold mb-3">Price</label>
					<InputNumber
						id="price"
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
		</div>

		<template #footer>
			<Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
			<Button label="Save" icon="pi pi-check" @click="saveLicense" />
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
				text
				@click="deleteLicenseDialog = false"
			/>
			<Button label="Yes" icon="pi pi-check" @click="deleteLicense" />
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
				text
				@click="deleteLicensesDialog = false"
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				text
				@click="deleteSelectedLicenses"
			/>
		</template>
	</Dialog>
</template>
