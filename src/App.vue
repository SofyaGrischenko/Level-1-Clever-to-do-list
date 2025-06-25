<template>
  <app-header v-if="$route.meta.isAuth" />
  <router-view />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppHeader,
  },

  async created() {
    const uid = localStorage.getItem('uid')

    if (uid) {
      await this.$store.dispatch('fetchUser')
    }
  },
}
</script>
