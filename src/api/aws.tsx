import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API



const imageToBinary = async (file) => {
    try {
      if (!file) {
        throw new Error('Objeto de archivo nulo o indefinido');
      }
  
      const arrayBuffer = await file.arrayBuffer();
      const byteArray = new Uint8Array(arrayBuffer);
  
      const blob = new Blob([byteArray], { type: file.type });
  
      return blob;
    } catch (error) {
      console.error('Error reading image content:', error);
      throw error;
    }
  };

const getPresignedUrl = async (folder = '') => {
    try {
        const randomId = Math.random().toString(36).substring(7);
        const response = await axios.get(`${API_URL}/aws/presigned-url/${folder}-${randomId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        throw error;
    }
};

export const uploadImagesToS3 = async (imagesArray) => {
    try {
        const presignedUrls = await Promise.all(
            imagesArray.map(async () => await getPresignedUrl('infractions')),
        );

        const uploadPromises = imagesArray.map(async (image, index) => {
            const presignedUrl = presignedUrls[index];
            await axios.put(presignedUrl, await imageToBinary(image), {
                headers: {
                    'Content-Type': image.type,
                },
            });
            return presignedUrl.split('?')[0];
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

export const singleUploadToS3 = async (image, folder = '') => {
    try {
        const presignedUrl = await getPresignedUrl(folder);
        await axios.put(presignedUrl, await imageToBinary(image), {
            headers: {
                'Content-Type': image.type,
            },
        });
        return presignedUrl.split('?')[0];
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};