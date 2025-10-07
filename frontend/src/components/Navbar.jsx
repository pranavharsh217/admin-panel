import { Link, useNavigate } from 'react-router-dom';

import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Button } from '../components/ui/button';
import axios from 'axios';

const Navbar = () => {
    const user=true;
    const navigate=useNavigate();
    const logoutHandler=async()=>{
        try{
            const res=await axios.get("http://localhost:8000/api/v1/user/logout")
            if(res.data.success){
                navigate("/login")
            }

        }catch(error){
            console.log(error);
            
        }
    }
  return (
    <div className='border-b border-gray-300'>
    <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
   
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <Button variant="link" onClick={logoutHandler}>logout</Button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login"><Button variant="outline">Login</Button></Link>
          <Link to="/signup"><Button>Signup</Button></Link>
        </div>
      )}
    </div>
    </div>
  );
};

export default Navbar;
