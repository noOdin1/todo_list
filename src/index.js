/* index.js - todo list project */
import "./style.css";

// console.log("Compilation works, hello world!");

// const userObj = {
//   username: "Maria",
//   email: "maria@mail.com",
// };
//
// localStorage.setItem("user", JSON.stringify(userObj));

// const storedUserData = localStorage.getItem("user");
//
// if (storedUserData) {
//   const userData = JSON.parse(storedUserData);
//   console.log(userData);
//   // You can use userData here...
// } else {
//   console.log("User data not found in local storage");
// }

const todoApp = (function () {
  const newProject = () => {
    // console.log("[newProject] Create new Project");
  };
  const newTask = () => {
    console.log("[newTask] Creating new task");
  };
  const displayTask = () => {
    console.log("[displayTask] Displaying  all task");
  };
  const updateTask = () => {
    console.log("[updateTask] Updating a task");
  };
  const deleteTask = () => {
    console.log("[deleteTask] Deleting a task");
  };

  const choiceErrorMsg = () => {
    console.log("[Error] Invalid choice");
  };

  const menuOpt = {
    1: newProject,
    2: newTask,
    3: displayTask,
    4: displayProjects,
    5: updateTask,
    6: deleteTask,
    7: () => {
      console.log("Exiting...");
    },
  };

  function getUserInput() {
    let userChoice = prompt(`
      1. Create new project
      2. Create new task
      3. Display all task
      4. Show all projects
      5. Update a task
      6. Delete a task
      7. Exit
      Enter your choice: 
    `);
    return userChoice;
  }

  function startApp() {
    console.log("Start of application");
    let choice = 1;
    while (choice != 7) {
      choice = getUserInput();
      console.log("[] User choice: " + choice);
      choice >= 1 && choice <= 7 ? menuOpt[choice]() : choiceErrorMsg();
    }
  }

})();
