<template>
	<div>
		<el-card>
			<div id="main" style="width: 750px;height:400px;"></div>
		</el-card>
	</div>
</template>

<script>
import report_ from '@/network/report'
import echarts from 'echarts'
import _ from 'lodash'
export default {
	name: 'Reports',
	data() {
		return {
			options: {
				title: {
					text: '用户来源',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#E9EEF3',
						},
					},
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: [
					{
						boundaryGap: false,
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
			},
		}
	},
	async mounted() {
		const myChart = echarts.init(document.getElementById('main'))
		let res = await report_()
		this.options = _.merge(this.options, res.data)
		myChart.setOption(this.options)
	},
}
</script>

<style lang="scss" scoped></style>
