import Vue from "vue";
import Vuex from "vuex";
import { baseUrl } from "./config";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todos: [],
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
	},
	actions: {},
	modules: {},
});
