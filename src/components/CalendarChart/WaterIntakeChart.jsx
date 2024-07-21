import {
	// React,
	useEffect,
} from 'react';
import {
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	AreaChart,
} from 'recharts';
import css from './WaterIntakeChart.module.css';
// import svg from '../../assets/icons.svg';
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
	// const month = date.getMonth() + 1;
	// const year = date.getFullYear();
	return `${day}`;
};
const convertMlToL = (ml) => {
	return (ml / 1000).toFixed(1);
};

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     const valueInMl = payload[0].payload.originalAmount;
//     return (
//       <div className={css.customTooltip}>
//         <svg className={css.waterDropImg} width="53" height="39">
//           <use xlinkHref={`${svg}#icon-water-drop`} />
//           <text className={css.textHint} x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="black">
//           {`${valueInMl} ml`}
//           </text>
//         </svg>
//       </div>
//     );
//   }
//   return null;
// };
// const calculateTooltipPosition = (tooltipPos) => {
//   return {
//     x: tooltipPos.cx - 15,
//     y: tooltipPos.cy - 50
//   };
// };

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
				{/* <p className='label'>{`${label}`}</p> */}
				<p style={labelStyle}>{`${payload[0].value * 1000} ml`}</p>
			</div>
		);
	}

	return null;
};

const formatYAxisTick = (tick, index) => {
	// Первое значение (0) форматируем как 0%
	if (index === 0) {
		return '0%';
	}
	// Остальные значения форматируем как литры, округленные до 0.1
	return `${tick.toFixed(1)} L`;
};

// Функция для генерации тиков с интервалом 0.5
// const generateTicks = (min, max, interval) => {
// 	let ticks = [];
// 	for (let i = min; i <= max; i += interval) {
// 		ticks.push(i);
// 	}
// 	return ticks;
// };

// Определение минимального и максимального значения данных

const WaterIntakeChart = () => {
	const dispatch = useDispatch();
	const waterWeeklyData = useSelector(selectWaterWeeklyData);
	console.log('Data from backend:', waterWeeklyData);

	useEffect(() => {
		const formattedDate = Date.now();
		dispatch(fetchWeeklyWater(formattedDate));
	}, [dispatch]);

	// const minUv = Math.min(...waterWeeklyData.map((d) => d.uv));
	// const maxUv = Math.max(...waterWeeklyData.map((d) => d.uv));

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
						right: 30,
						left: 0,
						bottom: 20,
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
						domain={[0, 'auto']} // Начальное значение оси Y с 0
						tickCount={6}
						// interval={0.5}
						tickFormatter={formatYAxisTick} // Форматирование значений
						// domain={[0, 2.5]}
						// domain={['auto', 'auto']}
						// ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3]}
						label={{ angle: -90, position: 'insideLeft' }}
						tickLine={false}
						tickMargin={53}
						tick={{ textAnchor: 'start' }}
						// tickFormatter={(value) => `${value} L`}

						// domain={[0, 3]}
						// tickFormatter={(tick, index) =>
						// 	index === 0 ? '0%' : `${tick.toFixed(1)} L`
						// }
						// ticks={generateTicks(0, maxUv, 0.5)}
					/>
					<Tooltip
						cursor={false}
						position={{ y: -30 }}
						// position={calculateTooltipPosition}
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
