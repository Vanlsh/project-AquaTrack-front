import { useEffect } from 'react';
import {
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	AreaChart,
} from 'recharts';
import css from './WaterIntakeChart.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectWaterWeeklyData } from '../../redux/water/selectors';
import { fetchWeeklyWater } from '../../redux/water/operations';

const formatDate = (timestamp) => {
	const timestampNum = parseInt(timestamp, 10);
	if (isNaN(timestampNum)) {
		return 'Invalid Date';
	}
	const date = new Date(timestampNum);
	const day = date.getDate();

	return `${day}`;
};
const convertMlToL = (ml) => {
	return (ml / 1000).toFixed(1);
};

const CustomTooltip = ({ active, payload, coordinate }) => {
	if (active && payload && payload.length) {
		const tooltipStyle = {
			backgroundColor: 'white',
			border: '1px solid white',
			padding: '10px',
			borderRadius: '10px',
			position: 'absolute',
			transform: 'translate(-50%, -100%)',
			left: `${coordinate.x}px`,
			top: `${coordinate.y}px`,
			pointerEvents: 'none',
			whiteSpace: 'nowrap',
		};

		const labelStyle = {
			fontSize: '12px',
			fontWeight: 'bold',
		};

		return (
			<div
				className='custom-tooltip'
				style={tooltipStyle}>
				<p style={labelStyle}>{`${payload[0].value * 1000} ml`}</p>
			</div>
		);
	}

	return null;
};

const formatYAxisTick = (tick, index) => {
	if (index === 0) {
		return '0%';
	}

	return `${tick.toFixed(1)} L`;
};

const WaterIntakeChart = () => {
	const dispatch = useDispatch();
	const waterWeeklyData = useSelector(selectWaterWeeklyData);
	console.log('Data from backend:', waterWeeklyData);

	useEffect(() => {
		const formattedDate = Date.now();
		dispatch(fetchWeeklyWater(formattedDate));
	}, [dispatch]);

	const formattedData = waterWeeklyData.slice(0, 7).map((item) => ({
		date: formatDate(item.date),
		amount: convertMlToL(item.amount),
		originalAmount: item.amount,
	}));

	return (
		<div className={css.graphContainer}>
			<ResponsiveContainer
				width='100%'
				height='100%'>
				<AreaChart
					data={formattedData}
					margin={{
						top: 10,
						right: 10,
						left: 0,
						bottom: 10,
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
					<XAxis
						dataKey='date'
						tickLine={false}
						tickMargin={21}
					/>
					<YAxis
						domain={[0, 'auto']}
						tickCount={6}
						tickFormatter={formatYAxisTick}
						label={{ angle: -90, position: 'insideLeft' }}
						tickLine={false}
						tickMargin={53}
						tick={{ textAnchor: 'start' }}
					/>
					<Tooltip
						cursor={false}
						position={{ y: -30 }}
						content={<CustomTooltip />}
					/>
					<Area
						type='linear'
						dataKey='amount'
						stroke='#87D28D'
						fill='url(#colorUv)'
						dot={{
							fill: '#fff',
							stroke: '#87D28D',
							strokeWidth: 2,
							r: 8,
							fillOpacity: 1,
						}}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default WaterIntakeChart;
