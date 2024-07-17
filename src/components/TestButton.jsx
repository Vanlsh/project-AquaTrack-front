import { useDispatch, useSelector } from "react-redux";
import {
  addWater,
  updateWaterIntakeRecord,
  deleteWaterIntakeRecord,
  fetchDailyWater,
  fetchMonthlyWater,
} from "../redux/water/operations"; // Припускаю, що ви вже імпортуєте операцію addWater
import {
  selectWaterDailyAmount,
  selectWaterDailyRecord,
  selectWaterDailyPercentage,
  selectWaterMonthlyRecord,
} from "../redux/water/selectors";

const TestButton = () => {
  const dispatch = useDispatch();
  const waterDailyAmount = useSelector(selectWaterDailyAmount);
  const waterDailyRecord = useSelector(selectWaterDailyRecord);
  const waterDailyPercentage = useSelector(selectWaterDailyPercentage);
  const waterMonthlyRecord = useSelector(selectWaterMonthlyRecord);

  const handleAddWater = () => {
    // Ваш об'єкт для додавання, приклад:
    const newWaterRecord = {
      amount: 70,
      date: "1720911000",
      norm: 1.8,
    };

    // Відправка об'єкта до addWater через Redux dispatch
    dispatch(addWater(newWaterRecord));
  };

  const handleUpdateWater = () => {
    // Ваш об'єкт для оновлення, приклад:
    const updateWaterData = {
      id: "66963113deecd9882fde9370", // ID запису, який потрібно оновити
      formData: {
        amount: 55, // Оновлене значення
      },
    };

    // Відправка об'єкта до updateWaterIntakeRecord через Redux dispatch
    dispatch(updateWaterIntakeRecord(updateWaterData));
  };

  const handleDeleteWater = () => {
    const recordId = "66962cc1deecd9882fde9345"; // ID запису, який потрібно видалити
    dispatch(deleteWaterIntakeRecord(recordId));
  };

  const handleFetchDailyWater = () => {
    // Приклад даних для fetchDailyWater
    const fetchWaterData = "1990910000"; // Дата, за яку потрібно отримати дані
    // Відправка запиту fetchDailyWater через Redux dispatch
    dispatch(fetchDailyWater(fetchWaterData));
  };

  const handleFetchMonthlyWater = () => {
    const fetchMonthData = "1990910000"; // Приклад даних для запиту, наприклад, місяць та рік
    dispatch(fetchMonthlyWater(fetchMonthData));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={handleAddWater}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Додати запис про воду
      </button>
      <button
        onClick={handleUpdateWater}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Оновити запис про воду
      </button>
      <button
        onClick={handleDeleteWater}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Видалити запис про воду
      </button>
      <div>
        <h3>waterDaily state:</h3>
        <pre>
          {JSON.stringify(
            { waterDailyRecord, waterDailyAmount, waterDailyPercentage },
            null,
            2
          )}
        </pre>
      </div>
      {/* <div>
        <h3>waterDaily state:</h3>
        <pre>{JSON.stringify(waterDaily, null, 2)}</pre>
      </div> */}
      <button
        onClick={handleFetchDailyWater}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Отримати записи про воду за день
      </button>
      <button
        onClick={handleFetchMonthlyWater} // Додати цю кнопку
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Отримати записи про воду за місяць
      </button>
      <div>
        <h3>waterMonthly state:</h3>
        <pre>{JSON.stringify(waterMonthlyRecord, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TestButton;
