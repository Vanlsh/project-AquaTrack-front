import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const WaterList = () => {
	return (
		<div className={css.container}>
			<ul className={css.waterList}>
				<WaterItem />
			</ul>
		</div>
	);
};

export default WaterList;
