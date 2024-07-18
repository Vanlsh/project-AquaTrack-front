import { useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';
import Calendar from '../Calendar/Calendar.jsx';

const MonthInfo = () => {
	const [selectedIndex, setSelectedIndex] = useState(null);

	return (
		<div>
			<CalendarPagination setSelectedIndex={setSelectedIndex} />
			<Calendar
				setSelectedIndex={setSelectedIndex}
				selectedIndex={selectedIndex}
			/>
		</div>
	);
};

export default MonthInfo;
