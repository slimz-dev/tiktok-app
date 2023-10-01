import { Link } from 'react-router-dom';

function Button({ children, to, href, type, onClick }) {
	let props = {};
	let Component = 'div';
	if (onClick) {
		props.onClick = onClick;
	}
	if (href) {
		Component = 'a';
		props.href = href;
	}

	if (to) {
		Component = Link;
		props.to = to;
	}
	return <Component {...props}>{children}</Component>;
}

export default Button;
