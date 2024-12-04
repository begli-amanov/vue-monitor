<script setup lang="ts">
import { ProductService } from '@/services/ProductService';
import { FilterMatchMode } from '@primevue/core/api';
import Toolbar from 'primevue/toolbar';
import { onMounted, ref } from 'vue';

const dt = ref();
const selectedProducts = ref();
const productDialog = ref(false);
const product = ref({});
const products = ref();
const submitted = ref(false);
const deleteProductsDialog = ref(false);
const deleteProductDialog = ref(false);

onMounted(() => {
	ProductService.getProducts().then((data) => (products.value = data));
});

const exportCSV = ($event: MouseEvent) => {
	dt.value.exportCSV();
};

const openNew = () => {
	product.value = {};
	submitted.value = false;
	productDialog.value = true;
};

const confirmDeleteSelected = () => {
	deleteProductsDialog.value = true;
};

const confirmDeleteProduct = (prod: any) => {
	product.value = prod;
	deleteProductDialog.value = true;
};

const editProduct = (prod: any) => {
	product.value = { ...prod };
	productDialog.value = true;
};

const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const formatCurrency = (value: any) => {
	if (value)
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	return;
};

const getStatusLabel = (status: any) => {
	switch (status) {
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
			ref="dt"
			v-model:selection="selectedProducts"
			:value="products"
			dataKey="id"
			:paginator="true"
			:rows="10"
			:filters="filters"
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
			:rowsPerPageOptions="[5, 10, 25]"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
		>
			<template #header>
				<div class="flex flex-wrap gap-2 items-center justify-between">
					<h4 class="m-0">Manage Products</h4>
					<IconField>
						<InputIcon>
							<i class="pi pi-search" />
						</InputIcon>
						<InputText
							v-model="filters['global'].value"
							placeholder="Search..."
						/>
					</IconField>
				</div>
			</template>

			<Column
				selectionMode="multiple"
				style="width: 3rem"
				:exportable="false"
			></Column>

			<Column
				field="name"
				header="Name"
				sortable
				style="min-width: 16rem"
			></Column>

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

			<Column
				field="inventoryStatus"
				header="Status"
				sortable
				style="min-width: 12rem"
			>
				<template #body="slotProps">
					<Tag
						:value="slotProps.data.inventoryStatus"
						:severity="getStatusLabel(slotProps.data.inventoryStatus)"
					/>
				</template>
			</Column>
			<Column :exportable="false" style="min-width: 12rem">
				<template #body="slotProps">
					<Button
						icon="pi pi-pencil"
						outlined
						rounded
						class="mr-2"
						@click="editProduct(slotProps.data)"
					/>
					<Button
						icon="pi pi-trash"
						outlined
						rounded
						severity="danger"
						@click="confirmDeleteProduct(slotProps.data)"
					/>
				</template>
			</Column>
		</DataTable>
	</div>
</template>
