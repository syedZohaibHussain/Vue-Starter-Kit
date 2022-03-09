

const requireContext = require.context('./Functions', false, /.*\.js$/)
const modules = requireContext.keys()
    .map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
    .reduce((modules, [name, module]) => {
        if (module.namespaced === undefined) {
            module.namespaced = true
        }
        return {
            ...modules,
            [name]: module[name]
        }
    }, {})
export default modules