
const api = import.meta.env.VITE_APP_API;

const url = `${api}/users/login`;

const loginUser = async (data) => {


    const resp = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
    return resp
}

export default loginUser