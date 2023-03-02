<template>
  <div class="card-todo">
    <img
      src="@/assets/edit.svg"
      alt="Editar Tarefa"
      @click.prevent="$emit('editTodo')"
    />
    <h3>{{ todo.title }}</h3>
    <p><span>Responsável: </span>{{ todo.responsable }}</p>
    <p v-if="todo.description">
      <span>Descrição: </span> {{ todo.description }}
    </p>
    <select
      name="lista"
      id="lista"
      @click="$emit('changeList', { selectedList, todo })"
      v-model="selectedList"
    >
      <option v-for="list in lists" :value="list.id" :key="list.id">
        {{ list.title }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CardTodo",
  props: ["todo"],
  data() {
    return {
      selectedList: "",
    };
  },
  computed: {
    ...mapGetters(["lists"]),
  },
  methods: {
    ...mapActions(["atualizarTodo"]),
  },
  mounted() {
    this.selectedList = this.todo.listId;
  },
};
</script>

<style scoped>
.card-todo {
  position: relative;
  background: #cdf8ff;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #0185b9;
  display: flex;
  box-shadow: -1px 1px 2px rgba(9, 107, 149, 0.4);
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s;
}
.card-todo:hover {
  background: rgb(183, 222, 226);
}
span {
  color: #096b95;
  font-weight: bold;
}
img {
  width: 22px;
  position: absolute;
  right: 10px;
  transition: all 0.3s;
  cursor: pointer;
}
img:hover {
  transform: scale(1.4);
}
select {
  border: none;
  outline: none;
  height: 30px;
  width: 50%;
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #096b95;
  margin-top: 10px;
}
p {
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
h3 {
  max-width: 80%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
