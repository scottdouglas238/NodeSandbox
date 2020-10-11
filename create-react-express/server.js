const express = require("express");
const mongoose = require("mongoose");
const app = express()
const PORT = process.env.PORT || 8080
//middleware needed in order to post todos
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const db = require("./models")

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/nodesandbox-example"
);
//move this into the route directory
//find all todos
app.get("/api/todos", async function(req, res){
    const dbTodos = await db.Todo.find();
    res.json(dbTodos);
})
//find one todo by its id
app.get("/api/todos/:id", async function(req, res){
    const dbTodo = await db.Todo.findById(req.params.id);
    res.json(dbTodo);
})

app.post("/api/todos", async function(req, res){
    const dbTodo = await db.Todo.create(req.body);
    res.json(dbTodo)
})

app.delete("/api/todos/:id", async function(req, res){
    const dbTodo = await db.Todo.findByIdAndDelete(req.params.id);
    res.json(dbTodo)
})

app.get("*", function(req, res){
    res.send("Hello World! Get ready for a suprise!!")
})
//move this into the route directory

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
