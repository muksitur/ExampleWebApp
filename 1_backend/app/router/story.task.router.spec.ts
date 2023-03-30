import request from 'supertest';
import { expect } from 'chai';
import { ATTR_STORY_UUID } from '../tools/constants';

const taskBaseUrl = 'http://localhost:4800/example/v1/task';
const storyBaseUrl = 'http://localhost:4800/example/v1/story';
const storyPayload = { Name: "EatTestStory" };
const taskCreatePayload = { Name: "EatTestTask", Estimate: 5 };
const taskDeletePayload = { Name: "EatTestTask" };
const unknownStoryUUID = '02c2b2c5-7f43-41b7-84b6-b98c78bc5324';

describe('Story and Task Checks', function () {
	let storyUUID: any;
	it('Creates a story', function (done) {
		// create a story successfully
		request(storyBaseUrl).post('/').send(storyPayload).expect(200, done).expect((response) => {
			expect(response.body.message).to.deep.equal('Story created successfully');
			storyUUID = response.body.object.UUID;
		});
	});

	it('Fails to add a task to unknown story', function (done) {
		taskCreatePayload[ATTR_STORY_UUID] = unknownStoryUUID;
		// story not found
		request(taskBaseUrl).post('/').send(taskCreatePayload).expect(404, done);
	});

	it('Adds a task to the existing story', function (done) {
		taskCreatePayload[ATTR_STORY_UUID] = storyUUID;
		// add a task to the story successfully
		request(taskBaseUrl).post('/').send(taskCreatePayload).expect(200, done).expect((response) => {
			expect(response.body.message).to.be.a('string');
		});
	});

	it('Reads all tasks', function (done) {
		// reads all tasks successfully
		request(taskBaseUrl).get('/read-all').expect(200, done).expect((response) => {
			expect(response.body.data).to.be.an('array');
		});
	});

	it('Reads all stories', function (done) {
		// reads all stories successfully
		request(storyBaseUrl).get('/read-all').expect(200, done).expect((response) => {
			expect(response.body.data).to.be.an('array');
		});
	});

	it('Removes the task', function (done) {
		// delete the task successfully
		request(taskBaseUrl).delete('/').send(taskDeletePayload).expect(200, done).expect((response) => {
			expect(response.body.message).to.deep.equal('Task deleted successfully');
		});
	});

	it('Deletes the story by name', function (done) {
		// delete the story successfully
		request(storyBaseUrl).delete('/').send(storyPayload).expect(200, done).expect((response) => {
			expect(response.body.message).to.deep.equal('Story deleted successfully');
		});
	});

});