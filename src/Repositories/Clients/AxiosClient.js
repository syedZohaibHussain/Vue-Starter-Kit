import axios from "axios";
import Swal from 'vue-sweetalert2';
import store from 'src/Store'
import router from 'src/Router'
const BaseDomain = "http://192.168.18.94:9001";
const baseURL = `${BaseDomain}`; // Incase of /api/v1;
// Instance Create
const Client = axios.create({
    baseURL
});
// Instance Request interceptor
Client.interceptors.request.use(request => {
    const token = store.getters.getToken
    console.log("qwe", token);
    if (token) {
        request.headers.common.Authorization = `Bearer ${token}`
    }
    return request
})
// Instance Response interceptor
Client.interceptors.response.use(response => response, error => {
    const {
        status
    } = error.response
    if (status === 401 && store.getters['auth/check']) {
        Swal.fire({
            icon: 'warning',
            title: 'token_expired_alert_title',
            text: 'token_expired_alert_text',
            reverseButtons: true,
            confirmButtonText: 'ok',
            cancelButtonText: 'cancel'
        }).then(() => {
            store.commit('auth/LOGOUT')
            router.push({
                name: 'login'
            })
        })
    }
    if (status >= 500) {
        serverError(error.response)
    }
    return Promise.reject(error)
})
let serverErrorModalShown = false
async function serverError(response) {
    if (serverErrorModalShown) {
        return
    }
    if ((response.headers['content-type'] || '').includes('text/html')) {
        const iframe = document.createElement('iframe')
        if (response.data instanceof Blob) {
            iframe.srcdoc = await response.data.text()
        } else {
            iframe.srcdoc = response.data
        }
        Swal.fire({
            html: iframe.outerHTML,
            showConfirmButton: false,
            customClass: {
                container: 'server-error-modal'
            },
            didDestroy: () => {
                serverErrorModalShown = false
            },
            grow: 'fullscreen',
            padding: 0
        })
        serverErrorModalShown = true
    } else {
        Swal.fire({
            icon: 'error',
            title: 'error_alert_title',
            text: 'error_alert_text',
            reverseButtons: true,
            confirmButtonText: 'ok',
            cancelButtonText: 'cancel'
        })
    }
}
export default Client
