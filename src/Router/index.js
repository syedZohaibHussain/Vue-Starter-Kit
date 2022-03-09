import { createRouter, createWebHistory } 	from 'vue-router'
import VueRouteMiddleware 					from 'vue-route-middleware';

import routes from './routes'

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach(VueRouteMiddleware());

export default router