export function checkAuth(to, from, next) {
    let auth = true;
    if(!auth){
        next({ name: 'Login' });
    }
}