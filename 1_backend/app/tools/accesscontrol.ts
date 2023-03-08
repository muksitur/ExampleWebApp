import { Todos } from '../model/todo.model';

/**
 * Checks if an object with the same value of the same key already exists, if yes then ConflictError
 * **params**
 * value: value of the key
 * key: key to be checked
 * objectName: Name of the object table to check
 * actualObject: value of the actual object to cross match in the object table
 * res: response
 */
export async function checkIfSameKeyValue(value: string | number, key: string, objectName: string, actualObject, res) {
	if (objectName === 'Todo') {
		const objArray = await Todos.findAll({
			where: {
				[key]: value
			}
		});
		if (objArray.length > 0) {
			return res
				.status(409)
				.send({ message: 'Object already exists' });
		}
	}
	return actualObject;
}
/**
 * Checks if an object with the provided value exists, if no then NotFoundError
 * **params**
 * value: value of the key
 * key: key to be checked
 * objectName: Name of the object table to check
 * actualObject: value of the actual object to cross match in the object table
 * res: response
 */
export async function checkIfExists(value: string | number, key: string, objectName: string, actualObject, res) {
	if (objectName === 'Todo') {
		const objArray = await Todos.findAll({
			where: {
				[key]: value
			}
		});
		if (!objArray.length) {
			return res
				.status(404)
				.send({ message: 'Object not found' });
		}
	}
	return actualObject;
}