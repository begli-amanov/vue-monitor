<script lang="ts" setup>
import { RouterView } from 'vue-router';
</script>

<template>
	<div class="bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
		<div class="grid grid-cols-12 gap-4">
			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="bg-surface-900 shadow p-4 rounded-border">
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
				<div class="bg-surface-900 shadow p-4 rounded-border">
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
				<div class="bg-surface-900 shadow p-4 rounded-border">
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
				<div class="bg-surface-900 shadow p-4 rounded-border">
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

	<RouterView />
</template>
