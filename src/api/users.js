const api = import.meta.env.VITE_APP_API;

const url = `${api}/users`;

const getUsers = async () => {

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

export default getUsers