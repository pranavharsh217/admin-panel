import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  mobileno: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  caste: {
    type: String,
    required: true
  },
  language: {
    type: [String],
    required: true
  }

}, { timestamps: true })
export const Form = mongoose.model("Form", formSchema)