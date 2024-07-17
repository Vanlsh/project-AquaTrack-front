import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';
const fakeData = [
	{
		id: '6696d059dd0da3a2efc9dc46',
		amount: 500,
		date: '1721121731000',
		norm: 1.8,
		percentage: 27.78,
	},
	{
		id: '6696d079dd0da3a2efc9dc49',
		amount: 500,
		date: '1721124000000',
		norm: 1.2,
		percentage: 41.67,
	},
	{
		id: '6696ff8f6de7677342713013',
		amount: 500,
		date: '1721125000000',
		norm: 1.2,
		percentage: 41.67,
	},
	{
		id: '6696ff9a6de7677342713016',
		amount: 100,
		date: '1721125400000',
		norm: 1.2,
		percentage: 8.33,
	},
	{
		id: '6696ff9f6de7677342713019',
		amount: 100,
		date: '1721155400000',
		norm: 1.2,
		percentage: 8.33,
	},
];

const WaterList = () => {
	return (
		<div className={css.container}>
			<ul className={css.waterList}>
				{fakeData.map(data => (
					<li key={data.id} className={css.water_item}>
						<WaterItem data={data} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default WaterList;
