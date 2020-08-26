export const deleteDiglog = {
	methods: {
		showDeleteDiglog(id, delaxios, refresh) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
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
