// todoModel test

require('dotenv').config();
const mongoose = require('mongoose');
const TodoModel = require('../src/models/todoModel');
const TodoData = {value: 'testTodo', completed: false };

describe('Todo Model Test', () => {

    let connection;
    const testUri = process.env.TEST_DB_URI;
    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
        connection = await mongoose.connect(testUri, { useNewUrlParser: true,
            useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await connection.close();
        // await db.close();

    });

    // Could not manage drop the database
    afterEach(async () => {
        await TodoModel.deleteMany()
    })

    it('create & save todo successfully', async () => {
        const validTodo = new TodoModel(TodoData);
        const savedUser = await validTodo.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.value).toBe(TodoData.value);
        expect(savedUser.completed).toBe(TodoData.completed);

    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert todo successfully, but the field does not defined in schema should be undefined', async () => {
        const todoWithInvalidField = new TodoModel({value: 'testTodo2', completed: false, extra: 'extra' });
        const savedTodoWithInvalidField = await todoWithInvalidField.save();
        expect(savedTodoWithInvalidField._id).toBeDefined();
        expect(savedTodoWithInvalidField.extra).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on value field.
    it('create todo without required field should failed', async () => {
        const todoWithoutRequiredField = new TodoModel({ completed: false });
        let err;
        let error;
        try {
            error = await todoWithoutRequiredField.save();
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.value).toBeDefined();
    });


})