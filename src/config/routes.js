export const routes = {
	Home: ['/', '/home', '/foryou'],
	Following: '/following',
	Upload: '/upload',
	Profile: '/:user',
	Unknown: '/404',
};

export const childRoutes = {
	Video: `${routes.Profile}/video/:videoId`,
};
