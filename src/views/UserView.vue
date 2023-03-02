<template>
  <div class="user">
    <div class="projeto">
      <div v-if="projects.length > 0">
        <h2>Selecione o projeto no qual deseja trabalhar:</h2>
        <select name="projects" id="projects" v-model="selectedProject">
          <option disabled value="">Projeto:</option>
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.title }}
          </option>
        </select>
      </div>
      <div v-else class="sem-projeto">
        <h2>Você ainda não possui nenhum projeto!</h2>
      </div>
      <button @click.prevent="criarProjeto = true" class="btn criar">
        Criar um novo projeto
      </button>
      <transition>
        <div class="novo-projeto" v-if="criarProjeto">
          <button
            @click.prevent="(criarProjeto = false), (projeto.title = '')"
            class="btn fechar"
          >
            X
          </button>
          <FormInputLabel
            title="Nome do projeto:"
            @escrevendo="
              (projeto.title = $event), (formErrors.projectName = false)
            "
            :error="formErrors.projectName"
            error-message="Preencha com o nome para continuar"
          />
          <button class="btn salvar" @click="salvarProjeto">
            Salvar Projeto
          </button>
        </div>
      </transition>
    </div>
    <div
      class="sem-sprint"
      v-if="sprints.length <= 0 && selectedProject !== ''"
    >
      <h2>Você ainda não possui nenhuma sprint.</h2>
      <button @click.prevent="newSprint" class="btn criar">
        Criar uma nova sprint
      </button>
    </div>
    <transition>
      <div class="sprint" v-if="selectedProject !== '' && sprints.length > 0">
        <h2>Selecione a Sprint</h2>
        <div class="sprints">
          <FormInputCheckbox
            v-for="sprint in sprints"
            :key="sprint.id"
            :title="sprint.title"
            :value="sprint.id"
            :selected="selectedSprint === sprint.id ? true : false"
            @check="selectSprint"
          >
            <div class="sprint-info">
              <p><span>Começa em: </span>{{ sprint.startAt | dataBR }}</p>
              <p><span>Termina em: </span>{{ sprint.finishAt | dataBR }}</p>
              <button @click="editSprint(sprint)" class="btn editar">
                Editar sprint
              </button>
            </div>
          </FormInputCheckbox>
        </div>
        <button @click.prevent="newSprint" class="btn criar">
          Criar uma nova sprint
        </button>
        <router-link to="/" class="btn quadro"> Ir para o quadro </router-link>
        <transition>
          <div class="nova-sprint editar-sprint" v-if="editarSprint">
            <button
              @click.prevent="
                (formErrors.sprintName = false), fecharEditarSprint()
              "
              class="btn fechar"
            >
              X
            </button>
            <FormInputLabel
              title="Nome da sprint:"
              @escrevendo="
                (sprint.title = $event), (formErrors.sprintName = false)
              "
              :error="formErrors.sprintName"
              error-message="Preencha com o nome para continuar"
              :valor="sprint.title"
            />
            <div class="buttons">
              <button class="btn salvar" @click="salvarNovaSprint">
                Salvar Sprint
              </button>
              <button class="btn deletar" @click="deleteSprint">
                Deletar Sprint
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <transition>
      <div class="nova-sprint" v-if="criarSprint">
        <button
          @click.prevent="(formErrors.sprintName = false), fecharEditarSprint()"
          class="btn fechar"
        >
          X
        </button>
        <FormInputLabel
          title="Nome da sprint:"
          @escrevendo="(sprint.title = $event), (formErrors.sprintName = false)"
          :error="formErrors.sprintName"
          error-message="Preencha com o nome para continuar"
          :valor="sprint.title"
        />
        <label for="start">Começa em: </label>
        <input type="date" name="start" id="start" v-model="sprint.start_at" />
        <label for="finish">Termina em: </label>
        <input
          type="date"
          name="finish"
          id="finish"
          v-model="sprint.finish_at"
        />
        <button class="btn salvar" @click="salvarSprint">Salvar Sprint</button>
      </div>
    </transition>
    <transition>
      <button
        class="btn deletar"
        v-if="selectedProject !== ''"
        @click="deletProjeto"
      >
        Deletar Projeto
      </button>
    </transition>
  </div>
</template>

