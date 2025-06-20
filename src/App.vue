<template>
  <app-header v-if="$route.meta.isAuth"/>
  <router-view />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppHeader,
  },
}
</script>
