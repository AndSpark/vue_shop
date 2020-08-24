import Vue from 'vue'
import {
	Button,
	Form,
	FormItem,
	Input,
	Icon,
	Avatar,
	Message,
	Container,
	Header,
	Aside,
	Main,
	Radio,
	RadioGroup,
	RadioButton,
	Menu,
	MenuItem,
	MenuItemGroup,
	Submenu,
	Breadcrumb,
	BreadcrumbItem,
	Card,
	Row,
	Col,
	Table,
	TableColumn,
	Switch,
	Pagination,
	Tooltip,
	Dialog,
	MessageBox,
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Avatar)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(RadioButton)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
