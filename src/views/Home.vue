<script setup lang="ts">
import { ProductService } from '@/services/ProductService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
	ProductService.getProducts().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const getSeverity = (product) => {
	switch (product.inventoryStatus) {
		case 'INSTOCK':
			return 'success';

		case 'LOWSTOCK':
			return 'warn';

		case 'OUTOFSTOCK':
			return 'danger';

		default:
			return null;
	}
};

const openNew = () => {
	product.value = {};
	submitted.value = false;
	productDialog.value = true;
};

const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const statuses = ref([
	{ label: 'INSTOCK', value: 'instock' },
	{ label: 'LOWSTOCK', value: 'lowstock' },
	{ label: 'OUTOFSTOCK', value: 'outofstock' },
]);
const formatCurrency = (value) => {
	if (value)
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	return;
};

const hideDialog = () => {
	productDialog.value = false;
	submitted.value = false;
};
const saveProduct = () => {
	submitted.value = true;

	if (product?.value.name?.trim()) {
		if (product.value.id) {
			product.value.inventoryStatus = product.value.inventoryStatus.value
				? product.value.inventoryStatus.value
				: product.value.inventoryStatus;
			products.value[findIndexById(product.value.id)] = product.value;
			toast.add({
				severity: 'success',
				summary: 'Successful',
				detail: 'Product Updated',
				life: 3000,
			});
		} else {
			product.value.id = createId();
			product.value.code = createId();
			product.value.image = 'product-placeholder.svg';
			product.value.inventoryStatus = product.value.inventoryStatus
				? product.value.inventoryStatus.value
				: 'INSTOCK';
			products.value.push(product.value);
			toast.add({
				severity: 'success',
				summary: 'Successful',
				detail: 'Product Created',
				life: 3000,
			});
		}

		productDialog.value = false;
		product.value = {};
	}
};
const editProduct = (prod) => {
	product.value = { ...prod };
	productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
	product.value = prod;
	deleteProductDialog.value = true;
};
const deleteProduct = () => {
	products.value = products.value.filter((val) => val.id !== product.value.id);
	deleteProductDialog.value = false;
	product.value = {};
	toast.add({
		severity: 'success',
		summary: 'Successful',
		detail: 'Product Deleted',
		life: 3000,
	});
};
const findIndexById = (id) => {
	let index = -1;
	for (let i = 0; i < products.value.length; i++) {
		if (products.value[i].id === id) {
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
const exportCSV = () => {
	dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
	deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
	products.value = products.value.filter(
		(val) => !selectedProducts.value.includes(val)
	);
	deleteProductsDialog.value = false;
	selectedProducts.value = null;
	toast.add({
		severity: 'success',
		summary: 'Successful',
		detail: 'Products Deleted',
		life: 3000,
	});
};
</script>

<template>
	<div>
		<Toolbar class="mb-6">
			<template #start>
				<Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
				<Button
					label="Delete"
					icon="pi pi-trash"
					severity="danger"
					outlined
					@click="confirmDeleteSelected"
					:disabled="!selectedProducts || !selectedProducts.length"
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
				<Button
					label="Export"
					icon="pi pi-upload"
					severity="secondary"
					@click="exportCSV($event)"
				/>
			</template>
		</Toolbar>

		<DataTable
			:value="products"
			tableStyle="min-width: 50rem"
			:row-hover="true"
			:filters="filters"
		>
			<template #header>
				<div class="flex flex-wrap items-center justify-between gap-2">
					<span class="text-xl font-bold">Products</span>

					<!-- refresh button. not necessary for now -->
					<!-- <Button icon="pi pi-refresh" rounded raised /> -->
				</div>
			</template>
			<Column field="name" header="Name"></Column>

			<Column field="price" header="Price">
				<template #body="slotProps">
					{{ formatCurrency(slotProps.data.price) }}
				</template>
			</Column>
			<Column field="category" header="Category"></Column>

			<Column header="Status">
				<template #body="slotProps">
					<Tag
						:value="slotProps.data.inventoryStatus"
						:severity="getSeverity(slotProps.data)"
					/>
				</template>
			</Column>
			<template #footer>
				In total there are {{ products ? products.length : 0 }} products.
			</template>
		</DataTable>
	</div>
</template>

<style></style>
