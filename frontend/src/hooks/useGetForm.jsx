import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setExpense } from '../redux/expenseSlice';

const useGetForm = () => {
    const dispatch=useDispatch();
    const {category,markAsDone}=useSelector(store=>store.user)
    useEffect(()=>{
        const fetchExpense=async ()=>{
            try {
                axios.defaults.withCredentials=true;
                const res=await axios.get(`http://localhost:8000/api/v1/expense/getall?category=${category}&done=${markAsDone}`)
                if(res.data.success){
                    dispatch(setExpense(res.data.expense))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchExpense();
    },[dispatch,category,markAsDone])
}

export default useGetForm