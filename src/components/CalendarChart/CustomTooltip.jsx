export const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div
				className='custom-tooltip'
				style={{
					backgroundColor: 'lightblue',
					padding: '10px',
					borderRadius: '5px',
				}}>
				<p className='label'>{`${payload[0].value * 1000} ml`}</p>
			</div>
		);
	}

	return null;
};
