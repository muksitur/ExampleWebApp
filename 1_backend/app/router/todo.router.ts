import express from 'express';
import { createTodo, deleteTodoByName, deleteTodoByUuid, readAllTodo, readTodoByUuid, updateTodoByUuid } from '../service/todo.service';

const router = express.Router();

/**
 * /v1/todo:
 *   post:
 *     operationId: createTodo
 *     tags:
 *     - user
 *     summary: Create todo.
 *     description: Creates a new todo.
 *     requestBody: Attributes 'Name' and 'Description'
 *     responses:
 *       200: Success OK
 *       400: BadRequestError
 *       404: NotFoundError
 *       409: ConflictError
 */
router.post(
	'/',
	createTodo
);

/**
 * /v1/todo:
 *   delete:
 *     operationId: deleteTodoByName
 *     tags:
 *     - user
 *     summary: Delete todo.
 *     description: Deletes a todo.
 *     requestBody: Attribute 'Name'
 *     responses:
 *       200: Success OK
 *       400: BadRequestError
 *       404: NotFoundError
 *       409: ConflictError
 */
router.delete(
	'/',
	deleteTodoByName
);

/**
 * /v1/todo/read-all:
 *   get:
 *     operationId: readAllTodo
 *     tags:
 *     - user
 *     summary: Read all todos.
 *     description: Reads the list of all todos.
 *     responses:
 *       200: Success OK
 *       400: BadRequestError
 *       404: NotFoundError
 *       409: ConflictError
 */
router.get(
	'/read-all',
	readAllTodo
);

/**
 * /v1/todo/{uuidTodo}:
 *   delete:
 *     operationId: deleteTodoByUuid
 *     tags:
 *     - user
 *     summary: Delete todo.
 *     description: Deletes a todo.
 *     parameters: UUID of todo
 *     responses:
 *       200: Success OK
 *       400: BadRequestError
 *       404: NotFoundError
 *       409: ConflictError
 */
router.delete(
	'/:uuidTodo',
	deleteTodoByUuid
);

/**
 * /v1/todo/{uuidTodo}:
 *   get:
 *     operationId: readTodoByUuid
 *     tags:
 *     - user
 *     summary: Read todo.
 *     description: Reads a todo.
 *     parameters: UUID of todo
 *     responses:
 *       200: Success OK
 *       400: BadRequestError
 *       404: NotFoundError
 *       409: ConflictError
 */
router.get(
	'/:uuidTodo',
	readTodoByUuid
);

/**
 * /v1/todo/{uuidTodo}:
 *   get:
 *     operationId: updateTodoByUuid
 *     tags:
 *     - user
 *     summary: Update todo.
 *     description: Updates a todo.
 *     requestBody: Attributes 'Name' and 'Description'
 *     parameters: UUID of todo
 *     responses:
 *       200: Success OK
 *       400: BadRequestError
 *       404: NotFoundError
 *       409: ConflictError
 */
router.put(
	'/:uuidTodo',
	updateTodoByUuid
);

export default router;