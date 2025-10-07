import { User } from 'lucide-react'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useDispatch } from 'react-redux'
import useGetForm from '../../hooks/useGetForm'

import UserTable from './UserTable' 
const Dashboard = () => {
      useGetForm((store) => store.form)
    const dispatch=useDispatch();
    const changeCategoryHandler=(value)=>{
      dispatch(setCategory(value))
    }
    const changeDoneHandler=(value)=>{
      dispatch(setCategory(value))
    }
  return (
    <div>
        <div className='flex items-center gap-2'>
            <h1 className='font-medium text-lg'>
              Filter By:
            </h1>
            <Select onValueChange={changeCategoryHandler} >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel value="rent">Rent</SelectLabel>
                  <SelectItem value="salary">salary</SelectItem>
                  <SelectItem value="food">food</SelectItem>
                  <SelectItem value="shopping">shopping</SelectItem>
                  <SelectItem value="others">others</SelectItem>

                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={changeDoneHandler}  >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mark as done" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="undone">Undone</SelectItem>
                  <SelectItem value="both">Both</SelectItem>


                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <UserTable />
    </div>
  )
}

export default Dashboard