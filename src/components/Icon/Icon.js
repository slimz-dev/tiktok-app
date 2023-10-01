function Icon({ children, width = '1em', height = '1em' }) {
	let RenderIcon = children;
	return <RenderIcon width={width} height={height}></RenderIcon>;
}

export default Icon;
