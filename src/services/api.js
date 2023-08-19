export function configToken() {
    const token =  localStorage.getItem('token');
    
    const object = {headers: {'Authorization': `Bearer ${token}`}};
    return object;
}