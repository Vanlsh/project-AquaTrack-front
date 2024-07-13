import { useState, useEffect } from 'react';
import { CalendarPagination } from '../CalendarPagination/CalendarPagination.jsx';
import { Calendar } from '../Calendar/Calendar.jsx';

export const MonthInfo = () => {
	const [year, setYear] = useState(0);
	const [month, setMonth] = useState(0);

	useEffect(() => {
		setYear(new Date().getFullYear());
		setMonth(new Date().getMonth());
	}, []);

	return (
		<div>
			<CalendarPagination
				month={month}
				year={year}
				setMonth={setMonth}
				setYear={setYear}
			/>
			<Calendar
				month={month}
				year={year}
			/>
		</div>
	);
};
