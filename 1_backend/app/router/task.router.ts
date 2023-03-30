import { createTask, deleteTaskByName, readAllTask } from '../service/task.service';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /example/v1/task:
 *   post:
 *     operationId: createTask
 *     tags:
 *     - task
 *     summary: Create task.
 *     description: Creates a new task.
 *     requestBody:
 *       $ref: '#/components/requestBodies/TaskCreateRequest'
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
	createTask
);

/**
 * /example/v1/task:
 *   delete:
 *     operationId: deleteTaskByName
 *     tags:
 *     - task
 *     summary: Delete task.
 *     description: Deletes a task.
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
	deleteTaskByName
);

/**
 * @swagger
 * /example/v1/task/read-all:
 *   get:
 *     operationId: readAllTask
 *     tags:
 *     - task
 *     summary: Read all Tasks.
 *     description: Reads the list of all tasks.
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
	readAllTask
);

export default router;