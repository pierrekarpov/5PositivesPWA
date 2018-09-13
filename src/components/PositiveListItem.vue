<template>
  <li>
    {{ positive.text }}
    <button @click="$emit('remove', positive.id)">
      X
    </button>
  </li>
</template>

<script>
export default {
  props: {
    positive: {
      type: Object,
      required: true
    }
  }
}
</script>
