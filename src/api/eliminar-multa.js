
const url = `https://infracciones-backend-app-pltmo.ondigitalocean.app/infracciones`;



const deleteMulta = async (id) => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {

      const errorMessage = await response.text();
      throw new Error(`Error en la solicitud DELETE: ${errorMessage || response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {

    console.error(error.message);
    throw error;
  }
};

export default deleteMulta;