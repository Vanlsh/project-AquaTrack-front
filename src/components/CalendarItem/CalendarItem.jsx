import css from './CalendarItem.module.css';

const percents = 50;

const CalendarItem = ({ index, eachDate, sIndex, handleClick }) => {
	return (
		<button className={css.day}>
			<div
				onClick={() => handleClick(index)}
				className={`${css.date} 							
					${percents > 0 ? css.perc_filled : ''} ${sIndex === index ? css.active : ''}`}>
				{eachDate}
			</div>
			<div className={css.perc}>{`${percents} %`}</div>
		</button>
	);
};

export default CalendarItem;
