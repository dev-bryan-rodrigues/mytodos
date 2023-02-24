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
  },

  actions: {
    // Projetos

    async createProject(context, projeto) {
      await api.post("/projects", projeto);
    },

    async buscarProjetos({ commit }) {
      const projetos = await api.get("/projects");
      commit("setProjects", projetos.data);
    },

    async deletarProjeto(context) {
      context.state.todos.forEach((todo) => {
        api.delete(`/todos/${todo.id}`);
      });
      context.state.lists.forEach((list) => {
        api.delete(`/lists/${list.id}`);
      });
      context.state.sprints.forEach((sprint) => {
        api.delete(`/sprints/${sprint.id}`);
      });
      api.delete(`/projects/${context.state.activeProject}`);
      context.commit("setActiveProject", null);
      context.commit("setActiveSprint", null);
    },

    // Sprints

    async createSprint(context, sprint) {
      sprint.project_id = context.state.activeProject;
      await api.post("/sprints", sprint);
    },

    async buscarSprints(context) {
      const sprints = await api.get(
        `/sprints?project_id=${context.state.activeProject}`
      );
      context.commit("setSprints", sprints.data);
    },

    async atualizarSprint(context, sprint) {
      await api.put(`/sprints/${sprint.id}`, sprint);
      context.dispatch("buscarSprints");
    },

    async deletarSprint(context, sprint) {
      context.state.lists.forEach((list) => {
        setTimeout(() => {
          context.dispatch("deletarList", list);
        }, 0);
      });
      await api.delete(`/sprints/${sprint.id}`);
      if (context.state.activeProject !== null) {
        context.dispatch("buscarSprints");
      }
    },

    // Listas

    async criarList(context, list) {
      await api.post("/lists", list).then(() => {
        context.dispatch("buscarTodos");
      });
    },
    async editarList(context, list) {
      await api.put(`/lists/${list.id}`, list).then(() => {
        context.dispatch("buscarTodos");
      });
    },
    async deletarList(context, lista) {
      await context.dispatch("deletarTodoList", lista.id);
      await api.delete(`/lists/${lista.id}`);
      await context.dispatch("buscarTodos", lista.id);
    },

    // Todos

    async buscarTodos(context) {
      const lists = await api.get(
        `/lists?sprint_id=${context.state.activeSprint}`
      );
      const todos = await api.get("/todos");

      lists.data.forEach((list) => {
        todos.data.forEach((todo) => {
          if (todo.list_id == list.id) {
            list.todos.push(todo);
          }
        });
      });

      context.commit("setLists", lists.data || []);
      context.commit("setTodos", todos.data || []);
    },
    async criarTodo(context, value) {
      await api.post("/todos", value).then(() => {
        context.dispatch("buscarTodos");
      });
    },
    async atualizarTodo(context, todo) {
      await api.put(`/todos/${todo.id}`, todo).then(() => {
        context.dispatch("buscarTodos");
      });
    },
    async deletarTodo(context, todo) {
      await api.delete(`/todos/${todo.id}`);
      context.dispatch("buscarTodos");
    },
    async deletarTodoList(context, id) {
      context.state.todos.forEach((todo) => {
        if (todo.list_id === id) {
          setTimeout(() => {
            context.dispatch("deletarTodo", todo);
          }, 0);
        }
      });
      context.dispatch("buscarTodos");
    },
  },
  modules: {},
});
