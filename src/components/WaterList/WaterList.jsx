import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
const fakeData = [
  {
    id: "6696d059dd0da3a2efc9dc46",
    amount: 500,
    date: "1721121731000",
    norm: 1.8,
    percentage: 27.78,
  },
  {
    id: "6696d079dd0da3a2efc9dc49",
    amount: 500,
    date: "1721124000000",
    norm: 1.2,
    percentage: 41.67,
  },
  {
    id: "6696ff8f6de7677342713013",
    amount: 500,
    date: "1721125000000",
    norm: 1.2,
    percentage: 41.67,
  },
];

const WaterList = () => {
  return (
    <ul className={css.waterList}>
      {fakeData.map((item) => (
        <li key={item.id}>
          <WaterItem water={item} />
        </li>
      ))}
    </ul>
  );
};

export default WaterList;
