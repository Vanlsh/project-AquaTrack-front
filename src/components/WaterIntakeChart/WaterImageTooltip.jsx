import waterImage from "../../assets/water-drop.svg "
const WaterImageTooltip = ({ value }) => (
    <div style={{ padding: '10px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ marginBottom: '5px' }}>Кількість води: {value.toFixed(1)} л</div>
      <img src={waterImage} alt="Water" style={{ width: '100px', height: '100px' }} />
    </div>
  );
  
  export default WaterImageTooltip;