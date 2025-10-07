import { Button } from "./ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/formSlice";
import { Checkbox } from "./ui/checkbox"

import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useNavigate } from "react-router-dom"
const CreateForm = () => {
   const navigate=useNavigate()
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    mobileno: "",
    gender: "",
    caste: "",
    language: [],
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.form);

  const [isOpen, setIsOpen] = useState(false);
  const changeCasteHandler = (value) => {
    setFormData((prev) => ({ ...prev, caste: value }));
  };
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }



  const changeCategoryHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: value
    }))
  }

  //submitHandler
  const submitHandler = async (e) => {
    e.preventDefault();
    const { fullname, email, age, mobileno, gender, caste } = formData;
    if (!fullname || !email || !age || !mobileno || !gender || !caste) {
      toast.error("All required fields must be filled!");
      return;
    }
    try {
      setLoading(true)
      const payload = { ...formData, age: Number(formData.age) };

      const res = await axios.post("http://localhost:8000/api/v1/form/add", payload, {
        headers: {
          'Content-type': 'application/json'
        },
        withCredentials: true
      })

      if (res.data.success) {
        dispatch(addUser(res.data.form));
        toast.success(res.data.message);
        navigate("/table");
        setFormData({ fullname: "", email: "", age: "", mobileno: "", gender: "", caste: "", language: [] });
        setIsOpen(false);

      }


    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to add user");

    } finally {
      setLoading(false);
    }

  }
  return (
    
    
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
  <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-lg p-6">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">Add User</h1>
      <p className="text-gray-500 text-sm mt-1">
        Add details about the user you want to add.
      </p>
    </div>

    <form onSubmit={submitHandler}>
      <div className="grid gap-4">
        {/* Name */}
        <div className="grid gap-2">
          <Label htmlFor="name-1">Name</Label>
          <Input
            id="name-1"
            placeholder="Enter name"
            name="fullname"
            value={formData.fullname}
            onChange={changeEventHandler}
          />
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={changeEventHandler}
          />
        </div>

        {/* Mobile */}
        <div className="grid gap-2">
          <Label htmlFor="mobileno">Mobile No</Label>
          <Input
            id="mobileno"
            name="mobileno"
            placeholder="Enter mobile number"
            value={formData.mobileno}
            onChange={changeEventHandler}
          />
        </div>

        {/* Age + Gender */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <Label htmlFor="age" className="p-2">Age</Label>
            <Input
              id="age"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex flex-col flex-1">
            <Label htmlFor="gender" className="p-2">Gender</Label>
            <Select onValueChange={changeCategoryHandler} value={formData.gender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
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

        {/* Preferred Languages */}
        <Label>Preferred Languages</Label>
        <div className="flex flex-wrap gap-3 py-2">
          {["Hindi", "English"].map((lang) => (
            <div key={lang} className="flex items-center gap-2">
              <Checkbox
                id={`lang-${lang}`}
                value={lang}
                checked={formData.language.includes(lang)}
                onCheckedChange={(checked) =>
                  setFormData((prev) => {
                    const newLang = checked
                      ? [...prev.language, lang]
                      : prev.language.filter((l) => l !== lang);
                    return { ...prev, language: Array.from(new Set(newLang)) };
                  })
                }
              />
              <Label htmlFor={`lang-${lang}`} className="cursor-pointer">{lang}</Label>
            </div>
          ))}
        </div>

        {/* Caste Radio Group */}
        <Label>Caste</Label>
        <RadioGroup value={formData.caste} onValueChange={changeCasteHandler}>
          {["General", "OBC", "SC", "ST"].map((caste) => (
            <div key={caste} className="flex items-center gap-2">
              <RadioGroupItem value={caste} id={`caste-${caste.toLowerCase()}`} />
              <Label htmlFor={`caste-${caste.toLowerCase()}`}>{caste}</Label>
            </div>
          ))}
        </RadioGroup>

        {/* Submit Button */}
        <div className="mt-6">
          {loading ? (
            <Button className="w-full">
              <Loader2 className="mr-2 h-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full"
              onClick={() => {
                toast.success("User added successfully!");
              
              }}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </form>
  </div>
</div>

  
  )
}

export default CreateForm



