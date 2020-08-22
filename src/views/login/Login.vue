<template>
	<div class="login-container">
		<login-form></login-form>
	</div>
</template>

<script>
import LoginForm from '@/views/login/childComps/LoginForm'
export default {
	name: 'Login',
	data() {
		return {}
	},
	components: {
		LoginForm,
	},
}
</script>

<style lang="scss" scoped>
.login-container {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #2b4b6be1;
	.login-form {
		transform: scale(0.95);
	}
}
</style>
