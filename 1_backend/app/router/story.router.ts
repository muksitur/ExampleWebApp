import { createStory, deleteStoryByName, deleteStoryByUuid, readAllStory, readStoryByUuid } from '../service/story.service';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /example/v1/story:
 *   post:
 *     operationId: createStory
 *     tags:
 *     - story
 *     summary: Create story.
 *     description: Creates a new story.
 *     requestBody:
 *       $ref: '#/components/requestBodies/StoryCreateRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EmptyResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.post(
	'/',
	createStory
);

/**
 * /example/v1/story:
 *   delete:
 *     operationId: deleteStoryByName
 *     tags:
 *     - story
 *     summary: Delete story.
 *     description: Deletes a story.
 *     requestBody: Attribute 'Name'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EmptyResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.delete(
	'/',
	deleteStoryByName
);

/**
 * @swagger
 * /example/v1/story/read-all:
 *   get:
 *     operationId: readAllStory
 *     tags:
 *     - story
 *     summary: Read all stories.
 *     description: Reads the list of all stories.
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EmptyResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.get(
	'/read-all',
	readAllStory
);

/**
 * @swagger
 * /example/v1/story/{uuidStory}:
 *   delete:
 *     operationId: deleteStoryByUuid
 *     tags:
 *     - story
 *     summary: Delete story.
 *     description: Deletes a story.
 *     parameters:
 *     - $ref: '#/components/parameters/uuidStory'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EmptyResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.delete(
	'/:uuidStory',
	deleteStoryByUuid
);

/**
 * @swagger
 * /example/v1/story/{uuidStory}:
 *   get:
 *     operationId: readStoryByUuid
 *     tags:
 *     - story
 *     summary: Read story.
 *     description: Reads a story.
 *     parameters: 
 *     - $ref: '#/components/parameters/uuidStory'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/EmptyResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 */
router.get(
	'/:uuidStory',
	readStoryByUuid
);

export default router;