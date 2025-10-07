import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Edit2, Loader2 } from "lucide-react";
import { updateUser } from "../redux/formSlice";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";

const UpdateTable = ({ user: selectedUser }) => {
  const [formData, setFormData] = useState({
    fullname: selectedUser?.fullname || "",
    email: selectedUser?.email || "",
    age: selectedUser?.age || "",
    mobileno: selectedUser?.mobileno || "",
    gender: selectedUser?.gender || "",
    caste: selectedUser?.caste || "",
    language: selectedUser?.language || [],
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const changeCategoryHandler = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const changeCasteHandler = (value) => {
    setFormData((prev) => ({ ...prev, caste: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = { ...formData, age: Number(formData.age) };

      const res = await axios.put(
        `http://localhost:8000/api/v1/form/update/${selectedUser._id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(updateUser(res.data.user)); // update Redux store
        toast.success(res.data.message);
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full border border-green-600 hover:border-transparent"
          variant="outline"
        >
          <Edit2 />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Update details about the user you want to update.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="fullname"
              value={formData.fullname}
              onChange={changeEventHandler}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="mobileno">Mobile No</Label>
            <Input
              id="mobileno"
              name="mobileno"
              value={formData.mobileno}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                value={formData.age}
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex flex-col flex-1">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={changeCategoryHandler} value={formData.gender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Label>Preferred Languages</Label>
          <div className="flex flex-col gap-2">
            {["Hindi", "English"].map((lang) => (
              <div key={lang} className="flex items-center gap-2">
                <Checkbox
                  id={`lang-${lang}`}
                  value={lang}
                  checked={formData.language.includes(lang)}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      language: checked
                        ? [...prev.language, lang]
                        : prev.language.filter((l) => l !== lang),
                    }))
                  }
                />
                <Label htmlFor={`lang-${lang}`}>{lang}</Label>
              </div>
            ))}
          </div>

          <Label>Caste</Label>
          <RadioGroup value={formData.caste} onValueChange={changeCasteHandler}>
            {["General", "OBC", "SC", "ST"].map((caste) => (
              <div key={caste} className="flex items-center gap-2">
                <RadioGroupItem value={caste} id={`caste-${caste}`} />
                <Label htmlFor={`caste-${caste}`}>{caste}</Label>
              </div>
            ))}
          </RadioGroup>

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {loading ? "Please wait" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTable;
