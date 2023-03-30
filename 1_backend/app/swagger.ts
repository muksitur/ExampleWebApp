import swaggerJsdoc, { OAS3Definition } from 'swagger-jsdoc';

export const swaggerDefinition: OAS3Definition = {
	openapi: '3.0.2',
	info: {
		version: '1.0.0',
		title: 'Example - OpenAPI description',
		description: 'OpenAPI descriptions for all public routes of the Example service.'
	},
	servers: [
		{
			url: 'http://localhost:4800',
			description: 'Local Example Server'
		}
	],
	tags: [
		{
			name: 'todo',
			description: 'Todo related routes.'
		}
	],
	security: [
		{
			basicAuth: []
		},
		{
			bearerAuth: []
		}
	],
	components: {
		securitySchemes: {
			basicAuth: {
				type: 'http',
				scheme: 'basic',
				description: 'Service-to-Service authentication'
			},
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				description: 'User authentication'
			}
		},
		schemas: {
			Todo: {
				type: 'object',
				properties: {
					UUID: {
						type: 'string',
						format: 'uuid',
						description: 'UUID of the todo.'
					},
					id: {
						type: 'integer',
						description: 'Auto generated serial number'
					},
					Name: {
						type: 'string',
						description: 'Name of the todo.'
					},
					Description: {
						type: 'string',
						description: 'Description of the todo.'
					}
				}
			},
			Story: {
				type: 'object',
				properties: {
					UUID: {
						type: 'string',
						format: 'uuid',
						description: 'UUID of the story.'
					},
					id: {
						type: 'integer',
						description: 'Auto generated serial number'
					},
					Name: {
						type: 'string',
						description: 'Name of the story.'
					},
					Status: {
						type: 'string',
						description: 'State of the task: \'Open\' or \'Close\'.'
					}
				}
			},
			Task: {
				type: 'object',
				properties: {
					UUID: {
						type: 'string',
						format: 'uuid',
						description: 'UUID of the task.'
					},
					id: {
						type: 'integer',
						description: 'Auto generated serial number'
					},
					storyUUID: {
						type: 'string',
						format: 'uuid',
						description: 'UUID of the story.'
					},
					Name: {
						type: 'string',
						description: 'Name of the task.'
					},
					Estimate: {
						type: 'integer',
						description: 'Number of seconds estimated to complete the task'
					},
					Status: {
						type: 'string',
						description: 'State of the task: \'Open\' or \'Close\'.'
					}
				}
			},
		},
		parameters: {
			uuidTodo: {
				name: 'uuidTodo',
				in: 'path',
				description: 'UUID of the todo.',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid'
				}
			},
			uuidTask: {
				name: 'uuidTask',
				in: 'path',
				description: 'UUID of the task.',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid'
				}
			},
			uuidStory: {
				name: 'uuidStory',
				in: 'path',
				description: 'UUID of the story.',
				required: true,
				schema: {
					type: 'string',
					format: 'uuid'
				}
			}
		},
		requestBodies: {
			TodoCreateRequest: {
				required: true,
				content: {
					'application/json': {
						schema: {
							properties: {
								Name: {
									type: 'string',
									description: 'Name of the todo.'
								},
								Description: {
									type: 'string',
									description: 'Description of the todo.'
								}
							}
						}
					}
				}
			},
			StoryCreateRequest: {
				required: true,
				content: {
					'application/json': {
						schema: {
							properties: {
								Name: {
									type: 'string',
									description: 'Name of the story.'
								}
							}
						}
					}
				}
			},
			TaskCreateRequest: {
				required: true,
				content: {
					'application/json': {
						schema: {
							properties: {
								storyUUID: {
									type: 'string',
									format: 'uuid',
									description: 'UUID of the story.'
								},
								Name: {
									type: 'string',
									description: 'Name of the task.'
								},
								Estimate: {
									type: 'integer',
									description: 'Number of seconds estimated to complete the task'
								},
								Status: {
									type: 'string',
									description: 'State of the task: \'Open\' or \'Close\'.'
								}
							}
						}
					}
				}
			},
			TodoUpdateRequest: {
				required: true,
				content: {
					'application/json': {
						schema: {
							properties: {
								Name: {
									type: 'string',
									description: 'Name of the todo.'
								},
								Description: {
									type: 'string',
									description: 'Description of the todo.'
								}
							}
						}
					}
				}
			},
		},
		responses: {
			EmptyResponse: {
				description: 'Successful operation.',
				content: {
					'application/json': {}
				}
			},
			BadRequestError: {
				description: 'BadRequestError - The request does not have the expected format.',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								class: {
									enum: ['BadRequestError'],
									type: 'string'
								},
								message: {
									type: 'string'
								},
								name: {
									enum: ['BadRequestError'],
									type: 'string'
								},
								status: {
									enum: [400],
									type: 'integer'
								},
								timestamp: {
									type: 'string',
									format: 'date-time'
								},
								expected: {
									description: 'The expected value.',
									example: 'UUID'
								},
								actual: {
									description: 'The actual value.',
									example: 'Integer'
								}
							}
						}
					}
				}
			},
			NotFoundError: {
				description: 'NotFoundError - The requested resource was not found.',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								class: {
									enum: ['NotFoundError'],
									type: 'string'
								},
								message: {
									type: 'string'
								},
								name: {
									enum: ['NotFoundError'],
									type: 'string'
								},
								status: {
									enum: [404],
									type: 'integer'
								},
								timestamp: {
									type: 'string',
									format: 'date-time'
								},
								objectType: {
									type: 'string',
									description: 'The type of the object that was not found.'
								}
							}
						}
					}
				}
			},
			ConflictError: {
				description: 'ConflictError - The operation would have resulted in an invalid state.',
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								class: {
									enum: ['ConflictError'],
									type: 'string'
								},
								message: {
									type: 'string'
								},
								name: {
									enum: ['ConflictError'],
									type: 'string'
								},
								status: {
									enum: [409],
									type: 'integer'
								},
								timestamp: {
									type: 'string',
									format: 'date-time'
								}
							}
						}
					}
				}
			}
		}
	}
}

const swaggerOptions = {
	swaggerDefinition,
	// Collect all the routes to describe (*.js for deployment using /build folder.):
	apis: [ __dirname + '/router/*.router.ts', __dirname + '/router/*.router.js' ]
};

export const swaggerDocument = swaggerJsdoc(swaggerOptions);
