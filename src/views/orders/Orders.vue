<template>
	<div>
		<el-card>
			<el-input
				placeholder="请输入内容"
				class="input-with-select"
				size="mini"
				v-model="params.query"
				@change="ordersList"
				clearable
				@clear="ordersList"
			>
				<el-button slot="append" icon="el-icon-search" size="mini"></el-button>
			</el-input>
			<el-table :data="goods" size="mini">
				<el-table-column type="index"> </el-table-column>
				<el-table-column prop="order_number" label="订单编号">
				</el-table-column>
				<el-table-column prop="order_price" label="订单价格"> </el-table-column>
				<el-table-column prop="pay_status" label="是否付款"> </el-table-column>
				<el-table-column prop="is_send" label="是否发货"> </el-table-column>
				<el-table-column label="下单时间">
					<template #default="{row}">
						<p>{{ new Date(row.create_time) | formatDate }}</p>
					</template>
				</el-table-column>
				<el-table-column prop="prop" label="操作">
					<template>
						<el-button
							type="primary"
							icon="el-icon-edit"
							circle
							size="mini"
							@click="showbox"
						></el-button>
						<el-button
							type="success"
							icon="el-icon-more"
							circle
							size="mini"
							@click="showKuaidi"
						></el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="params.pagenum"
				:page-sizes="[10, 20]"
				:page-size="10"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</el-card>
		<el-dialog title="修改地址" :visible.sync="dialogVisible">
			<el-form ref="addressForm" label-width="100px" :rules="addressFormRules">
				<el-form-item label="省市区/县" prop="addr1">
					<el-cascader :options="city" v-model="addressForm.addr1">
					</el-cascader>
				</el-form-item>
				<el-form-item label="详细地址" prop="addr2">
					<el-input v-model="addressForm.addr2"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false"
					>确 定</el-button
				>
			</div>
		</el-dialog>
		<el-dialog title="查看物流进度" :visible.sync="Skuaidi">
			<el-timeline>
				<el-timeline-item
					v-for="(activity, index) in kuaidi"
					:key="index"
					:timestamp="activity.time"
				>
					{{ activity.context }}
				</el-timeline-item>
			</el-timeline>
		</el-dialog>
	</div>
</template>

<script>
import city from '@/common/city_data2017_element'
import { formatDate } from '@/common/util'
import { ordersList_, ordersKuaidi_ } from '@/network/orders'
export default {
	name: 'Orders',
	data() {
		return {
			Skuaidi: false,
			dialogVisible: false,
			params: {
				query: '',
				pagenum: 1,
				pagesize: 10,
				user_id: '',
				pay_status: '',
				is_send: '',
				order_fapiao_title: [],
				order_fapiao_company: '',
				order_fapiao_content: '',
				consignee_addr: '',
			},
			goods: [],
			total: 0,
			addressForm: {
				addr1: [],
				addr2: '',
			},
			addressFormRules: {
				addr1: [{ required: true, message: '请选择地址', trigger: 'blur' }],
				addr2: [{ required: true, message: '请输入地址', trigger: 'blur' }],
			},
			city,
			kuaidi: [],
		}
	},
	created() {
		this.ordersList()
	},
	filters: {
		formatDate(v) {
			return formatDate(v)
		},
	},
	methods: {
		async ordersList() {
			let res = await ordersList_(this.params)
			if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
			this.total = res.data.total
			this.goods = res.data.goods
		},
		handleSizeChange(v) {
			this.params.pagesize = v
			this.ordersList()
		},
		handleCurrentChange(v) {
			this.params.pagenum = v
			this.ordersList()
		},
		showbox() {
			this.dialogVisible = true
		},
		async showKuaidi() {
			console.log(123)
			let res = await ordersKuaidi_(1106975712662)
			console.log(res)
			if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
			this.kuaidi = res.data
			this.Skuaidi = true
		},
	},
}
</script>

<style lang="scss" scoped>
.el-input {
	width: 250px;
}
.el-table {
	margin: 20px 0;
}
</style>
