<template>
	<div>
		<el-card>
			<el-alert
				title="添加商品信息"
				type="info"
				center
				show-icon
				:closable="false"
			></el-alert>
			<el-steps :space="200" :active="step" finish-status="success" simple>
				<el-step title="基本信息"></el-step>
				<el-step title="商品参数"></el-step>
				<el-step title="商品属性"></el-step>
				<el-step title="商品图片"></el-step>
				<el-step title="商品内容"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>
			<el-tabs tab-position="left" style="height: 450px;" v-model="step1">
				<el-tab-pane label="基本信息" name="0">
					<el-form
						label-width="80px"
						:model="goodInfo"
						ref="goodInfo"
						:rules="goodInfoRules"
					>
						<el-form-item label="商品名称" prop="goods_name">
							<el-input v-model="goodInfo.goods_name"></el-input>
						</el-form-item>
						<el-form-item label="商品价格" prop="goods_price">
							<el-input v-model.number="goodInfo.goods_price"></el-input>
						</el-form-item>
						<el-form-item label="商品重量" prop="goods_weight">
							<el-input v-model.number="goodInfo.goods_weight"></el-input>
						</el-form-item>
						<el-form-item label="商品数量" prop="goods_number">
							<el-input v-model.number="goodInfo.goods_number"></el-input>
						</el-form-item>
						<el-form-item label="商品分类" prop="goods_cat">
							<el-cascader
								v-model="goodInfo.goods_cat1"
								:options="goods_cat"
								:props="cascaderProps"
								size="mini"
							></el-cascader>
						</el-form-item>
						<el-button
							type="primary"
							size="mini"
							style="margin-left:80px"
							@click="nextStep"
							>下一步</el-button
						>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="商品参数" :disabled="active" name="1">
					<el-collapse v-model="activeNames">
						<el-collapse-item
							:title="item.attr_name"
							:name="String(index1)"
							v-for="(item, index1) in goodInfo.attrso"
							:key="index1"
						>
							<el-checkbox-group v-model="item.attr_vals">
								<el-checkbox
									:label="item"
									v-for="(item, index2) in goodInfo.checkedAttrs[index1]
										.attr_vals"
									:key="index2"
									border
									size="mini"
									>{{ item }}</el-checkbox
								>
							</el-checkbox-group>
						</el-collapse-item>
					</el-collapse>
				</el-tab-pane>
				<el-tab-pane label="商品属性" :disabled="active" name="2">
					<el-collapse v-model="activeNames">
						<el-collapse-item
							:title="item.attr_name"
							:name="String(index1)"
							v-for="(item, index1) in goodInfo.attrsO"
							:key="index1"
						>
							<el-checkbox-group v-model="item.attr_vals">
								<el-checkbox
									:label="item"
									v-for="(item, index2) in goodInfo.checkedAttrsO[index1]
										.attr_vals"
									:key="index2"
									border
									size="mini"
									>{{ item }}</el-checkbox
								>
							</el-checkbox-group>
						</el-collapse-item>
					</el-collapse>
				</el-tab-pane>
				<el-tab-pane label="商品图片" :disabled="active" name="3">
					<el-upload
						:action="uploadUrl"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:file-list="fileList"
						:headers="token"
						list-type="picture"
						:on-success="handleSuccess"
					>
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-tab-pane>
				<el-tab-pane label="商品内容" :disabled="active" name="4">
					<quill-editor v-model="goodInfo.goods_introduce"></quill-editor>
					<el-button
						type="primary"
						size="small"
						style="margin-top:20px"
						@click="confirmUpdate"
						>确认上传</el-button
					>
				</el-tab-pane>
			</el-tabs>
		</el-card>
		<el-dialog title="预览图片" :visible.sync="dialogVisible">
			<el-image :src="imgUrl" fit="contain"></el-image>
		</el-dialog>
	</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { goodsCate_, goodsCateAttr_, addGood_ } from '@/network/goods'
