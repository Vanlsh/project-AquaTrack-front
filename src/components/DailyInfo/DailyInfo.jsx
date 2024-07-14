import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import ChooseDate from '../ChooseDate/ChooseDate';

const DailyInfo = ({ selectedDate }) => {
	return (
		<div className={css.info}>
			<div className={css.header}>
				<ChooseDate selectedDate={selectedDate} />
				<AddWaterBtn isBig={false} selectedDate={selectedDate} />
			</div>
			<div className={css.content}>
				<WaterList selectedDate={selectedDate} />
			</div>
		</div>
	);
};

export default DailyInfo;
