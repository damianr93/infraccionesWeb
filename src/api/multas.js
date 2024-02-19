

const url = `https://infracciones-backend-app-pltmo.ondigitalocean.app/infracciones`

const getMultas = async () => {

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

export default getMultas