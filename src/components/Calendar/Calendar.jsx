import { useState } from 'react';
import CalendarItem from '../CalendarItem/CalendarItem.jsx';

import { months } from '../../constants';
import css from './Calendar.module.css';

const Calendar = ({ month, year }) => {
	const [selectedIndex, setSelectedIndex] = useState(null);

	const handleClick = (index) => {
		setSelectedIndex(0);
		setSelectedIndex(index);
		console.log('click');
	};

	const monthDays = () => {
		if (Number.isInteger(year / 4) && month === 1) {
			return 29;
		}
		return Object.values(months)[month];
	};

	const dateArray = [];

	const calendarDate = () => {
		for (let i = 1; i <= monthDays(); i++) {
			dateArray.push(i);
		}
	};

	calendarDate();

	return (
		<div className={css.container}>
			<ul className={css.calendarList}>
				{dateArray.map((eachDate, index) => (
					<li key={index}>
						<CalendarItem
							// key={index}
							index={index}
							eachDate={eachDate}
							sIndex={selectedIndex}
							handleClick={handleClick}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Calendar;
