import React, { useEffect } from 'react';
import { Area, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';
import css from "./WaterIntakeChart.module.css"
import svg from "../../assets/icons.svg"
import { useDispatch, useSelector } from 'react-redux';
import { selectWaterWeeklyData } from '../../redux/water/selectors';
import { fetchWeeklyWater } from '../../redux/water/operations';

// const formatDate = (rawDate) => {
//   const year = rawDate.substring(0, 4);
//   const month = rawDate.substring(4, 6);
//   const day = rawDate.substring(6, 8);
//   return `${day}`;
// };

// const rawData = [
//   { date: '20240501', amount: 1.5 },
//   { date: '20240502', amount: 2.0 },
//   { date: '20240503', amount: 1.8 },
//   { date: '20240504', amount: 2.5 },
//   { date: '20240505', amount: 2.2 },
//   { date: '20240506', amount: 1.9 },
//   { date: '20240507', amount: 2.3 },
// ];

// const formattedData = rawData.map(item => ({
//   date: formatDate(item.date),
//   amount: item.amount
// }));

const formatDate = (timestamp) => {
  const timestampNum = parseInt(timestamp, 10);
  if (isNaN(timestampNum)) {
    return 'Invalid Date';
  }
  const date = new Date(timestampNum);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}`;
};
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={css.customTooltip}>
        <svg className={css.waterDropImg} width="53" height="39">
          <use xlinkHref={`${svg}#icon-water-drop`} />
          <text className={css.textHint} x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="black">
            {`${payload[0].value} ml`}
          </text>
        </svg>
      </div>
    );
  }
  return null;
};
// const calculateTooltipPosition = (tooltipPos) => {
//   return {
//     x: tooltipPos.cx - 15,
//     y: tooltipPos.cy - 50
//   };
// };
const WaterIntakeChart = () => {
  const dispatch = useDispatch();
  const waterWeeklyData = useSelector(selectWaterWeeklyData);
  console.log('Data from backend:', waterWeeklyData);

  useEffect(() => {
    const formattedDate = Date.now()
    dispatch(fetchWeeklyWater(formattedDate));
  }, [dispatch]);

  const formattedData = waterWeeklyData.slice(0, 7).map(item => ({
    date: formatDate(item.date),
    amount: item.amount
  }));
  return (
    <div className={css.graphContainer}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={formattedData}
        margin={{
         top: 10, right: 30, left: 0, bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9BE1A0" stopOpacity={1} />
            <stop offset="100%" stopColor="#9BE1A0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickLine={false} tickMargin={21}/>
        <YAxis
          tickCount={6}
          domain={[0, 2.5]}
        //   domain={['auto', 'auto']}
          ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
          label={{ angle: -90, position: 'insideLeft' }}
          tickLine={false} 
          tickMargin={53}
          tick={{ textAnchor: 'start' }}
        />
         <Tooltip
            cursor={false}
            position={{ y: -30 }}
            // position={calculateTooltipPosition}
            content={<CustomTooltip />}
            // contentStyle={{
            //   borderRadius: '10px',
            //   border: '1px solid #87D28D',
            //   backgroundColor: '#fff',
            //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            //   padding: '8px 12px',
            // }}
            // labelFormatter={() => ''}
            // formatter={(value) => [`${value} L`]}
          />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#87D28D"
          fill="url(#colorUv)"
          dot={{fill: '#fff', stroke: '#87D28D', strokeWidth: 2, r: 8, fillOpacity: 1 }}
          
        />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
};

export default WaterIntakeChart;