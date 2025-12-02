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
    <UForm @submit.prevent="addTask">
      <div class="flex flex-row gap-4">
    <UInput v-model="newTask"/>
      <UButton color="secondary" type="submit" label="Add Task"/>
      </div>
    </UForm>

</template>