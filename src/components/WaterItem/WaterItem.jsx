import css from '../WaterItem/WaterItem.module.css';

const WaterItem = ({ amount, date }) => {
	return (
		<div className={css.water_item_content}>
			<svg className={css.icon_water_glass} width='44' height='45'>
				<use href='../../src/assets/icons.svg#icon-water-glass'></use>
			</svg>
			<div>
				<strong>{amount} ml</strong>
				<p>{date} AM</p>
			</div>
			<div className={css.container_buttons}>
				<button className={css.editButton}>
					<svg className={css.icon_edit} width='16' height='16'>
						<use href='../../src/assets/icons.svg#icon-edit'></use>
					</svg>
				</button>
				<button className={css.deleteButton}>
					<svg className={css.icon_edit} width='16' height='16'>
						<use href='../../src/assets/icons.svg#icon-trash'></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default WaterItem;
