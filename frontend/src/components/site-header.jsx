import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";

// ...existing code...

export function SiteHeader() {
  const navigate = useNavigate();
  const user = { name: "Admin" }; // Replace with actual auth info

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className="fixed top-0 right-0 w-[84%] z-50 h-20 bg-purple-700 text-white shadow-md"
    >
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left side - Title */}
        <div className="text-2xl font-bold tracking-wide select-none">
          Admin Panel
        </div>

        {/* Right side - User Avatar / Logout */}
        <div className="flex items-center gap-4">
          <span className="hidden md:block font-medium">{user.name}</span>
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-36 p-2">
              <Button
                variant="link"
                className="w-full text-red-600 hover:bg-red-100"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}