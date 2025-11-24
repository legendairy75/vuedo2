<script setup lang="ts">

const {newTask, addTask} = UseTask()

</script>

<template>
  <!-- NEW TASK INPUT -->
  <UCard>
    <p>{{ newTask }}</p>
    <UInput v-model="newTask" @keyup.enter="addTask()" />
  </UCard>
</template>