export const CustomTooltip = ({ active, payload, coordinate }) => {
	if (active && payload && payload.length) {
		const tooltipStyle = {
			backgroundColor: 'white',
			border: '1px solid white',
			padding: '10px',
			borderRadius: '10px',
			position: 'absolute',
			transform: 'translate(-50%, -100%)',
			left: `${coordinate.x}px`,
			top: `${coordinate.y}px`,
			pointerEvents: 'none',
			whiteSpace: 'nowrap',
		};

		const labelStyle = {
			fontSize: '12px',
			fontWeight: 'bold',
		};

		return (
			<div
				className='custom-tooltip'
				style={tooltipStyle}>
				{/* <p className='label'>{`${label}`}</p> */}
				<p style={labelStyle}>{`${payload[0].value * 1000} ml`}</p>
			</div>
		);
	}

	return null;
};
