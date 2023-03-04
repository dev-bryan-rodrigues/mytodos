import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    todos: [],
    projects: [],
    sprints: [],
    activeProject: null,
    activeSprint: null,
    userToken: "",
    user: {},
  },
  getters: {
    lists(state) {
      return state.lists;
    },
    projects(state) {
      return state.projects;
    },
    sprints(state) {
      return state.sprints;
    },
    activeProject(state) {
      return state.activeProject;
    },
    activeSprint(state) {
      return state.activeSprint;
    },
    token(state) {
      return state.userToken;
    },
  },

  mutations: {
    setLists(state, value) {
      state.lists = value;
    },
    setTodos(state, value) {
      state.todos = value;
    },
    setProjects(state, value) {
      state.projects = value;
    },
    setSprints(state, value) {
      state.sprints = value;
    },
    setActiveProject(state, value) {
      state.activeProject = value;
    },
    setActiveSprint(state, value) {
      state.activeSprint = value;
    },
    setUserToken(state, value) {
      state.userToken = value;
    },
  },

  actions: {
    // Users

    async login(context, user) {
      try {
        const { data } = await api.post("/auth", user);
        context.commit("setUserToken", data.token);
        return { status: "sucess" };
      } catch (err) {
        return { status: "error", err };
      }
    },

    // Projetos

    async buscarProjetos(context) {
      const projetos = await api.get("/projects", {
        headers: {
          user_id: `${context.state.user?.id}`,
          Authorization: `bearer ${context.state.userToken}`,
        },
      });
      context.commit("setProjects", projetos.data);
    },

    async createProject(context, projeto) {
      await api.post("/projects", projeto, {
        headers: {
          Authorization: `bearer ${context.state.userToken}`,
        },
      });
    },

    async updateProject(context, projeto) {
      await api.put("/projects", projeto, {
        headers: {
          Authorization: `${context.state.userToken}`,
        },
      });
    },

    async deletarProjeto(context) {
      api.delete(`/projects/${context.state.activeProject}`, {
        headers: {
          Authorization: `${context.state.userToken}`,
        },
      });
      context.commit("setActiveProject", null);
      context.commit("setActiveSprint", null);
    },

    // Sprints

    async createSprint(context, sprint) {
      sprint.project_id = context.state.activeProject;
      await api.post("/sprints", sprint);
    },

    async buscarSprints(context) {
      const sprints = await api.get("/sprints", {
        headers: {
          project_id: `${context.state.activeProject}`,
        },
      });
      context.commit("setSprints", sprints.data);
    },

    async atualizarSprint(context, sprint) {
      await api.put(`/sprints/${sprint.id}`, sprint);
      context.dispatch("buscarSprints");
    },

    async deletarSprint(context, sprint) {
      await api.delete(`/sprints/${sprint.id}`);
      context.dispatch("buscarSprints");
    },

    // Listas
    async buscarListas(context) {
      const { data } = await api.get("/lists", {
        headers: {
          sprint_id: `${context.state.activeSprint}`,
        },
      });
      context.commit("setLists", data);
    },

    async criarList(context, list) {
      await api.post("/lists", list);
    },
    async editarList(context, list) {
      await api.put(`/lists/${list.id}`, list);
    },
    async deletarList(context, lista) {
      await api.delete(`/lists/${lista.id}`);
    },

    // Todos

    async criarTodo(context, value) {
      await api.post("/todos", value);
    },
    async atualizarTodo(context, todo) {
      await api.put(`/todos/${todo.id}`, todo);
    },
    async deletarTodo(context, todo) {
      await api.delete(`/todos/${todo.id}`);
    },
  },
  modules: {},
});
