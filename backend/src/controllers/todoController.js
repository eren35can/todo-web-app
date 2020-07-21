// Import to_do model
Todo = require('../models/todoModel');
// Handle index actions
exports.list = async (req, res) => {

    try{
        const todos = await Todo.find();
        res.status(201).send(todos)
    } catch(err) {
        res.status(400).json({message: err})
    }
};

// Handle create contact actions
exports.new = async (req, res) => {

    if (!req.body) return res.status(400).json({message: 'Request body is missing'});

    let todo = new Todo({value: req.body.value, completed: req.body.completed ? req.body.completed : false});

    try {
        const savedTodo = await todo.save();
        res.status(201).send(savedTodo);
    } catch (err) {
        res.status(400).json({message: err});
    }
};


// Handle check todoModel
exports.update = async (req, res) => {

    try {
        if(req.params.todo_id.match(/^[0-9a-fA-F]{24}$/)){
            await Todo.findOne({_id: req.params.todo_id}, (err, todo) => {

                if (err)
                    throw err;
                //res.status(400).json({message: 'Todo not found'});

                if(todo){
                    todo.completed = !todo.completed;

                    todo.save((err,_todo)=>{
                        if (err)
                            return res.status(500).json({message: err});
                        res.status(201).send(_todo);
                    });
                }
            });
        }
        else{
            res.status(400).json({message: error});
        }

    } catch (error) {
        res.status(400).json({message: error});
    }
};


// Handle delete contact
exports.delete = async (req, res) => {

    try {
        const removedTodo = await Todo.findOneAndRemove({_id: req.params.todo_id})
        res.status(200).send(removedTodo);
    } catch (err) {
        res.status(400).json({message: err});
    }
};