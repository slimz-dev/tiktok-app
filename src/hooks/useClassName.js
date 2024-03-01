const classNames = require('classnames/bind');

function useClassName(css) {
	return classNames.bind(css);
}

export default useClassName;
