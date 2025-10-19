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

})();
