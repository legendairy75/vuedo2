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
  <UCard>
    <p>{{ newTask }}</p>
    <UInput v-model="newTask" @keyup.enter="addTask()" />
  </UCard>
</template>