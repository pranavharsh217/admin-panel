import { Form } from "../models/form.model.js";

export const registerUser = async (req, res) => {
    try {
        const { fullname, email, age, mobileno, gender,caste,language } = req.body;

        if (!fullname || !email || !age || !mobileno || !gender || !caste || !language) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const form = await Form.create({ fullname, email, age, mobileno, gender,caste,language });

        return res.status(201).json({
            message: "User added successfully",
            form,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeUser = async (req, res) => {
    try {
         const id = req.params.id;              
        const deletedUser = await Form.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "User removed successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateUsers = async (req, res) => {
    try {
         const id = req.params.id;
        const { fullname, email, age, mobileno, gender ,caste ,language } = req.body;
        const updatedUser = await Form.findByIdAndUpdate(
            id,
            { fullname, email, age, mobileno, gender,caste,language },
            { new: true }
        );
        if (!updatedUser) {         
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }   


        return res.status(200).json({
            message: "User updated successfully",
            updatedUser,
            success: true
        });
    } catch (error) {       
        
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }       
}


export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch user by ID
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      form,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};

export const markAsDoneOrUndone = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const {done} = req.body;
     if (done === undefined) {
      return res.status(400).json({
        message: "done field is required",
        success: false,
      });
    }
    const expense = await Form.findByIdAndUpdate(expenseId, { done }, { new: true });
    if(!expense){
      return res.status(404).json({
        message:"expense not found",
        success:false
      })
    }
    return res.status(200).json({
      message:`expense mark as${expense.done?'done':'undone'} `,
      success:true
    })
  }
  catch(error){
    console.log(error);
    
  }
}

export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await Form.find(); // returns an array

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
        success: false
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
      users,       // array of users
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};
