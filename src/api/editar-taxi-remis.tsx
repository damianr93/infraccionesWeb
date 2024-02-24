const api = import.meta.env.VITE_APP_API;

const url = `${api}/taxi-remis`;

const patchTaxiRemis = async (id, data) => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PATCH',
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

export default patchTaxiRemis;