import { PureComponent } from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

import { CustomTooltip } from './CustomTooltip.jsx';
// import css from './CalendarChart.module.css';
const data = [
	{
		name: '10',
		uv: 0.5,
		// pv: 2400,
		// amt: 2400,
	},
	{
		name: '11',
		uv: 1.5,
		// pv: 1398,
		// amt: 2210,
	},
	{
		name: '12',
		uv: 1.0,
		// pv: 9800,
		// amt: 2290,
	},
	{
		name: '13',
		uv: 2.5,
		// pv: 3908,
		// amt: 2000,
	},
	{
		name: '14',
		uv: 0.5,
		// pv: 4800,
		// amt: 2181,
	},
	{
		name: '15',
		uv: 1,
		// pv: 3800,
		// amt: 2500,
	},
	{
		name: '16',
		uv: 1.5,
		// pv: 4300,
		// amt: 2100,
	},
];
// const CustomTooltip = ({ active, payload }) => {
// 	if (active && payload && payload.length) {
// 		return (
// 			<div
// 				className='custom-tooltip'
// 				style={{
// 					backgroundColor: 'lightblue',
// 					padding: '10px',
// 					borderRadius: '5px',
// 				}}>
// 				<p className='label'>{`${payload[0].value * 1000} ml`}</p>
// 			</div>
// 		);
// 	}

// 	return null;
// };
export default class Example extends PureComponent {
	static demoUrl =
		'https://codesandbox.io/p/sandbox/simple-area-chart-4y9cnl';

	render() {
		return (
			<ResponsiveContainer
				width={500}
				height='60%'>
				<AreaChart
					width={500}
					height={400}
					data={data}
					margin={{
						top: 10,
						right: 30,
						left: 0,
						bottom: 0,
					}}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip content={<CustomTooltip />} />
					<Area
						type='linear'
						dataKey='uv'
						stroke='#8884d8'
						fill='#8884d8'
					/>
				</AreaChart>
			</ResponsiveContainer>
		);
	}
}
