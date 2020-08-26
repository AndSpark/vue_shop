import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Home')

const Welcome = () => import('@/components/content/Welcome')
const Users = () => import('@/views/users/Users')
const Rights = () => import('@/views/rights/Rights')
const Roles = () => import('@/views/rights/Roles')
const Categories = () => import('@/views/goods/GoodsCate')
Vue.use(VueRouter)

const routes = [
	{
		path: '',
		redirect: '/login',
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/home',
		redirect: '/welcome',
		component: Home,
		children: [
			{
				path: '/welcome',
				component: Welcome,
			},
			{
				path: '/users',
				component: Users,
			},
			{
				path: '/roles',
				component: Roles,
			},
			{
				path: '/rights',
				component: Rights,
			},
			{
				path: '/categories',
				component: Categories,
			},
		],
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	const tokenStr = sessionStorage.getItem('token')
	if (to.path === '/login' && !!tokenStr) return next('/home')
	if (to.path === '/login') return next()
	if (!tokenStr) return next('/login')
	next()
})

export default router
