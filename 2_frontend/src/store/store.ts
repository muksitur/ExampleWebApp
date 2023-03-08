import Vue from "vue";
import Vuex from "vuex";
import { baseUrl } from "./config";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todos: [],
	},
	getters: {},
	mutations: {
		async getAllTodos(state) {
			await axios.get(baseUrl + "/todo/read-all").then((response) => {
				state.todos = response.data.data;
			});
		},
	},
	actions: {},
	modules: {},
});
