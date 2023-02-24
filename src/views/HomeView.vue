<template>
  <div class="home">
    <div class="top">
      <div class="add-lista">
        <button @click.prevent="modalAddListVisible = true" class="btn">
          +
        </button>
        <h2>Adicionar lista</h2>
      </div>
      <div class="add-tarefa">
        <button @click.prevent="adicionarTarefa" class="btn">+</button>
        <h2>Adicionar tarefa</h2>
      </div>
    </div>
    <div class="quadro" v-if="lists.length > 0">
      <div class="lista" v-for="(list, index) in lists" :key="index">
        <h2>{{ list?.title }}</h2>
        <transition-group class="transition-card" mode="out-in">
          <CardTodo
            @editTodo="editarTarefa(todo, true)"
            @changeList="changeList"
            v-for="todo in list.todos"
            :key="todo.id"
            :todo="todo"
          />
        </transition-group>
        <button @click.prevent="editList(list)" class="edit-list">
          Editar lista
        </button>
      </div>
    </div>
    <transition>
      <Modal
        title="Criar uma nova tarefa"
        v-show="modalCriarVisible"
        @fecharModal="fecharModal"
        width="500px"
      >
        <form>
          <label for="titulo">Titulo da tarefa</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            v-model="newTodo.title"
            :class="{ error: formErrors.todoTitle }"
            @keyup="escrevendo"
          />
          <p v-if="formErrors.todoTitle" class="input-error">
            Este campo é obrigatório.
          </p>
          <label for="responsavel">Responsavel pela tarefa</label>
          <input
            type="text"
            name="responsavel"
            id="responsavel"
            v-model="newTodo.responsable"
            :class="{ error: formErrors.responsableTodo }"
            @keyup="escrevendo"
          />
          <p v-if="formErrors.responsableTodo" class="input-error">
            Este campo é obrigatório.
          </p>
          <label for="descricao">Descrição da tarefa</label>
          <textarea
            type="text"
            name="descricao"
            id="descricao"
            v-model="newTodo.description"
          />
          <button @click.prevent="criarTarefa" class="btn salvar">
            Salvar tarefa
          </button>
        </form>
      </Modal>
    </transition>
    <transition>
      <Modal
        title="Editar tarefa"
        v-show="modalEditarVisible"
        @fecharModal="fecharModalEditar"
        width="500px"
      >
        <form>
          <label for="titulo">Titulo da tarefa</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            v-model="editTodo.title"
            :class="{ error: formErrors.editTodoTitle }"
            @keyup="escrevendo"
          />
          <p v-if="formErrors.editTodoTitle" class="input-error">
            Este campo é obrigatório.
          </p>
          <label for="responsavel">Responsavel pela tarefa</label>
          <input
            type="text"
            name="responsavel"
            id="responsavel"
            v-model="editTodo.responsable"
            :class="{ error: formErrors.editTodoResponsable }"
            @keyup="escrevendo"
          />
          <p v-if="formErrors.editTodoResponsable" class="input-error">
            Este campo é obrigatório.
          </p>
          <label for="descricao">Descrição da tarefa</label>
          <textarea
            type="text"
            name="descricao"
            id="descricao"
            v-model="editTodo.description"
          />
          <div class="buttons">
            <button @click.prevent="atualizarTarefa" class="btn salvar">
              Salvar tarefa
            </button>
            <button @click.prevent="deletarTarefa" class="btn deletar">
              Deletar Tarefa
            </button>
          </div>
        </form>
      </Modal>
    </transition>
    <transition>
      <Modal
        title="Criar uma nova lista"
        v-show="modalAddListVisible"
        @fecharModal="fecharModalAddList"
        height="300px"
        width="400px"
      >
        <form>
          <label for="titulo">Titulo da lista</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            v-model="newList.title"
            :class="{ error: formErrors.listName }"
            @keyup="escrevendo"
          />
          <p v-if="formErrors.listName" class="input-error">
            Este campo é obrigatório.
          </p>
          <button @click.prevent="criarLista" class="btn salvar">
            Salvar lista
          </button>
        </form>
      </Modal>
    </transition>
    <transition>
      <Modal
        title="Editar Lista"
        v-show="modalEditListVisible"
        @fecharModal="fecharModalAddList"
        height="300px"
        width="400px"
      >
        <form>
          <label for="titulo">Titulo da lista</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            v-model="newList.title"
            :class="{ error: formErrors.editlistName }"
            @keyup="escrevendo"
          />
          <p v-if="formErrors.editlistName" class="input-error">
            Este campo é obrigatório.
          </p>
          <div class="buttons">
            <button @click.prevent="salvarLista" class="btn salvar">
              Salvar lista
            </button>
            <button @click.prevent="deletarLista" class="btn deletar">
              Deletar lista
            </button>
          </div>
        </form>
      </Modal>
    </transition>
  </div>
