import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import useLocalStorage from "../hooks/useLocalStorage";
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                    await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth.id &&!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () =>{ isMounted = false;}
    }, [])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin