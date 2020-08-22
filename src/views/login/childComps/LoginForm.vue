<template>
	<el-form
		ref="loginForm"
		:model="loginForm"
		:rules="loginFormRules"
		class="login-form"
	>
		<el-avatar class="login-avatar">
			<img src="@/assets/logo.png" />
		</el-avatar>
		<el-form-item size="small" prop="username">
			<el-input
				v-model="loginForm.username"
				prefix-icon="el-icon-user"
			></el-input>
		</el-form-item>
		<el-form-item size="small" prop="password">
			<el-input
				v-model="loginForm.password"
				prefix-icon="el-icon-lock"
				show-password
			></el-input>
		</el-form-item>
		<el-form-item class="login-btn" size="small">
			<el-button type="primary" @click="validate">登录</el-button>
			<el-button type="info" @click="resetForm">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import login from '@/network/login'
export default {
	name: 'loginForm',
	data() {
		return {
			loginForm: {
				username: 'admin',
				password: '123456',
			},
			loginFormRules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{
						min: 3,
						max: 10,
						message: '长度在 3 到 10 个字符',
						trigger: 'blur',
					},
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur',
					},
					{
						min: 6,
						max: 15,
						message: '长度在 6 到 15 个字符',
						trigger: 'blur',
					},
				],
			},
		}
	},
	methods: {
		resetForm() {
			this.$refs.loginForm.resetFields()
		},
		validate() {
			this.$refs.loginForm.validate(async valid => {
				if (!valid) return
				const res = await login(this.loginForm)
				if (res.meta.status == 200) {
					sessionStorage.setItem('token', res.data.token)
					this.$message.success(res.meta.msg)
					this.$router.push('/home')
				} else {
					this.$message.error(res.meta.msg)
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.login-form {
	border: 1px solid #ddd;
	width: 350px;
	height: 160px;
	padding: 100px 20px 0;
	border-radius: 3px;
	background-color: #fff;
	position: relative;
	.login-btn {
		display: flex;
		flex-direction: row-reverse;
	}
	.login-avatar {
		position: absolute;
		left: 50%;
		top: 0%;
		transform: translate(-50%, -50%);
		width: 130px;
		height: 130px;
		background-color: #eee;
		border: 5px solid #fff;
		box-shadow: 0 0 5px 2px #fff;
	}
}
</style>
