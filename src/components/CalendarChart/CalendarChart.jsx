// import { PureComponent } from 'react';
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
import { CustomDot } from './CustomDot.jsx';

import css from './CalendarChart.module.css';
const data = [
	{
		name: '9',
		uv: 1.5,
	},
	{
		name: '10',
		uv: 0.5,
	},
	{
		name: '11',
		uv: 1.5,
	},
	{
		name: '12',
		uv: 1.0,
	},
	{
		name: '13',
		uv: 2.5,
	},
	{
		name: '14',
		uv: 0.5,
	},
	{
		name: '15',
		uv: 2.1,
	},
	{
		name: '16',
		uv: 1.5,
	},
	{
		name: '17',
		uv: 2.0,
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

// const CustomDot = (props) => {
// 	const { cx, cy, stroke } = props;
// 	return (
// 		<circle
// 			cx={cx}
// 			cy={cy}
// 			r={9}
// 			fill='white'
// 			stroke={stroke}
// 			strokeWidth={3}
// 		/>
// 	);
// };

const formatYAxisTick = (tick, index) => {
	// Первое значение (0) форматируем как 0%
	if (index === 0) {
		return '0%';
	}
	// Остальные значения форматируем как литры, округленные до 0.1
	return `${tick.toFixed(1)} L`;
};

const Example = () => {
	const ticks = data.map((d) => d.name);
	const firstTick = ticks[0];
	const lastTick = ticks[ticks.length - 1];
	const domain = [firstTick, lastTick];

	return (
		<div className={css.container}>
			<ResponsiveContainer
				width='100%'
				height='100%'>
				<AreaChart
					width='100%'
					height='100%'
					data={data}
					// overflow={'hidden'}
					margin={{
						top: 10,
						right: 30,
						left: 40,
						bottom: 0, // Добавлен отступ слева для оси Y
					}}>
					<defs>
						<linearGradient
							id='colorUv'
							x1='0'
							y1='0'
							x2='0'
							y2='1'>
							<stop
								offset='0%'
								stopColor='#9BE1A0'
								stopOpacity={1}
							/>
							<stop
								offset='100%'
								stopColor='#9BE1A0'
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray='3 3' />
					{/* <XAxis
							dataKey='name'
							domain={['dataMin', 'dataMax']} // Включає всі дані в межах мінімуму і максимуму
							tick={{ fontSize: 12 }} // Налаштування розміру шрифту для осі X
						/> */}
					{/* <YAxis /> */}
					<XAxis
						dataKey='name'
						type='category'
						domain={domain}
						ticks={ticks}
						tickFormatter={(value) => {
							// Форматування осі X для приховування значень на краях
							if (value === firstTick || value === lastTick) {
								return '';
							}
							return value;
						}}
						tick={{ fontSize: 12 }} // Налаштування розміру шрифту для осі X
						// padding={{ left: 30, right: 30 }}
						// margin={{ left: -200, right: -200 }}
						// overflow={'hidden'}
					/>
					<YAxis
						domain={[0, 3]} // Начальное значение оси Y с 0
						tickFormatter={formatYAxisTick} // Форматирование значений
						tickCount={7} // Количество тиков, можно настроить по необходимости
					/>
					<Tooltip
						content={<CustomTooltip />}
						cursor={{ strokeDasharray: '3 3' }}
					/>

					<Area
						type='linear'
						dataKey='uv'
						stroke='#87D28D'
						strokeWidth={3}
						fill='url(#colorUv)'
						// dot={<CustomDot stroke='#87D28D' />}
						dot={<CustomDot />}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};
export default Example;
