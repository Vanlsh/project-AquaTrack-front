import css from './ChooseDate.module.css';

const ChooseDate = ({ selectedDate }) => {
	return (
		<div className={css.wrap}>
			<h3 className={css.selectedDate}>
				{/* {data === date.full
					? t(today)
					: `${day}, ${t(month} */}
			</h3>
		</div>
	);
};

export default ChooseDate;
