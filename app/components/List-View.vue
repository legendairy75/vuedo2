<script setup lang="ts">
const {data: lists} = useAsyncData('lists', () =>
    $fetch('/api/lists')
)
</script>

<template>

  <div v-for="list in lists" :key="list._id">

    <h2 class="text-4xl">{{ list.name }}</h2>
    <TaskList :list="list"/> <!-- List of tasks -->
    <AddTask :list="list"/> <!-- Add task component -->

  </div>

<!--  <TaskList/> &lt;!&ndash; List of tasks &ndash;&gt;-->
<!--  <AddTask/> &lt;!&ndash; Add task component &ndash;&gt;-->
</template>