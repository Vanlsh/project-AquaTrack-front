import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import Calendar from '../Calendar/Calendar.jsx';

const MonthInfo = () => {
	// const [year, setYear] = useState(0);
	// const [month, setMonth] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState(null);

	const navigate = useNavigate();

	// useEffect(() => {
	// 	setYear(new Date().getFullYear());
	// 	setMonth(new Date().getMonth());
	// }, []);

	const handleClick = (index, newDate) => {
		setSelectedIndex(index);
		navigate(`/tracker/${newDate}`);
	};

	return (
		<div>
			<CalendarPagination setSelectedIndex={setSelectedIndex} />
			<Calendar
				// month={month}
				// year={year}
				handleClick={handleClick}
				selectedIndex={selectedIndex}
			/>
		</div>
	);
};

export default MonthInfo;
