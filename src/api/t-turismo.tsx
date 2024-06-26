const api = import.meta.env.VITE_APP_API;

const url = `${api}/t-turismo`

export const getTransporteTurismo = async () => {

    const token = localStorage.getItem('token');

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true' 
        },
    })
        .then((res) => res.json())
    return resp
}


export const getTransporteTurismoPorUser = async() => {

    const token = localStorage.getItem('token');
    const turismId = sessionStorage.getItem('userId');
    const resp = await fetch(`${url}?turismoId=${turismId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true' 
        },
    })
        .then((res) => res.json())
    return resp

}


