<script setup lang="ts">
const {data: lists, refresh} = useAsyncData('lists', () =>
    $fetch('/api/lists')
)
const newList = ref('')

async function addList() {
  if (!newList.value) return

  await $fetch('/api/lists', {
    method: 'POST',
    body: { name: newList.value} // ✅ send plain JSON
  })

  newList.value = ''
  await refresh()
  console.log(`${newList.value} created`)
}

async function removeList(id: string) {
  await $fetch(`/api/lists/${id}`, {method: 'DELETE'})
  await refresh()
}
</script>

<template>
  <UCard>
    <p>Add list</p>
    <UForm @submit.prevent="addList">
      <UInput type="text" v-model="newList" />
      <UButton type="submit" label="Add list"/>
    </UForm>
  </UCard>

  <div v-for="list in lists" :key="list._id">

    <h2 class="text-4xl">{{ list.name }}</h2>
    <UButton color="error" @click="removeList(list._id)">DELETE</UButton>
    <TaskList :list="list"/> <!-- List of tasks -->
    <AddTask :list="list"/> <!-- Add task component -->

  </div>
</template>