<script setup lang="ts">
import { computed } from 'vue'
interface List {
  _id: string
  name: string
}

const props = defineProps<{
  list: List
}>()

const listId = computed(() => props.list?._id ?? '')

const {newTask, addTask} = UseTask(listId)

</script>

<template>
  <!-- NEW TASK INPUT -->
    <form @submit.prevent="addTask">
      <div>
    <input v-model="newTask">
        <button type="submit">Add task</button>
      </div>
    </form>

</template>