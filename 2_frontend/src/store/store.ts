import Vue from "vue";
import Vuex from "vuex";
import { baseUrl } from "./config";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todos: [],
		stories: [],
		tasks: [],
		storyUUID: "",
		errorMessage: "",
		successMessage: "",
		errorFlag: false,
		successFlag: false,
	},
	getters: {},
	mutations: {
		async getAllTodos(state) {
			state.errorMessage = "";
			await axios.get(baseUrl + "/todo/read-all").then(async (response) => {
				state.todos = await response.data.data;
			});
		},

		async createTodo(state, values) {
			let payload: any;
			if (values[1]) {
				payload = {
					Name: values[0],
					Description: values[1],
				};
			} else {
				payload = {
					Name: values[0],
				};
			}

			state.errorFlag = false;
			state.successFlag = false;
			state.successMessage = "";
			state.errorMessage = "";
			await axios
				.post(baseUrl + "/todo", payload)
				.then(async (response) => {
					await axios.get(baseUrl + "/todo/read-all").then(async (response) => {
						state.todos = await response.data.data;
					});
					state.successFlag = true;
					state.successMessage = await response.data.message;
				})
				.catch(async (error) => {
					state.errorFlag = true;
					state.errorMessage = await error.response.data.message;
				});
		},

		async deleteTodo(state, uuid) {
			state.errorFlag = false;
			state.successFlag = false;
			state.successMessage = "";
			state.errorMessage = "";
			await axios
				.delete(baseUrl + "/todo/" + uuid)
				.then(async (response) => {
					await axios.get(baseUrl + "/todo/read-all").then(async (response) => {
						state.todos = await response.data.data;
					});
					state.successFlag = true;
					state.successMessage = await response.data.message;
				})
				.catch(async (error) => {
					state.errorFlag = true;
					state.errorMessage = await error.response.data.message;
				});
		},

		async updateTodo(state, { values, uuid }) {
			let payload: any;
			if (values[1]) {
				payload = {
					Name: values[0],
					Description: values[1],
				};
			} else {
				payload = {
					Name: values[0],
				};
			}

			state.errorFlag = false;
			state.successFlag = false;
			state.successMessage = "";
			state.errorMessage = "";
			await axios
				.put(baseUrl + "/todo/" + uuid, payload)
				.then(async (response) => {
					await axios.get(baseUrl + "/todo/read-all").then(async (response) => {
						state.todos = await response.data.data;
					});
					state.successFlag = true;
					state.successMessage = await response.data.message;
				})
				.catch(async (error) => {
					state.errorFlag = true;
					state.errorMessage = await error.response.data.message;
				});
		},

		async getAllStories(state) {
			state.errorMessage = "";
			await axios.get(baseUrl + "/story/read-all").then(async (response) => {
				state.stories = await response.data.data;
			});
		},

		async getAllTasks(state) {
			state.errorMessage = "";
			await axios.get(baseUrl + "/task/read-all").then(async (response) => {
				state.tasks = await response.data.data;
			});
		},

		async createStoryTask(state, { storyName, taskNames, taskEstimates }) {
			state.errorFlag = false;
			state.successFlag = false;
			state.successMessage = "";
			state.errorMessage = "";
			await axios
				.post(baseUrl + "/story", { Name: storyName })
				.then(async (response) => {
					// does not require to update cache, because cache is updated every 1 second in the stories page
					// await axios
					// 	.get(baseUrl + "/story/read-all")
					// 	.then(async (response) => {
					// 		state.stories = await response.data.data;
					// 	});
					state.successFlag = true;
					state.successMessage = await response.data.message;
					state.storyUUID = await response.data.object.UUID;
					for (let index = 0; index < taskNames.length; index++) {
						await axios.post(baseUrl + "/task", {
							Name: taskNames[index],
							Estimate: taskEstimates[index],
							StoryUUID: state.storyUUID,
						});
					}
					// does not require to update cache, because cache is updated every 1 second in the stories page
					// await axios.get(baseUrl + "/task/read-all").then(async (response) => {
					// 	state.tasks = await response.data.data;
					// });
				})
				.catch(async (error) => {
					state.errorFlag = true;
					state.errorMessage = await error.response.data.message;
				});
		},
	},
	actions: {},
	modules: {},
});
