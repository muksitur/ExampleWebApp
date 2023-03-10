import Vue from "vue";
import Vuex from "vuex";
import { baseUrl } from "./config";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todos: [],
		errorMessage: "",
		successMeassage: "",
	},
	getters: {},
	mutations: {
		async getAllTodos(state) {
			state.errorMessage = "";
			await axios.get(baseUrl + "/todo/read-all").then((response) => {
				state.todos = response.data.data;
			});
		},

		async createTodo(state, values) {
			const payload = {
				Name: values[0],
				Description: values[1],
			};
			state.successMeassage = "";
			state.errorMessage = "";
			await axios
				.post(baseUrl + "/todo", payload)
				.then(async (response) => {
					await axios.get(baseUrl + "/todo/read-all").then((response) => {
						state.todos = response.data.data;
					});
					state.successMeassage = response.data.message;
				})
				.catch((error) => {
					state.errorMessage = error.response.data.message;
				});
		},
	},
	actions: {},
	modules: {},
});
