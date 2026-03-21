const request = require('supertest');
const app = require('../index');

describe("test ", () => {
test("should return a 200 status code from the home page", async () => {
const response = await request(app).get('/')

console.log(response.status);
console.log(response.statusCode);
console.log(response.text);
//console.log(response.body);
expect(response.statusCode).toBe(200);
});
});  