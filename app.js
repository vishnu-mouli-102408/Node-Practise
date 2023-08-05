// Without FileSystem

// const express = require("express");

// const bodyParser = require("body-parser");

// const app = express();

// app.use(bodyParser.json());

// let todos = [];

// const findIndex = (arr, id) => {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].id === id) {
//       return i;
//     }
//   }
//   return -1;
// };

// const removeItem = (arr, index) => {
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (i !== index) {
//       newArr.push(arr[i]);
//     }
//   }
//   return newArr;
// };

// app.get("/", (req, res) => {
//   res.json(todos);
// });

// app.post("/todos", (req, res) => {
//   const newTodo = {
//     id: Math.floor(Math.random() * 100000),
//     title: req.body.title,
//     description: req.body.description,
//   };
//   todos.push(newTodo);
//   res.status(201).json(newTodo);
// });

// app.delete("/todos/:id", (req, res) => {
//   const todoItem = findIndex(todos, parseInt(req.params.id));
//   //   console.log(todoItem);
//   if (todoItem === -1) {
//     res.status(401).send();
//   } else {
//     todos = removeItem(todos, todoItem);
//     res.status(200).send();
//   }
// });

// app.listen(3000, (req, res) => {
//   console.log("App running on port 3000");
// });

//  With File System

const express = require("express");

const bodyParser = require("body-parser");

const fs = require("fs");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const findIndex = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }
  return -1;
};

const removeItem = (arr, index) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

app.get("/", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 100000),
    title: req.body.title,
    description: req.body.description,
  };
  fs.readFile("todos.json", "utf8", (err, data) => {
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(todos);
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const todoItem = findIndex(todos, parseInt(req.params.id));
    //    console.log(todoItem);
    if (todoItem === -1) {
      res.status(401).send();
    } else {
      todos = removeItem(todos, todoItem);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(201).send();
      });
    }
  });
});

app.listen(3000, (req, res) => {
  console.log("App running on port 3000");
});
