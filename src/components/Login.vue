<template>
	<div class="wrapper">
		<form class="card">
			<h2 class="heading-2">Welcome Back</h2>
			<label for="email" class="input-label" s>Email </label>
			<input type="email" name="email" id="" placeholder="Email address" />

			<label for="password" class="input-label">Password </label>
			<input type="password" name="password" id="" placeholder="Password" />

			<div class="interactions">
				<div class="remember">
					<div class="checkbox">
						<Checkbox id="remember" :binary="true" v-model="checked" />
					</div>

					<label for="">Remember Me</label>
				</div>

				<a href="">Forgot your password?</a>
			</div>

			<button v-ripple class="button">
				<span class="pi pi-user"></span> Sign In
			</button>
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

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(true);
</script>
