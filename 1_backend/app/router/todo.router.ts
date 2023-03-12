import express from 'express';
import { createTodo, deleteTodoByName, deleteTodoByUuid, readAllTodo, readTodoByUuid, updateTodoByUuid } from '../service/todo.service';

const router = express.Router();

/**
 * @swagger
 * /example/v1/todo:
 *   post:
 *     operationId: createTodo
 *     tags:
 *     - todo
 *     summary: Create todo.
 *     description: Creates a new todo.
 *     requestBody: 
 *       $ref: '#/components/requestBodies/TodoCreateRequest'
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
	createTodo
);

/**
 * /example/v1/todo:
 *   delete:
 *     operationId: deleteTodoByName
 *     tags:
 *     - todo
 *     summary: Delete todo.
 *     description: Deletes a todo.
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
	deleteTodoByName
);

/**
 * @swagger
 * /example/v1/todo/read-all:
 *   get:
 *     operationId: readAllTodo
 *     tags:
 *     - todo
 *     summary: Read all todos.
 *     description: Reads the list of all todos.
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
	readAllTodo
);

/**
 * @swagger
 * /example/v1/todo/{uuidTodo}:
 *   delete:
 *     operationId: deleteTodoByUuid
 *     tags:
 *     - todo
 *     summary: Delete todo.
 *     description: Deletes a todo.
 *     parameters:
 *     - $ref: '#/components/parameters/uuidTodo'
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
	'/:uuidTodo',
	deleteTodoByUuid
);

/**
 * @swagger
 * /example/v1/todo/{uuidTodo}:
 *   get:
 *     operationId: readTodoByUuid
 *     tags:
 *     - todo
 *     summary: Read todo.
 *     description: Reads a todo.
 *     parameters: 
 *     - $ref: '#/components/parameters/uuidTodo'
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
	'/:uuidTodo',
	readTodoByUuid
);

/**
 * @swagger
 * /example/v1/todo/{uuidTodo}:
 *   put:
 *     operationId: updateTodoByUuid
 *     tags:
 *     - todo
 *     summary: Update todo.
 *     description: Updates a todo.
 *     requestBody: 
 *       $ref: '#/components/requestBodies/TodoUpdateRequest'
 *     parameters: 
 *     - $ref: '#/components/parameters/uuidTodo'
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
router.put(
	'/:uuidTodo',
	updateTodoByUuid
);

export default router;