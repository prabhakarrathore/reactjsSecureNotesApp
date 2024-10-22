import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        try {
            const response = await axios.get('/refresh',
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            setAuth((prev) => {
                return {
                    ...prev,
                    accessToken: response.data.accessToken
                };
            });
            return response.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error; // Re-throw the error to handle it in the calling function
        }
    };
    return refresh;
};

export default useRefreshToken;
