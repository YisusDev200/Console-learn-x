import {
  validateAge,
  validateName,
  validateMongoId,
} from "./validations-data.js";

export const questionsCreate = [
  {
    type: "input",
    name: "firstName",
    message: "What is your first name?",
    validate: validateName,
  },
  {
    type: "input",
    name: "lastName",
    message: "What is your last name?",
    validate: validateName,
  },
  {
    type: "input",
    name: "age",
    message: "How old are you?",
    validate: validateAge,
  },
];

export const questionsReadById = [
  {
    type: "input",
    name: "id_student",
    message: "What is the student's id?",
    validate: validateMongoId,
  },
];

export const main = [
  {
    type: "list",
    name: "choice",
    message: "Select an operation:",
    choices: [
      "Create Student",
      "Read All Students",
      "Read One Student",
      "Update Student",
      "Delete Student",
      "Exit",
    ],
  },
];

export const backtoMenu = [
  {
    type: "confirm",
    name: "backToMenu",
    message: "Do you want to go back to the main menu?",
    default: true,
  },
];
