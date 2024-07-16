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

	const dateArray = [];

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
