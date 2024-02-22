
const api = import.meta.env.VITE_APP_API;
const url = `${api}/nomencladores`;

const postNomencladores = async (data) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {

      const errorMessage = await response.text();
      throw JSON.parse(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {

    console.error(error.message);
    throw error;
  }
};

export default postNomencladores;