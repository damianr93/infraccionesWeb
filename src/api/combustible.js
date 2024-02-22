
const api = import.meta.env.VITE_APP_API;

const URL = `${api}/combustible`

const getValorUnidadFija = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch(`${URL}`, {
        method: 'GET',
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
  
  export default getValorUnidadFija;