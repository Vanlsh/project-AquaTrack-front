import { months } from '../../constants';
import css from './CalendarPagination.module.css';

export const CalendarPagination = ({ setMonth, setYear, month, year }) => {
	const selectedMonth = Object.keys(months)[month];

	const Title = ({ title, styles }) => {
		return <span className={styles}>{title}</span>;
	};
	const increment = () => {
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
			return;
		}
		setMonth(month + 1);
	};

	const decrement = () => {
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
			return;
		}
		setMonth(month - 1);
	};

	return (
		<div className={css.calendar_title}>
			<Title
				title={'Month'}
				styles={css.month}
			/>
			<div className={css.month_ind}>
				<button
					onClick={decrement}
					className={css.btn}>
					&lt;
				</button>
				<span className={css.month_year}>
					{`${selectedMonth}, 
					${year}`}
				</span>
				<button
					onClick={increment}
					className={css.btn}>
					&gt;
				</button>
				<div className={css.statistic_btn}>
					<span>O</span>
				</div>
			</div>
		</div>
	);
};
