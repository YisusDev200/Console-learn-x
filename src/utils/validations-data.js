import mongoose from "mongoose";

export const validateName = (value) => {
  if (!value.trim()) {
    return "Please enter a valid first name.";
  }
  return true;
};
export const validateAge = (value) => {
  const age = Number(value);
  if (isNaN(age) || age <= 6 || age >= 13) {
    return "Please enter a valid age between 7 and 13.";
  }
  return true;
};

export const validateMongoId = (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return "Please enter a valid mongo id.";
  }
  return true;
};
