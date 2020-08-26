export const deleteDiglog = {
	methods: {
		showDeleteDiglog(id, delaxios, refresh) {
			return this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					console.log(id)
					let res = await delaxios(id)
					if (res.meta.status !== 200) return this.$message.error('删除失败')
					refresh && refresh()
					this.$message({
						type: 'success',
						message: '删除成功!',
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					})
				})
		},
	},
}

export const sureDiglog = {
	methods: {
		sureDate(formData, axios, params, refresh, ref, status = 200) {
			formData.validate(async (v, p) => {
				if (!v) return this.$message.error(Object.values(p)[0][0].message)
				let res = await axios(params)
				if (res.meta.status !== status) return this.$message.error(res.meta.msg)
				this.$message.success(res.meta.msg)
				refresh && refresh()
				this.$refs[ref].dialogFormVisible = false
			})
		},
	},
}
