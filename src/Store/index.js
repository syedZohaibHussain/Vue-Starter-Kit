import { createStore } from 'vuex'

// Load store modules dynamically.
const requireContext 	= require.context('./Modules', false, /.*\.js$/)
const debug 			= process.env.NODE_ENV !== 'production';
const modules 			= requireContext.keys()
	.map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
	.reduce((modules, [name, module]) => {
		if (module.namespaced === undefined) {
			module.namespaced = true
		}
		return {
			...modules,
			[name]: module.default
		}
	}, {})
	
export default createStore({
	modules,
	strict: debug
})