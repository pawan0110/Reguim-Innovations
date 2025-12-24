import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "../utils/api.js";
import { setUserData, setLoading } from "../redux/userSlice.js";

const useGetCurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            dispatch(setLoading(true));
            try {
                const result = await api.get("/api/user/getcurrentuser");
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchUser();
    }, [dispatch]); 
};

export default useGetCurrentUser;
