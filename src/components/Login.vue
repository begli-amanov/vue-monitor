<script setup lang="ts"></script>

<template>
	<div class="wrapper">
		<form class="card">
			<h3>Welcome Back</h3>
			<label for="email">Email </label>
			<input type="email" name="email" id="" placeholder="Email address" />

			<label for="password">Password </label>
			<input type="password" name="password" id="" placeholder="Password" />

			<button v-ripple class="button">
				<span class="pi pi-user"></span> Sign In
			</button>
		</form>
	</div>
</template>
