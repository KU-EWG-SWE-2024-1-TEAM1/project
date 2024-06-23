'use client'
import { useSelector, useDispatch } from 'react-redux';
import { logout} from "@/store/slices/loginSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.login);

    const handleLogout = () => {
        dispatch(logout());
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
        }
    };

    return { isLoggedIn, user, handleLogout };
};

export default useAuth;
