import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import axios from 'axios';
import { setUsers } from "../../redux/formSlice";
import UpdateTable from '../UpdateTable';
import { toast } from 'sonner';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.form); // ✅ Correct slice
  const [LocalUser, setLocalUser] = useState(users || []);

  // Remove user handler
  const removeUserHandler = async (id) => {
    const filtered = LocalUser.filter((e) => e._id !== id);
    setLocalUser(filtered);

    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/form/remove/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUsers(filtered)); // ✅ Correct action
        toast.success("User deleted successfully");
      }
    } catch (err) {
      console.error("Failed to delete user", err);
      setLocalUser(LocalUser); // rollback UI
      toast.error("Failed to delete user");
    }
  };

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/form/getall", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUsers(res.data.users)); // ✅ Correct action
          setLocalUser(res.data.users);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 pt-20 px-6">
      <Table className="w-full">
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-left">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Mobile No</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Caste</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LocalUser?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">Add your first user</TableCell>
            </TableRow>
          ) : (
            LocalUser.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium text-left">{item.fullname}</TableCell>
                <TableCell className="text-left">{item.email}</TableCell>
                <TableCell className="text-left">{item.age}</TableCell>
                <TableCell className="text-left">{item.mobileno}</TableCell>
                <TableCell className="text-left">{item.gender}</TableCell>
                <TableCell className="text-left">{item.caste}</TableCell>
                <TableCell className="text-left">{Array.isArray(item.language) ? item.language.join(", ") : item.language}</TableCell>
                <TableCell className="text-left">{item.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => removeUserHandler(item._id)}
                      size="icon"
                      className="rounded-full border border-red-600 hover:border-transparent"
                      variant="outline"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>

                    {/* Pass user as prop */}
                    <UpdateTable user={item} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total Users: {LocalUser.length}</TableCell>
            <TableCell colSpan={7}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default UserTable;
