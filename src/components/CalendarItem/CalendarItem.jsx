import css from './CalendarItem.module.css';

const CalendarItem = ({
	index,
	dateMs,
	percent,
	sIndex,
	handleClick,
	month,
	year,
}) => {
	const date = new Date(dateMs).getDate();
	const dateUnix = new Date(year, month, date).getTime();
	const dateNow = Date.now();
	const isDisabled = dateUnix > dateNow;

	return (
		<button
			className={`${css.day} ${isDisabled ? css.disabled : ''}`}
			disabled={isDisabled}>
			<div
				onClick={() => handleClick(index, dateUnix)}
				className={`${css.date} 							
					${percent > 0 ? css.perc_filled : ''} ${sIndex === index ? css.active : ''}`}>
				{date}
			</div>
			<div className={css.perc}>{`${percent} %`}</div>
		</button>
	);
};

export default CalendarItem;
