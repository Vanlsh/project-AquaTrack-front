import WaterList from "../WaterList/WaterList";
import css from "./DailyInfo.module.css";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import ChooseDate from "../ChooseDate/ChooseDate";
// import { useState } from 'react';

const DailyInfo = () => {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={css.info}>
      <div className={css.header}>
        <ChooseDate />
        <AddWaterBtn />
      </div>
      {/* {isOpen && (
        <Modal>
          <WaterModal />
        </Modal>
      )} */}
      <div className={css.content}>
        <WaterList />
      </div>
    </div>
  );
};

export default DailyInfo;
