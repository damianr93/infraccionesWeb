const api = import.meta.env.VITE_APP_API;

const url = `${api}/transporte`

const getTaxisRemises = async () => {

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

export default getTaxisRemises