export default {
	name: 'GoodsAdd',
	data() {
		return {
			dialogVisible: false,
			activeNames: ['0'],
			goodInfo: {
				goods_name: '',
				goods_cat: '',
				goods_price: '',
				goods_number: '',
				goods_weight: '',
				goods_introduce: '',
				pics: [],
				attrs: [],
				attrso: [],
				attrsO: [],
				set goods_cat1(v) {
					this.goods_cat = v.join(',')
				},
				checkedAttrs: [],
				checkedAttrsO: [],
			},
			step: 0,
			active: true,
			goods_cat: [],
			goodInfoRules: {
				goods_name: [
					{ required: true, message: '请输入商品名称', trigger: 'blur' },
				],
				goods_price: [
					{ required: true, message: '请输入商品价格', trigger: 'blur' },
					{
						type: 'number',
						message: '价格必须为数字值',
						trigger: 'blur',
						min: 0,
					},
				],
				goods_number: [
					{ required: true, message: '请输入商品数量', trigger: 'blur' },
					{
						type: 'number',
						message: '数量必须为数字值',
						trigger: 'blur',
						min: 0,
					},
				],
				goods_weight: [
					{ required: true, message: '请输入商品重量', trigger: 'blur' },
					{
						type: 'number',
						message: '重量必须为数字值',
						trigger: 'blur',
						min: 0,
					},
				],
				goods_cat: [
					{ required: true, message: '请选择商品分类', trigger: 'blur' },
				],
			},
			cascaderProps: {
				expandTrigger: 'hover',
				value: 'cat_id',
				label: 'cat_name',
				children: 'children',
			},
			uploadUrl: 'http://127.0.0.1:8888/api/private/v1/upload',
			fileList: [],
			imgUrl: '',
		}
	},
	components: {
		quillEditor,
	},
	created() {
		this.goodsCate()
	},
	computed: {
		step1: {
			get() {
				return String(this.step)
			},
			set(v) {
				this.step = Number(v)
			},
		},
		token() {
			return {
				Authorization: window.sessionStorage.getItem('token'),
			}
		},
	},
	methods: {
		async goodsCate() {
			let res = await goodsCate_()
			if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
			this.goods_cat = res.data
			console.log(res.data)
		},
		nextStep() {
			this.$refs.goodInfo.validate(async (v, p) => {
				if (!v) return this.$message.error(Object.values(p)[0][0].message)
				this.step1 = 1
				this.active = false
				this.tab_click()
			})
		},
		async tab_click() {
			let id = this.goodInfo.goods_cat.slice(-1)
			let res = await goodsCateAttr_(id, 'many')
			if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
			res.data.map(v => {
				this.goodInfo.checkedAttrs.push({
					attr_id: v.attr_id,
					attr_name: v.attr_name,
					attr_vals: v.attr_vals.split(','),
				})
				this.goodInfo.attrso.push({
					attr_id: v.attr_id,
					attr_name: v.attr_name,
					attr_vals: v.attr_vals.split(','),
				})
			})
			let res2 = await goodsCateAttr_(id, 'only')
			if (res2.meta.status !== 200) return this.$message.error(res2.meta.msg)
			res2.data.map(v => {
				this.goodInfo.checkedAttrsO.push({
					attr_id: v.attr_id,
					attr_name: v.attr_name,
					attr_vals: v.attr_vals.split(','),
				})
				this.goodInfo.attrsO.push({
					attr_id: v.attr_id,
					attr_name: v.attr_name,
					attr_vals: v.attr_vals.split(','),
				})
			})
		},
		handlePreview(file) {
			this.imgUrl = file.response.data.url
			this.dialogVisible = true
		},
		handleRemove(file) {
			let i = this.goodInfo.pics.findIndex(v => [
				v.pic == file.response.data.tmp_path,
			])
			this.goodInfo.pics.splice(i, 1)
			this.fileList.splice(i, 1)
			this.$message.success('删除成功')
		},
		handleSuccess(res, file) {
			this.goodInfo.pics.push({ pic: res.data.tmp_path })
			this.fileList.push(file)
			this.$message.success('上传成功')
		},
		confirmUpdate() {
			this.$refs.goodInfo.validate(async (v, p) => {
				if (!v) return this.$message.error(Object.values(p)[0][0].message)
				this.goodInfo.attrso.map(v => {
					v.attr_vals.map(x => {
						this.goodInfo.attrs.push({
							attr_id: v.attr_id,
							attr_value: x,
						})
					})
				})
				let res = await addGood_(this.goodInfo)
				if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
				this.$message.success(res.meta.msg)
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.el-steps {
	margin: 15px 0 50px 0;
}
.el-tab-pane {
	height: 450px;
	overflow: auto;
}
</style>
