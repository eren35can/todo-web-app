// to test api
// we will use supertest to test HTTP requests/responses
const supertest = require('supertest');
const app = require("../src/index");
const request = supertest(app);

describe('Todo Router Test', ()=>{

    const testTodo = {value:"testTodo"}

    it('gets 404 for non used routes', async () => {
        const response = await request.get("/test");
        expect(response.statusCode).toBe(404);
    });

    it('respond get method', async  ()=>{
        const response = await request.get('/api/todos');
        expect(response.statusCode).toBe(201);
    });

    it('add a todo, update and delete it', async () => {
        jest.setTimeout(30000);
        const postRes = await  request.post('/api/todos').send(testTodo);
        expect(postRes.statusCode).toEqual(201);
        let addedTodoId = postRes.body._id;

        const updateRes = await request.put('/api/todos/'+addedTodoId.toString());
        expect(updateRes.statusCode).toEqual(201);

        const deleteRes = await request.delete('/api/todos/'+addedTodoId.toString());
        expect(deleteRes.statusCode).toEqual(200);
    });

    // it('posted a todo', async  ()=> {
    //     const postRes = await request.post('/api/todos').send(testTodo);
    //     expect(postRes.statusCode).toEqual(201);
    // });
    //
    // it('updated a todo', async  ()=> {
    //     const postRes = await request.put('/api/todos'+testTodo._id);
    //     expect(postRes.statusCode).toEqual(201);
    // });

    it('posted empty body', async  ()=> {
        const postRes = await request.post('/api/todos').send(null);
        expect(postRes.statusCode).toEqual(400);
    });

    it('request delete with invalid todo id', async ()=>{
        const deleteRes = await request.delete('/api/todos/invalidId');
        expect(deleteRes.statusCode).toEqual(400);
    });

    it('request update with invalid todo id', async ()=>{
        const updateRes = await request.put('/api/todos/invalidId');
        expect(updateRes.statusCode).toEqual(400);
    });
});