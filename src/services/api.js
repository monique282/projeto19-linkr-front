export function configToken() {
    const { token } =  JSON.parse(localStorage.getItem('data')); //VERIFICAR O NOME QUE ESTÁ SENDO GUARDADO NO LOCAL STORAGE NO LUGAR DE 'data'
    
    const object = {headers: {'Authorization': `Bearer ${token}`}};
    return object;
}