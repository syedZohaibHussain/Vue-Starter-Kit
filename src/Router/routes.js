
import Middleware from '../Middleware'

function page(path) {
	return () => 
		import( /* webpackChunkName: '' */ `../Views/${path}`).then(m => m.default || m)
}

export default [
	{
		path: '/',
		name: 'dashboard',
		component: page('Home'),
        meta: {
			layout		: 'default',
            middleware	: Middleware.checkAuth,
        }
	},
	{
		path: '/',
		name: 'Login',
		component: page('Login'),
	},
]