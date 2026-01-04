import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import api from "../utils/api.js"
import { setUserData, setLoading } from '../redux/userSlice.js'
import { useEffect } from 'react'


const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.user)
    
    useEffect(() => {
        const fetchUser = async () => {
            if (!userData) return;
            dispatch(setLoading(true));
            try {
                const result = await api.get("/api/user/getcurrentuser");
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(error);

            } finally {
                dispatch(setLoading(false));
            }
        }
            fetchUser()
        },[])
}

export default useGetCurrentUser