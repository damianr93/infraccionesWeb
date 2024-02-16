import { useEffect, useState } from "react";
import getUsers from '../api/users.js';

export const useObtenerUsuarios = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const obtenerusers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error al obtener users:', error);
            }
        };

        obtenerusers();
    }, []);

    return users;
};