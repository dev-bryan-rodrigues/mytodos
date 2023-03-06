<template>
  <div>
    <div class="projetos">
      <h1>Projetos</h1>
      <div class="controls-project">
        <InputSelect
          v-if="projects.length > 0"
          :options="projects"
          @select="projetoSelecionado"
        />
        <p v-else class="sem-projeto">Você ainda não possui nenhum projeto.</p>
        <div class="criar-projeto">
          <ButtonStandart
            @click="(modalVisible = true), (modalType = 'criar')"
            width="36px"
            padding="2px"
            >+</ButtonStandart
          >
          <span>Criar</span>
        </div>
        <div v-if="projects.length > 0" class="editar-projeto">
          <ButtonStandart width="36px" padding="7px">
            <img src="@/assets/edit.svg" alt="" />
          </ButtonStandart>
          <span>Editar</span>
        </div>
      </div>
    </div>
    <transition name="modal">
      <TheModal v-if="modalVisible">
        <ContentBox
          :buttonClose="true"
          @close="
            (modalVisible = false), (modalType = ''), (project.title = '')
          "
          maxWidth="350px"
          height="234px"
          v-if="modalType === 'criar'"
          title="Novo Projeto"
        >
          <InputLabel
            label="Nome"
            @input="(project.title = $event), (error = '')"
            :error="error"
          />
          <ButtonStandart
            style="margin-top: 18px"
            padding="3px 125px"
            @click="criarProjeto"
          >
            Salvar
          </ButtonStandart>
        </ContentBox>
      </TheModal>
    </transition>
  </div>
</template>

<script>
import ButtonStandart from "@/components/ButtonStandart.vue";
import TheModal from "@/components/TheModal.vue";
import ContentBox from "@/components/ContentBox.vue";
import InputLabel from "@/components/InputLabel.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import InputSelect from "../InputSelect.vue";

export default {
  name: "OrganismsProjetos",
  components: { ButtonStandart, TheModal, ContentBox, InputLabel, InputSelect },
  data() {
    return {
      modalVisible: false,
      modalType: "",
      project: {
        title: "",
      },
      error: "",
    };
  },
  computed: {
    ...mapGetters(["projects"]),
  },
  methods: {
    ...mapMutations(["setActiveProject"]),
    ...mapActions(["buscarProjetos", "createProject"]),
    async criarProjeto() {
      if (!this.project.title) {
        this.error = "Este campo precisa ser preenchido";
      }
      await this.createProject(this.project);
      this.modalVisible = "";
      this.modalType = "";
      this.project.title = "";
      await this.buscarProjetos();
    },
    projetoSelecionado(event) {
      this.setActiveProject(event);
    },
  },
  created() {
    this.buscarProjetos();
  },
};
</script>

<style scoped>
.projetos {
  margin-top: 40px;
  margin-left: 40px;
}
.controls-project {
  display: flex;
  align-items: center;
  gap: 40px;
}
h1 {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 32px;
  line-height: 100%;
  line-height: 48px;
  color: #028b95;
  margin-bottom: 5px;
}
.criar-projeto,
.editar-projeto {
  display: flex;
  align-items: center;
  gap: 5px;
}
span {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  color: #258c80;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.7s;
}
</style>
