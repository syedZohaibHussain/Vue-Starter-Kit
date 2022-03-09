export default {
	install(Vue, store) {
		const HELPER = Vue.config.globalProperties
		
		HELPER.globalHelper = () => {
			console.log("globalHelper")
			console.log(store);
		}
	}
}