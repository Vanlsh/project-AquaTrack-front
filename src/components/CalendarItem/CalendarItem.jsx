import css from './CalendarItem.module.css';

const percents = 50;

const CalendarItem = ({
	index,
	eachDate,
	sIndex,
	handleClick,
	month,
	year,
}) => {
	const dateUnix = new Date(year, month, eachDate).getTime();
	const dateNow = Date.now();
	const isDisabled = dateUnix > dateNow;

	return (
		<button
			className={`${css.day} ${isDisabled ? css.disabled : ''}`}
			disabled={isDisabled}>
			<div
				onClick={() => handleClick(index, dateUnix)}
				className={`${css.date} 							
					${percents > 0 ? css.perc_filled : ''} ${sIndex === index ? css.active : ''}`}>
				{eachDate}
			</div>
			<div className={css.perc}>{`${percents} %`}</div>
		</button>
	);
};

export default CalendarItem;
