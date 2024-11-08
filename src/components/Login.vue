<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(true);
</script>

<template>
	<div class="wrapper">
		<form class="card">
			<h2 class="heading-2">Welcome Back</h2>
			<label for="email" class="input-label" s>Email </label>
			<input type="email" name="email" id="email" placeholder="Email address" />

			<label for="password" class="input-label">Password </label>
			<input type="password" name="password" id="password" />

			<div class="interactions">
				<div class="remember">
					<Checkbox :binary="true" v-model="checked" />

					<label for="">Remember me</label>
				</div>

				<a href="/vue-monitor">Forgot your password?</a>
			</div>
			<Button label="Sing In" icon="pi pi-user" />
		</form>
	</div>
</template>

<style scoped>
.heading-2 {
	font-size: 1.64rem;
	line-height: 2rem;
	margin-top: 1rem;
}
</style>
