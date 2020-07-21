const mongoose = require('mongoose');

// Setup schema
const todoSchema = mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false
    },
});

// Export Contact model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;