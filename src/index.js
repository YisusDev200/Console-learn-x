import inquirer from "inquirer";
import { connectDB } from "./config/db.js";
import { Student } from "./models/student.model.js";
import {
  questionsCreate,
  questionsReadById,
  main,
  backtoMenu,
} from "./utils/questions.js";
await connectDB();

const createStudent = async () => {
  try {
    const answers = await inquirer.prompt(questionsCreate);
    const student = new Student(answers);
    await student.save();
    console.log(`\n------> Student Saved <------
    Name: ${student.firstName} ${student.lastName}
    Age: ${student.age}
    ID: ${student._id}
----------------------------\n`);
    await backMenu();
  } catch (error) {
    console.error("Error:", error);
  }
};

const readAllStudents = async () => {
  try {
    const students = await Student.find();
    if (students.length !== 0) {
      console.log("\n------> All Students <------");
      students.forEach((student, index) => {
        console.log(`Student #${index + 1}`);
        console.log(`Name: ${student.firstName} ${student.lastName}`);
        console.log(`Age: ${student.age}`);
        console.log(`ID: ${student._id}`);
        console.log("------------------------");
      });
    } else {
      console.log("------> No Students Found in the Database <------");
    }
    await backMenu();
  } catch (error) {
    console.error("Error:", error);
  }
};

const readStudentById = async () => {
  try {
    const answers = await inquirer.prompt(questionsReadById);
    const student = await Student.findById(answers.id_student);
    if (student) {
      console.log("\n------> Student Found <------");
      console.log(`Name: ${student.firstName} ${student.lastName}`);
      console.log(`Age: ${student.age}`);
      console.log(`ID: ${student._id}`);
      console.log("------------------------\n");
    } else {
      console.log("------> No Student Found with the specified ID <------");
    }
    await backMenu();
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateStudentById = async () => {
  try {
    const answers = await inquirer.prompt(questionsReadById);
    const student = await Student.findById(answers.id_student);

    if (!student) {
      console.log("------> No Student Found with the specified ID <------");
      return await backMenu();
    }

    const updateAnswers = await inquirer.prompt(questionsCreate);
    Object.assign(student, updateAnswers);
    await student.save();

    console.log("------> Student Updated <------");
    console.log(`Name: ${student.firstName} ${student.lastName}`);
    console.log(`Age: ${student.age}`);
    console.log(`ID: ${student._id}`);
    console.log("----------------------------\n");

    await backMenu();
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteStudentById = async () => {
  try {
    const answers = await inquirer.prompt(questionsReadById);
    const student = await Student.findByIdAndDelete(answers.id_student);

    if (!student) {
      console.log("------> No Student Found with the specified ID <------");
      return await backMenu();
    }

    console.log("------> Student Deleted <------");
    console.log(`Name: ${student.firstName} ${student.lastName}`);
    console.log(`Age: ${student.age}`);
    console.log(`ID: ${student._id}`);
    console.log("----------------------------\n");

    await backMenu();
  } catch (error) {
    console.error("Error:", error);
  }
};

const backMenu = async () => {
  const { backToMenu } = await inquirer.prompt(backtoMenu);
  if (!backToMenu) {
    console.log("Exiting the program.");
    console.log("Goodbye!");
    process.exit();
  } else {
    console.clear();
  }
};
const mainMenu = async () => {
  console.log("------> Welcome to the Student Management System <------");
  while (true) {
    const { choice } = await inquirer.prompt(main);
    switch (choice) {
      case "Create Student":
        await createStudent();
        break;
      case "Read All Students":
        await readAllStudents();
        break;
      case "Read One Student":
        await readStudentById();
        break;
      case "Update Student":
        await updateStudentById();
        break;
      case "Delete Student":
        await deleteStudentById();
        break;
      case "Exit":
        console.log("Exiting the program.");
        console.log("Goodbye!");
        process.exit();
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
};

mainMenu();
