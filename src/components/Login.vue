<script setup lang="ts"></script>

<template>
	<div class="wrapper">
		<form class="card">
			<h2 class="heading-2">Welcome Back</h2>
			<label for="email">Email </label>
			<input type="email" name="email" id="" placeholder="Email address" />

			<label for="password">Password </label>
			<input type="password" name="password" id="" placeholder="Password" />

			<div class="interactions">
				<div class="remember">
					<div class="checkbox">
						<input type="checkbox" name="" id="" />
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

<style scoped></style>
