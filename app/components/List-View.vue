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
    <UForm @submit.prevent="addList" >
      <div class="flex flex-row gap-4">
      <UInput type="text" v-model="newList" />
      <UButton color="secondary" type="submit" label="Add list"/>
      </div>
    </UForm>
  </UCard>

  <div class="grid gap-4" :class="{
  'grid-cols-1': lists.length === 1,
  'grid-cols-2': lists.length === 2,
  'grid-cols-3': lists.length >= 3
  }">
  <div v-for="(list, index) in lists" :key="list._id" class="contents" >
<UCard :class="{
      // If there are 4 items, the 4th one spans the full row
      'col-span-3': lists.length === 4 && index === 3,
      // 'col-span-2': lists.length === 5 && (index === 3 || index === 4)
    }">
  <template #header>
    <div class="flex flex-row gap-4">
    <h2 class="text-4xl">{{ list.name }}</h2>
    <UButton color="error" @click="removeList(list._id)">DELETE</UButton>
    </div>
  </template>

    <UCollapsible>
      <UButton label="open"/>

      <template #content>

        <AddTask :list="list"/> <!-- Add task component -->
        <TaskList :list="list"/> <!-- List of tasks -->

      </template>
    </UCollapsible>
</UCard>
  </div>
  </div>
</template>