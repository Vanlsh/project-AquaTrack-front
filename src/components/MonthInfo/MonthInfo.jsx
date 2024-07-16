import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import Calendar from '../Calendar/Calendar.jsx';

const MonthInfo = () => {
	const [year, setYear] = useState(0);
	const [month, setMonth] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(null);

	const navigate = useNavigate();
	const { date } = useParams();
	// console.log(date);

	useEffect(() => {
		setYear(new Date().getFullYear());
		setMonth(new Date().getMonth());
	}, []);

	const handleClick = (index, newDate) => {
		setSelectedIndex(index);
		navigate(`/tracker/${newDate}`);
	};

	const increment = () => {
		setSelectedIndex(null);
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
			return;
		}
		setMonth(month + 1);
	};

	const decrement = () => {
		setSelectedIndex(null);
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
			return;
		}
		setMonth(month - 1);
	};

	return (
		<div>
			<CalendarPagination
				month={month}
				year={year}
				setMonth={setMonth}
				setYear={setYear}
				increment={increment}
				decrement={decrement}
			/>
			<Calendar
				month={month}
				year={year}
				handleClick={handleClick}
				selectedIndex={selectedIndex}
			/>
		</div>
	);
};

export default MonthInfo;
