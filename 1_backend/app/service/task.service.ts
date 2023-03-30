import { Tasks } from '../model/task.model';
import { checkIfExists } from '../tools/accesscontrol';
import { ATTR_ESTIMATE, ATTR_NAME, ATTR_STATUS, ATTR_STORY, ATTR_STORY_UUID, ATTR_TASK, ATTR_UUID } from '../tools/constants';
import { validateReqBody, validateUuid } from '../tools/validator';
import asyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';
import { taskWorker } from '../tools/cronjobs';

export const createTask = asyncHandler(async(req, res, next) => {
	// check the request body is valid
	const validReqBodyAttributes: string[] = [ATTR_NAME, ATTR_ESTIMATE, ATTR_STORY_UUID];
	const obj = validateReqBody(validReqBodyAttributes, req.body, res);
	const { StoryUUID } = obj;
	// check the uuid is valid
	const validStoryUuid = validateUuid(StoryUUID, res);
	// check if the story exists
	await checkIfExists(validStoryUuid, ATTR_UUID, ATTR_STORY, obj, res);
	// add uuid and status as param
	obj[ATTR_STATUS] = "Open";
	obj[ATTR_UUID] = uuidv4();
	const task = await Tasks.create(obj);
	res.status(200).send({ message: "Task added successfully to story uuid: "+validStoryUuid, object: task});
	await taskWorker(task);
});

export const deleteTaskByName = asyncHandler(async(req, res, next) => {
	// check the request body is valid
	const validReqBodyAttributes: string[] = [ATTR_NAME];
	const obj = validateReqBody(validReqBodyAttributes, req.body, res);
	// check if exists
	const { Name } = obj;
	const objectFound = await checkIfExists(Name, ATTR_NAME, ATTR_TASK, obj, res);
	await Tasks.destroy({ where: objectFound });
	res.status(200).send({ message: "Task deleted successfully", object: objectFound});
});

export const readTaskByUuid = asyncHandler(async(req, res, next) => {
	const { uuidTask } = req.params;
	// check the uuid is valid
	const validUuid = validateUuid(uuidTask, res);
	// check if exists
	const objectFound = await checkIfExists(validUuid, ATTR_UUID, ATTR_TASK, { UUID: validUuid }, res);
	const taskObj = await Tasks.findOne({ where: objectFound });
	res.status(200).send({ object: taskObj });
});

export const readAllTask = asyncHandler(async(req, res, next) => {
	const allTasks = await Tasks.findAll();
	res.status(200).send({ data: allTasks });
});
