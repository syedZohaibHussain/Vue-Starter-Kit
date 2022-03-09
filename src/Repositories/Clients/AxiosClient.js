import axios    from "axios";
import Swal     from 'vue-sweetalert2';
import store    from '../../Store'
import router   from '../../Router'

const baseDomain = "https://jsonplaceholder.typicode.com";
const baseURL = `${baseDomain}`; // Incase of /api/v1;

// Request interceptor
axios.interceptors.request.use(request => {
    const token = store.getters['auth/token']
    if (token) {
        request.headers.common.Authorization = `Bearer ${token}`
    }

    return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
    const { status } = error.response
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
export default axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
  }
});