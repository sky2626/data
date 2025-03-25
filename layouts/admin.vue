<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
    layout: {
        type: String,
        default: 'admin', // Set default layout to dashboard
    },
})
</script>