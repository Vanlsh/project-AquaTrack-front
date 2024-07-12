import { UserPanel } from '../UserPanel/UserPanel.jsx';
import { DailyInfo } from '../DailyInfo/DailyInfo.jsx';
import { MonthInfo } from '../MonthInfo/MonthInfo.jsx';

export const WaterDetailedInfo = () => {
	return (
		<div>
			<UserPanel />
			<DailyInfo />
			<MonthInfo />
		</div>
	);
};

// export default WaterDetailedInfo;
