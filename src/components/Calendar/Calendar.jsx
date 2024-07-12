import { useState, useEffect } from 'react';
import { CalendarItem } from '../CalendarItem/CalendarItem.jsx';
import { CalendarPagination } from '../CalendarPagination/CalendarPagination';
import { months } from '../../constants';
import css from './Calendar.module.css';

const percents = 20;

export const Calendar = () => {
	const [year, setYear] = useState(0);
	const [month, setMonth] = useState(0);
	const [date, setDate] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(null);

	console.log(date);

	useEffect(() => {
		setYear(new Date().getFullYear());
		setMonth(new Date().getMonth());
		setDate(new Date().getDate());
	}, []);

	const handleClick = (index) => {
		setSelectedIndex(index);
		console.log('click');
	};

	const monthDays = () => {
		if (Number.isInteger(year / 4) && month === 1) {
			return 29;
		}
		return Object.values(months)[month];
	};

	const calendarDays = () => {
		const daysArray = [];
		for (let i = 1; i <= monthDays(); i++) {
			daysArray.push(i);
		}

		return (
			<div className={css.container}>
				{daysArray.map((eachDay, index) => (
					<div
						key={index}
						className={css.day}>
						<div
							onClick={() => handleClick(index)}
							className={`${css.date} 							
							${percents > 0 ? css.perc_filled : ''} ${
								selectedIndex === index ? css.active : ''
							}`}>
							{eachDay}
						</div>
						<div className={css.perc}>{`${percents} %`}</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<>
			<CalendarPagination
				setMonth={setMonth}
				setYear={setYear}
				month={month}
				year={year}
			/>
			<div>{calendarDays()}</div>
			<CalendarItem />
		</>
	);
};
