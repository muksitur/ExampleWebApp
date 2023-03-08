import asyncHandler from 'express-async-handler';
import { validateReqBody, validateReqBodyEachAttribute, validateUuid } from '../tools/validator';
import { Todos } from '../model/todo.model';
import { v4 as uuidv4 } from 'uuid';
import { checkIfExists, checkIfSameKeyValue } from '../tools/accesscontrol';
import { ATTR_DESCRIPTION, ATTR_NAME, ATTR_TODO, ATTR_UUID } from '../tools/constants';

export const createTodo = asyncHandler(async(req, res, next) => {
	// check the request body is valid
	const validReqBodyAttributes: string[] = [ATTR_NAME, ATTR_DESCRIPTION];
	const obj = validateReqBody(validReqBodyAttributes, req.body, res);
	// check if multiple objects share the same name
	const { Name } = obj;
	const uniqueNameObj = await checkIfSameKeyValue(Name, ATTR_NAME, ATTR_TODO, obj, res);
	// add uuid as param
	uniqueNameObj[ATTR_UUID] = uuidv4();
	const todo = await Todos.create(uniqueNameObj);
	res.status(200).send({ message: "Todo created successfully", object: todo});
});

export const deleteTodoByName = asyncHandler(async(req, res, next) => {
	// check the request body is valid
	const validReqBodyAttributes: string[] = [ATTR_NAME];
	const obj = validateReqBody(validReqBodyAttributes, req.body, res);
	// check if exists
	const { Name } = obj;
	const objectFound = await checkIfExists(Name, ATTR_NAME, ATTR_TODO, obj, res);
	await Todos.destroy({ where: objectFound });
	res.status(200).send({ message: "Todo deleted successfully", object: objectFound});
});

export const deleteTodoByUuid = asyncHandler(async(req, res, next) => {
	const { uuidTodo } = req.params;
	// check the uuid is valid
	const validUuid = validateUuid(uuidTodo, res);
	// check if exists
	const objectFound = await checkIfExists(validUuid, ATTR_UUID, ATTR_TODO, { UUID: validUuid }, res);
	await Todos.destroy({ where: objectFound });
	res.status(200).send({ message: "Todo deleted successfully", object: objectFound});
});

export const readTodoByUuid = asyncHandler(async(req, res, next) => {
	const { uuidTodo } = req.params;
	// check the uuid is valid
	const validUuid = validateUuid(uuidTodo, res);
	// check if exists
	const objectFound = await checkIfExists(validUuid, ATTR_UUID, ATTR_TODO, { UUID: validUuid }, res);
	const todoObj = await Todos.findOne({ where: objectFound });
	res.status(200).send({ object: todoObj });
});

export const readAllTodo = asyncHandler(async(req, res, next) => {
	const allTodos = await Todos.findAll();
	res.status(200).send({ data: allTodos });
});

export const updateTodoByUuid = asyncHandler(async(req, res, next) => {
	// check the request body is valid
	const validReqBodyAttributes: string[] = [ATTR_NAME, ATTR_DESCRIPTION];
	const obj = validateReqBodyEachAttribute(validReqBodyAttributes, req.body, res);
	const { uuidTodo } = req.params;
	// check the uuid is valid
	const validUuid = validateUuid(uuidTodo, res);
	// check if exists
	await checkIfExists(validUuid, ATTR_UUID, ATTR_TODO, obj, res);
	const objectToUpdate = await Todos.findOne({ where: { UUID: validUuid } });
	await objectToUpdate?.update(obj);
	await objectToUpdate?.save();
	// await Todos.update(obj, { where: objectFound });
	const updatedTodoObj = await Todos.findOne({ where: { UUID: validUuid } });
	res.status(200).send({ message: "Todo updated successfully", object: updatedTodoObj});
});