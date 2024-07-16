import CalendarItem from '../CalendarItem/CalendarItem.jsx';

import { months } from '../../constants';
import css from './Calendar.module.css';

const Calendar = ({ month, year, handleClick, selectedIndex }) => {
	const monthDays = () => {
		if (Number.isInteger(year / 4) && month === 1) {
			return 29;
		}
		return Object.values(months)[month];
	};

	// const dateArray = [];

	const dateArray = [
		{
			date: 1719781200000,
			amount: 0,
			percent: 1,
			norm: 0,
		},
		{
			date: 1719867600000,
			amount: 0,
			percent: 2,
			norm: 0,
		},
		{
			date: 1719954000000,
			amount: 0,
			percent: 3,
			norm: 0,
		},
		{
			date: 1720040400000,
			amount: 0,
			percent: 4,
			norm: 0,
		},
		{
			date: 1720126800000,
			amount: 0,
			percent: 5,
			norm: 0,
		},
		{
			date: 1720213200000,
			amount: 0,
			percent: 6,
			norm: 0,
		},
		{
			date: 1720299600000,
			amount: 0,
			percent: 7,
			norm: 0,
		},
		{
			date: 1720386000000,
			amount: 0,
			percent: 8,
			norm: 0,
		},
		{
			date: 1720472400000,
			amount: 0,
			percent: 9,
			norm: 0,
		},
		{
			date: 1720558800000,
			amount: 0,
			percent: 10,
			norm: 0,
		},
		{
			date: 1720645200000,
			amount: 0,
			percent: 11,
			norm: 0,
		},
		{
			date: 1720731600000,
			amount: 0,
			percent: 12,
			norm: 0,
		},
		{
			date: 1720818000000,
			amount: 0,
			percent: 13,
			norm: 0,
		},
		{
			date: 1720904400000,
			amount: 0,
			percent: 14,
			norm: 0,
		},
		{
			date: 1720990800000,
			amount: 0,
			percent: 15,
			norm: 0,
		},
		{
			date: 1721077200000,
			amount: 0,
			percent: 16,
			norm: 0,
		},
		{
			date: 1721163600000,
			amount: 0,
			percent: 17,
			norm: 0,
		},
		{
			date: 1721250000000,
			amount: 0,
			percent: 18,
			norm: 0,
		},
		{
			date: 1721336400000,
			amount: 0,
			percent: 19,
			norm: 0,
		},
		{
			date: 1721422800000,
			amount: 0,
			percent: 20,
			norm: 0,
		},
		{
			date: 1721509200000,
			amount: 0,
			percent: 21,
			norm: 0,
		},
		{
			date: 1721595600000,
			amount: 0,
			percent: 22,
			norm: 0,
		},
		{
			date: 1721682000000,
			amount: 0,
			percent: 23,
			norm: 0,
		},
		{
			date: 1721768400000,
			amount: 0,
			percent: 24,
			norm: 0,
		},
		{
			date: 1721854800000,
			amount: 0,
			percent: 25,
			norm: 0,
		},
		{
			date: 1721941200000,
			amount: 0,
			percent: 26,
			norm: 0,
		},
		{
			date: 1722027600000,
			amount: 0,
			percent: 27,
			norm: 0,
		},
		{
			date: 1722114000000,
			amount: 0,
			percent: 28,
			norm: 0,
		},
		{
			date: 1722200400000,
			amount: 0,
			percent: 29,
			norm: 0,
		},
		{
			date: 1722286800000,
			amount: 0,
			percent: 30,
			norm: 0,
		},
		{
			date: 1722373200000,
			amount: 0,
			percent: 31,
			norm: 0,
		},
	];

	// const x = new Date('2024', '06', '30').getTime();
	// console.log(x);

	const calendarDates = () => {
		for (let i = 1; i <= monthDays(); i++) {
			dateArray.push(i);
		}
	};

	calendarDates();

	return (
		<div className={css.container}>
			<ul className={css.calendarList}>
				{dateArray.map((eachDate, index) => (
					<li key={index}>
						<CalendarItem
							index={index}
							eachDate={eachDate}
							sIndex={selectedIndex}
							handleClick={handleClick}
							month={month}
							year={year}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Calendar;
