/**
 * Validates a request body, if the request body has the expected attributes
 * **params**
 * expectedRequestBodyAttributes: array of expected request body attributes
 * actualRequestBodyAttributes: actual request body
 * res: response
 */
export function validateReqBody(expectedRequestBodyAttributes: string[], actualRequestBodyAttributes, res) {
	const actualRequestBodyAttributeKeys: string[] = Object.keys(actualRequestBodyAttributes);
	if (expectedRequestBodyAttributes.toString() !== actualRequestBodyAttributeKeys.toString()) {
		return res
			.status(400)
			.send({ message: 'Expected attributes in request body: '+expectedRequestBodyAttributes.join(', ')});
	}
	
	return actualRequestBodyAttributes;
}

/**
 * Validates a request body, if each of the request body attributes are aligned with the extected attributes
 * **params**
 * expectedRequestBodyAttributes: array of expected request body attributes
 * actualRequestBodyAttributes: actual request body
 * res: response
 */
export function validateReqBodyEachAttribute(expectedRequestBodyAttributes: string[], actualRequestBodyAttributes, res) {
	for (const attrName in actualRequestBodyAttributes) {
		if (!expectedRequestBodyAttributes.includes(attrName)) {
			return res
				.status(400)
				.send({ message: 'Expected attributes in request body: '+expectedRequestBodyAttributes.join(' and/or ')});
		}
	}
	
	return actualRequestBodyAttributes;
}

/**
 * Validates a uuid, if no then BadRequestError
 * **params**
 * uuid: given uuid
 * res: response
 */
export function validateUuid(uuid: string, res) {
	// Regular expression to check if string is a valid UUID
	const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
	if (!regexExp.test(uuid)) {
		return res
			.status(400)
			.send({ message: 'UUID is not valid' });
	}
	return uuid;
}