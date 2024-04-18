import { lazy } from 'react';
import config from '~/config';

import { DefaultLayout, HeaderOnlyLayout, HeaderFooterLayout } from '~/layouts';
import ContentLayout from '~/layouts/ContentLayout';
const Home = lazy(() => import('~/pages/Home'));
const Following = lazy(() => import('~/pages/Following'));
const Upload = lazy(() => import('~/pages/Upload'));
const Profile = lazy(() => import('~/pages/Profile'));
const Unknown = lazy(() => import('~/pages/Unknown'));
const Video = lazy(() => import('~/pages/Profile/pages/Video'));

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
	...definePath(config.routes.Upload, Upload),
	...definePath(config.routes.Profile, Profile),
	...definePath(config.routes.Unknown, Unknown, HeaderFooterLayout),
	...definePath(config.childRoutes.Video, Video, ContentLayout),
];

const PrivateRoutes = [];

export { PublicRoutes, PrivateRoutes };