</template>

<script>
import CardTodo from "@/components/CardTodo.vue";
import Modal from "@/components/Modal.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    CardTodo,
    Modal,
  },
  data() {
    return {
      modalCriarVisible: false,
      modalEditarVisible: false,
      modalAddListVisible: false,
      modalEditListVisible: false,
      formErrors: {
        listName: false,
        todoTitle: false,
        responsableTodo: false,
        editlistName: false,
        editTodoTitle: false,
        editTodoResponsable: false,
      },
      newTodo: {
        title: "",
        responsable: "",
        description: "",
        list_id: "",
      },
      editTodo: {
        title: "",
        responsable: "",
        description: "",
        list_id: "",
        id: "",
      },
      newList: {
        title: "",
        id: "",
        todos: [],
        sprint_id: "",
      },
    };
  },
  methods: {
    ...mapActions([
      "buscarTodos",
      "criarTodo",
      "atualizarTodo",
      "deletarTodo",
      "criarList",
      "editarList",
      "deletarList",
    ]),
    fecharModal() {
      this.newTodo.title = "";
      this.newTodo.responsable = "";
      this.newTodo.description = "";
      this.formErrors.todoTitle = false;
      this.formErrors.responsableTodo = false;
      this.modalCriarVisible = false;
    },
    adicionarTarefa() {
      if (this.lists.length <= 0) {
        window.alert(
          "Para criar uma tarefa é necessário antes criar uma lista!"
        );
        return;
      }
      this.modalCriarVisible = true;
    },
    criarTarefa() {
      if (!this.newTodo.title) {
        this.formErrors.todoTitle = true;
        if (!this.newTodo.responsable) {
          this.formErrors.responsableTodo = true;
          return;
        }
        return;
      }
      if (this.newTodo.title) {
        if (!this.newTodo.responsable) {
          this.formErrors.responsableTodo = true;
          return;
        }
      }
      this.newTodo.list_id = this.lists[0].id;
      this.criarTodo(this.newTodo);
      this.fecharModal();
    },
    editarTarefa({ title, responsable, description, id, list_id }, abrirModal) {
      this.editTodo.title = title;
      this.editTodo.responsable = responsable;
      this.editTodo.description = description;
      this.editTodo.id = id;
      this.editTodo.list_id = list_id;
      if (abrirModal) {
        this.modalEditarVisible = true;
      }
    },
    async atualizarTarefa() {
      if (!this.editTodo.title) {
        this.formErrors.editTodoTitle = true;
        if (!this.editTodo.responsable) {
          this.formErrors.editTodoResponsable = true;
          return;
        }
        return;
      }
      if (this.editTodo.title) {
        if (!this.editTodo.responsable) {
          this.formErrors.editTodoResponsable = true;
          return;
        }
      }
      await this.atualizarTodo(this.editTodo);
      this.fecharModalEditar();
    },
    fecharModalEditar() {
      this.editTodo.title = "";
      this.editTodo.responsable = "";
      this.editTodo.description = "";
      this.editTodo.id = "";
      this.editTodo.list_id = "";
      this.formErrors.editTodoResponsable = false;
      this.formErrors.editTodoTitle = false;
      this.modalEditarVisible = false;
    },
    async changeList({ selectedList, todo }) {
      this.editarTarefa(todo, false);
      this.editTodo.list_id = selectedList;
      this.atualizarTarefa();
    },
    async deletarTarefa() {
      const apagar = window.confirm("Deseja realmente apagar essa tarefa?");
      if (apagar) {
        await this.deletarTodo(this.editTodo);
        this.fecharModalEditar();
      }
    },
    fecharModalAddList() {
      this.newList.title = "";
      this.newList.id = "";
      this.modalAddListVisible = false;
      this.formErrors.listName = false;
      this.formErrors.editlistName = false;
      this.modalEditListVisible = false;
    },
    async criarLista() {
      if (!this.newList.title) {
        this.formErrors.listName = true;
        return;
      }
      this.newList.sprint_id = this.activeSprint;
      await this.criarList(this.newList);
      this.fecharModalAddList();
    },
    editList({ id, title, sprint_id }) {
      this.newList.id = id;
      this.newList.title = title;
      this.newList.sprint_id = sprint_id;
      this.modalEditListVisible = true;
    },
    async salvarLista() {
      if (!this.newList.title) {
        this.formErrors.editlistName = true;
        return;
      }
      await this.editarList(this.newList);
      this.fecharModalAddList();
    },
    async deletarLista() {
      const apagar = window.confirm(
        "Deseja realmente apagar essa lista? Isso apagará todas as tarefas relacionadas a ela."
      );
      if (apagar) {
        await this.deletarList(this.newList);
        this.fecharModalAddList();
      }
    },
    escrevendo() {
      if (this.formErrors.listName) {
        this.formErrors.listName = false;
      }
      if (this.newTodo.title) {
        this.formErrors.todoTitle = false;
      }
      if (this.newTodo.responsable) {
        this.formErrors.responsableTodo = false;
      }
      if (this.newList.title) {
        this.formErrors.editlistName = false;
      }
      if (this.editTodo.title) {
        this.formErrors.editTodoTitle = false;
      }
      if (this.editTodo.responsable) {
        this.formErrors.editTodoResponsable = false;
      }
    },
  },
  computed: {
    ...mapGetters(["lists", "activeSprint"]),
  },
  created() {
    this.buscarTodos();
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.quadro {
  margin-top: 20px;
  width: 100%;
  display: flex;
  gap: 20px;
}

.lista {
  background: #a1eeff;
  width: 100%;
  max-width: 400px;
  min-height: 300px;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 15px;
}
form {
  display: flex;
  flex-direction: column;
}
input,
textarea {
  display: block;
  border: 1px solid #134866;
  outline: none;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  transition: all 0.5s;
}
input:focus,
textarea:focus,
input:hover,
textarea:hover {
  box-shadow: 0px 0px 8px #1ac6f6;
  transform: scale(1.02);
}
textarea {
  height: 80px;
}
input {
  height: 40px;
}
input.error {
  transition: box-shadow 0.2s;
  box-shadow: 0px 0px 8px red;
}
label {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 20px;
}
.btn.salvar {
  position: relative;
  width: 150px;
  font-size: 22px;
  bottom: 40px;
  align-self: flex-end;
  margin-top: 50px;
  border-radius: 6px;
  font-weight: bold;
}
.btn.deletar {
  position: relative;
  width: 150px;
  align-self: flex-end;
  font-size: 22px;
  bottom: 40px;
  border-radius: 6px;
  font-weight: bold;
  background: red;
  color: #fff;
}
.buttons {
  display: flex;
  justify-content: space-around;
}
.transition-card {
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.add-tarefa,
.add-lista,
.top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.top {
  gap: 50px;
}
.edit-list {
  border: none;
  background: #00a9dc;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
  position: absolute;
  bottom: -10px;
  right: 10px;
}
.edit-list:hover {
  transform: scale(1.1);
  box-shadow: -2px 2px 4px rgba(9, 107, 149, 0.4);
}
.input-error {
  margin-top: 5px;
  color: red;
  animation: slideError 0.3s forwards;
}
@keyframes slideError {
  from {
    transform: translate3d(0, -15px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
.v-enter,
.v.leave-to {
  opacity: 0;
}
.v-enter {
  transform: translate3d(0, -20px, 0);
}
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>
