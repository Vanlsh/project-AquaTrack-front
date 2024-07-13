import css from './CalendarItem.module.css';

const percents = 50;

const CalendarItem = ({ keyId, index, eachDate, sIndex, handleClick }) => {
	return (
		<div
			key={keyId}
			className={css.day}>
			<div
				onClick={() => handleClick(index)}
				className={`${css.date} 							
							${percents > 0 ? css.perc_filled : ''} ${sIndex === index ? css.active : ''}`}>
				{eachDate}
			</div>
			<div className={css.perc}>{`${percents} %`}</div>
		</div>
	);
};

export default CalendarItem;
