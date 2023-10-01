import config from '~/config';
import { Home, Following, Upload, Profile, Unknown } from '~/pages';
import { DefaultLayout, HeaderOnlyLayout, HeaderFooterLayout } from '~/layouts';

const definePath = (path, component, layout = DefaultLayout) => {
	if (Array.isArray(path)) {
		let paths = [];
		path.map((road) => {
			return paths.push({
				path: road,
				component,
				layout,
			});
		});
		return paths;
	} else {
		return [
			{
				path,
				component,
				layout,
			},
		];
	}
};

const PublicRoutes = [
	...definePath(config.routes.Home, Home),
	...definePath(config.routes.Following, Following),
	...definePath(config.routes.Upload, Upload, HeaderOnlyLayout),
	...definePath(config.routes.Profile, Profile),
	...definePath(config.routes.Unknown, Unknown, HeaderFooterLayout),
];

const PrivateRoutes = [];

export { PublicRoutes, PrivateRoutes };
