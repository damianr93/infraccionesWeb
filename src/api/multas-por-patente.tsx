const api = import.meta.env.VITE_APP_API;

const url = `${api}/infracciones/ciudadano`

const getMultasPorPatente = async (dominio) => {

    const resp = await fetch(`${url}?dominio=${dominio}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true' 
        },
    })
        .then((res) => res.json())
    return resp
}

export default getMultasPorPatente