import { Stories } from '../model/story.model';
import { checkIfExists } from '../tools/accesscontrol';
import { ATTR_NAME, ATTR_STATUS, ATTR_STORY, ATTR_UUID } from '../tools/constants';
import { validateReqBody, validateUuid } from '../tools/validator';
import asyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';
import { storyWorker } from '../tools/cronjobs';

export const createStory = asyncHandler(async(req, res, next) => {
	// check the request body is valid
	const validReqBodyAttributes: string[] = [ATTR_NAME];
	const obj = validateReqBody(validReqBodyAttributes, req.body, res);
	// add uuid and status as param
    obj[ATTR_STATUS] = "Open";
	obj[ATTR_UUID] = uuidv4();
	const story = await Stories.create(obj);
	res.status(200).send({ message: "Story created successfully", object: story});
    await storyWorker(story, res);
});

export const deleteStoryByName = asyncHandler(async(req, res, next) => {
	// check the request body is valid
	const validReqBodyAttributes: string[] = [ATTR_NAME];
	const obj = validateReqBody(validReqBodyAttributes, req.body, res);
	// check if exists
	const { Name } = obj;
	const objectFound = await checkIfExists(Name, ATTR_NAME, ATTR_STORY, obj, res);
	await Stories.destroy({ where: objectFound });
	res.status(200).send({ message: "Story deleted successfully", object: objectFound});
});

export const readStoryByUuid = asyncHandler(async(req, res, next) => {
	const { uuidStory } = req.params;
	// check the uuid is valid
	const validUuid = validateUuid(uuidStory, res);
	// check if exists
	const objectFound = await checkIfExists(validUuid, ATTR_UUID, ATTR_STORY, { UUID: validUuid }, res);
	const storyObj = await Stories.findOne({ where: objectFound });
	res.status(200).send({ object: storyObj });
});

export const readAllStory = asyncHandler(async(req, res, next) => {
	const allStories = await Stories.findAll();
	res.status(200).send({ data: allStories });
});