<script>
import FormInputLabel from "@/components/FormInputLabel.vue";
import FormInputCheckbox from "@/components/FormInputCheckbox.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "UserView",
  components: {
    FormInputLabel,
    FormInputCheckbox,
  },
  data() {
    return {
      criarSprint: false,
      editarSprint: false,
      criarProjeto: false,
      selectedProject: "",
      selectedSprint: "",
      projeto: {
        title: "",
        sprints: [],
      },
      sprint: {
        title: "",
        start_at: "",
        finish_at: "",
        project_id: "",
        id: "",
      },
      formErrors: {
        projectName: false,
        sprintName: false,
      },
    };
  },
  methods: {
    ...mapActions([
      "buscarProjetos",
      "buscarSprints",
      "buscarTodos",
      "createProject",
      "createSprint",
      "atualizarSprint",
      "deletarSprint",
      "deletarProjeto",
      "buscarListas",
    ]),
    ...mapMutations(["setActiveProject", "setActiveSprint"]),
    async salvarProjeto() {
      if (!this.projeto.title) {
        this.formErrors.projectName = true;
        return;
      }
      await this.createProject(this.projeto);
      await this.buscarProjetos();
      this.selectedProject = this.projects[this.projects.length - 1].id;
      this.criarProjeto = false;
    },
    async salvarSprint() {
      if (!this.sprint.title) {
        this.formErrors.sprintName = true;
        return;
      }
      await this.createSprint(this.sprint);
      await this.buscarSprints();
      this.selectedSprint = this.sprints[this.sprints.length - 1].id;
      this.fecharEditarSprint();
    },
    newSprint() {
      this.criarSprint = true;
      setTimeout(() => {
        const criarSprint = document.querySelector(".nova-sprint");
        criarSprint.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }, 0);
    },
    selectSprint(event) {
      this.selectedSprint = event;
    },
    editSprint(sprint) {
      this.editarSprint = true;
      this.sprint.title = sprint.title;
      this.sprint.start_at = sprint.startAt;
      this.sprint.finish_at = sprint.finishAt;
      this.sprint.project_id = sprint.projectId;
      this.sprint.id = sprint.id;
      setTimeout(() => {
        const editarSprint = document.querySelector(".editar-sprint");
        editarSprint.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }, 0);
    },
    fecharEditarSprint() {
      this.sprint.title = "";
      this.sprint.start_at = "";
      this.sprint.finish_at = "";
      this.sprint.project_id = "";
      this.sprint.id = "";
      this.editarSprint = false;
      this.criarSprint = false;
    },
    salvarNovaSprint() {
      if (!this.sprint.title) {
        this.formErrors.sprintName = true;
        return;
      }
      this.atualizarSprint(this.sprint);
      this.fecharEditarSprint();
    },
    async deleteSprint() {
      const deletar = window.confirm("Deseja deletar essa Sprint?");
      if (deletar) {
        await this.deletarSprint(this.sprint);
        this.fecharEditarSprint();
      }
    },
    async deletProjeto() {
      const deletar = window.confirm("Deseja realmente deletar esse Projeto?");
      if (deletar) {
        await this.deletarProjeto();
      }
    },
  },
  computed: {
    ...mapGetters(["projects", "sprints", "activeProject", "activeSprint"]),
  },
  created() {
    if (this.activeProject != null) {
      this.selectedProject = this.activeProject;
    }
    if (this.activeSprint != null) {
      setTimeout(() => {
        this.selectedSprint = this.activeSprint;
      }, 0);
    }

    this.buscarProjetos();
  },
  watch: {
    selectedProject() {
      this.setActiveProject(this.selectedProject);
      this.buscarSprints();
    },
    selectedSprint() {
      this.setActiveSprint(this.selectedSprint);
      this.buscarListas();
    },
    activeProject() {
      if (this.activeProject === null) {
        location.reload();
      }
    },
  },
};
</script>

<style scoped>
.user {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

select,
option {
  width: 100%;
}
select {
  max-width: 300px;
  height: 50px;
  margin-top: 12px;
  margin-bottom: 15px;
  border: none;
  background: #42d9ff;
  font-size: 22px;
  padding: 5px;
  font-weight: 600;
  border-radius: 4px;
}
.btn {
  width: 100%;
  max-width: 200px;
  font-size: 18px;
  background: #42d9ff;
  color: #134866;
  border-radius: 4px;
}
.btn.salvar {
  margin-top: 10px;
}
.btn.fechar {
  width: 30px;
  height: 30px;
  font-weight: bold;
  font-size: 18px;
  border-radius: 8px;
  position: absolute;
  top: -10px;
  right: 10px;
}
.btn.editar {
  border: none;
  background: #00a9dc;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
  position: absolute;
  bottom: -20px;
  right: 10px;
  max-width: 80px;
  height: 20px;
}
.btn.deletar {
  background: red;
  color: #fff;
  margin-top: 40px;
  align-self: flex-end;
  justify-self: flex-end;
}
.btn.deletar:hover {
  background: rgb(219, 1, 1);
  color: #fff;
}

.btn:hover {
  transform: scale(1.03);
  background: #52dcff;
  color: #134866;
}
.novo-projeto,
.nova-sprint {
  margin-top: 20px;
  background: #a1eeff;
  padding: 15px;
  max-width: 500px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 4px 8px #168fb179;
  display: flex;
  flex-direction: column;
}
.nova-sprint label {
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
}
.nova-sprint input {
  display: block;
  height: 40px;
  width: 100%;
  max-width: 250px;
  padding: 15px;
  font-size: 22px;
}
.sprint {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sprint-info {
  padding: 8px;
  position: relative;
}
.sprints {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.buttons {
  display: flex;
  gap: 20px;
  align-items: center;
}
.buttons .btn.deletar {
  margin-top: 10px;
  background: red;
  color: #fff;
}
.sem-projeto {
  margin-bottom: 15px;
}
.sem-sprint {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn.quadro {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2eb164;
  color: #fff;
  font-weight: 600;
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
