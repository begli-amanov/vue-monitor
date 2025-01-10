<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {
	monthlyBasedChartData.value = setMonthlyBasedChartData();
	monthlyBasedChartOptions.value = setMonthlyBasedChartOptions();

	quarterBasedChartData.value = setQuarterBasedChartData();
	quarterBasedChartOptions.value = setQuarterBasedChartOptions();
});

const monthlyBasedChartData = ref();
const monthlyBasedChartOptions = ref();

const quarterBasedChartData = ref();
const quarterBasedChartOptions = ref();

const setMonthlyBasedChartData = () => {
	const documentStyle = getComputedStyle(document.documentElement);

	return {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First dataset',
				backgroundColor: documentStyle.getPropertyValue('--p-emerald-500'),
				borderColor: documentStyle.getPropertyValue('--p-emerald-500'),
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		],
	};
};
const setMonthlyBasedChartOptions = () => {
	const documentStyle = getComputedStyle(document.documentElement);
	const textColor = documentStyle.getPropertyValue('--p-text-color');
	const textColorSecondary = documentStyle.getPropertyValue(
		'--p-text-muted-color'
	);
	const surfaceBorder = documentStyle.getPropertyValue(
		'--p-content-border-color'
	);

	return {
		maintainAspectRatio: false,
		aspectRatio: 0.8,
		plugins: {
			legend: {
				labels: {
					color: textColor,
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: textColorSecondary,
					font: {
						weight: 500,
					},
				},
				grid: {
					display: false,
					drawBorder: false,
				},
			},
			y: {
				ticks: {
					color: textColorSecondary,
				},
				grid: {
					color: surfaceBorder,
					drawBorder: false,
				},
			},
		},
	};
};

const setQuarterBasedChartData = () => {
	return {
		labels: ['Q1', 'Q2', 'Q3', 'Q4'],
		datasets: [
			{
				label: 'Sales',
				data: [540, 325, 702, 620],
				backgroundColor: [
					'rgba(249, 115, 22, 0.2)',
					'rgba(6, 182, 212, 0.2)',
					'rgb(107, 114, 128, 0.2)',
					'rgba(139, 92, 246, 0.2)',
				],
				borderColor: [
					'rgb(249, 115, 22)',
					'rgb(6, 182, 212)',
					'rgb(107, 114, 128)',
					'rgb(139, 92, 246)',
				],
				borderWidth: 1,
			},
		],
	};
};
const setQuarterBasedChartOptions = () => {
	const documentStyle = getComputedStyle(document.documentElement);
	const textColor = documentStyle.getPropertyValue('--p-text-color');
	const textColorSecondary = documentStyle.getPropertyValue(
		'--p-text-muted-color'
	);
	const surfaceBorder = documentStyle.getPropertyValue(
		'--p-content-border-color'
	);

	return {
		plugins: {
			legend: {
				labels: {
					color: textColor,
				},
			},
		},
		scales: {
			x: {
				ticks: {
					color: textColorSecondary,
				},
				grid: {
					color: surfaceBorder,
				},
			},
			y: {
				beginAtZero: true,
				ticks: {
					color: textColorSecondary,
				},
				grid: {
					color: surfaceBorder,
				},
			},
		},
	};
};
</script>

<template>
	<div class="p-4">
		<!-- monthly-based chart -->
		<div class="card">
			<Chart
				type="bar"
				:data="monthlyBasedChartData"
				:options="monthlyBasedChartOptions"
				class="h-[30rem]"
			/>
		</div>

		<!-- quarter-based chart  -->
		<div class="card">
			<Chart
				type="bar"
				:data="quarterBasedChartData"
				:options="quarterBasedChartOptions"
				class="h-[60rem]"
			/>
		</div>
	</div>
</template>
