const api = import.meta.env.VITE_APP_API;

const url = `${api}/infracciones`

const generarLinkPago = async (id) => {
    const resp = await fetch(`${url}/pago/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true' 
        },
    })
        .then((res) => res.text())
    return resp
}

export default generarLinkPago