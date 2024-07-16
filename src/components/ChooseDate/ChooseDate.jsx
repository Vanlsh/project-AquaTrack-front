import css from './ChooseDate.module.css';
import { useEffect, useState } from 'react';

const ChooseDate = () => {
	const [date, setDate] = useState("");

  useEffect(() => {

    const today = new Date().toDateString();


    if (today === new Date().toDateString()) {
      setDate(`Today`);
    }

  },[]);
	return (
		<div className={css.wrap}>
			<h3 className={css.selectedDate}>
				{date}
			</h3>
		</div>
	);
};

export default ChooseDate;
