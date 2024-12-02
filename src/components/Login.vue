<script setup lang="ts">
import { ref } from 'vue';
const checked = ref(true);
</script>

<template>
	<div class="wrapper">
		<Card class="card">
			<template #content>
				<Form>
					<h2 class="heading-2">Welcome Back</h2>
					<label for="username" class="input-label">Username </label>
					<InputText type="text" placeholder="Username" id="username" />

					<label for="password" class="input-label">Password </label>
					<Password
						type="password"
						placeholder="Password"
						:feedback="false"
						toggleMask
						fluid
						id="password"
					/>

					<div class="interactions">
						<div class="remember">
							<Checkbox :binary="true" v-model="checked" />

							<label for="checkbox">Remember me</label>
						</div>

						<a href="/vue-monitor">Forgot your password?</a>
					</div>
					<Button label="Sing In" icon="pi pi-user" />
				</Form>
			</template>
		</Card>
	</div>
</template>

<style scoped>
.heading-2 {
	font-size: 1.64rem;
	font-weight: 600;
	line-height: 2rem;
	margin-top: 1rem;
}
</style>
