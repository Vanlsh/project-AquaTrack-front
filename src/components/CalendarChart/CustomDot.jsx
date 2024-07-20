export const CustomDot = (props) => {
	const { cx, cy, stroke } = props;
	return (
		<circle
			cx={cx}
			cy={cy}
			r={9}
			fill='white'
			stroke={stroke}
			strokeWidth={3}
		/>
	);
};
