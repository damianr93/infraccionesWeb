

const url = 'http://localhost:3000/nomencladores'

const getNomenclador = async () => {

    const token = localStorage.getItem('token');

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then((res) => res.json())
    return resp
}

export default getNomenclador