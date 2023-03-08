import request from 'supertest';
import { expect } from 'chai';
import nock from 'nock';

const todoBaseUrl = 'http://localhost:4800/example/v1/todo';
const createPayload = { Name: "EatTest", Description: "EatTest" };
const deletePayload = { Name: "EatTest" };
const updatePayload = { Name: "mockWalk", Description: "mockWalk" };
const unknownUUID = '02c2b2c5-7f43-41b7-84b6-b98c78bc5324';
const mockUUID = '7724b120-ef8b-49e6-9c39-e5a1dd2c0153';
const mockTodo = { id: 1, UUID: "7724b120-ef8b-49e6-9c39-e5a1dd2c0153", Name: "mockWalk", Description: "We will mockWalk" };

describe('Todo Checks', function () {
	it('Creates a todo', function (done) {
		// create a todo successfully
		request(todoBaseUrl).post('/').send(createPayload).expect(200, done).expect((response) => {
			expect(response.body.message).to.deep.equal('Todo created successfully');
		});
	});

	it('Deletes a todo by name', function (done) {
		// delete a todo successfully
		request(todoBaseUrl).delete('/').send(deletePayload).expect(200, done).expect((response) => {
			expect(response.body.message).to.deep.equal('Todo deleted successfully');
		});
	});

	it('Reads all todos', function (done) {
		// reads all todos successfully
		request(todoBaseUrl).get('/read-all').expect(200, done).expect((response) => {
			expect(response.body.data).to.be.an('array');
		});
	});

	it('Fails to read unknown todo', function (done) {
		// todo not found
		request(todoBaseUrl).get('/' + unknownUUID).expect(404, done);
	});

	it('Fails to delete unknown todo', function (done) {
		// todo not found
		request(todoBaseUrl).delete('/' + unknownUUID).expect(404, done);
	});

	it('Fails to update unknown todo', function (done) {
		// todo not found
		request(todoBaseUrl).put('/' + unknownUUID).expect(404, done);
	});

	it('Updates a todo', function (done) {
		nock.cleanAll();
		nock(todoBaseUrl).persist().put('/' + mockUUID, updatePayload).reply(200, { message: "Todo updated successfully", object: mockTodo });
		done();
	});

});