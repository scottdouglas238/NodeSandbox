const db = require("./../models")

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