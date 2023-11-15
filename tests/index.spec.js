import app from '../src/app.js'
import request from 'supertest'

describe('GET /tasks', () => {

    test('shoul respode with a 200 status code', async () => {
        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200);
    });

    test('shoul respond with an array', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.body).toBeInstanceOf(Array)
    })
});

describe('POST /tasks', () => {
    describe("given a title and description", () => {

        const newTaks ={
            title: "Test Taks",
            description: 'Test Description',
        }

        // should response with a 200 status code
        test('shoult respond with a 200 status code', async () => {
            const response = await request(app).post('/tasks').send(newTaks)
            expect(response.statusCode).toBe(200)
        });

        // should respond with a contesnt-type of application/json
        test('should have a content-type aplication/json is header', async () => {
            const response = await request(app).post('/tasks').send(newTaks)
            expect(response.headers["content-type"]).toEqual(
                expect.stringContaining("json"));
        });
        // should respond with a json abject tentatining the new task with an id
        test('should respond with an task ID', async () => {
            const response = await request(app).post('/tasks').send(newTaks)
            expect(response.body.id).toBeDefined();
        });
    });

    describe('when title and description is missing', () =>
    {
        test('shoul respond with a 400 status code', async () => {
            const fields = [{},
                {title: 'Test Taks'},
                {description: 'Test Description'},
            ]
            
            for(const body of fields) {
                const response = await  request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        })
    });
});