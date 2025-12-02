<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
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
    <form @submit.prevent="addList" >
      <input type="text" v-model="newList">
      <button type="submit">Add list</button>
    </form>

  <div>
      <div v-for="list in lists" :key="list._id">
        <div>
          <h2>{{ list.name }}</h2>
          <button @click="removeList(list._id)">DELETE</button>
        </div>

            <TaskList :list="list"/> <!-- List of tasks -->

        <div>
            <AddTask :list="list"/> <!-- Add task component -->
        </div>

      </div>
  </div>
</template>