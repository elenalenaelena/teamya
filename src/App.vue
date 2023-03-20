<script>

import FetchersData from './components/FetchersData.vue'
import { useApiStore } from '@/stores/ApiStore';

export default {
  name: 'App',
  components: {
    FetchersData
  },
  data() {
    return {
      no_tasks: 9
    }
  },
  computed: {
  isDetailPage() {
     return this.$route.name == 'TaskDetail'}
  },
  methods: {
    updateTaskBadge(value){
      this.no_tasks=value;
    }
  },
  setup() {
    const store = useApiStore()

    return {
      store
    }
  },
}
</script>

<template>

<v-app>

  <!-- Must have the app property -->
  <v-app-bar app title="" color="primary">   

    <v-btn v-if="isDetailPage" to="/tasks" class="ma-2 me-auto" size="x-large">
        <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-spacer v-else class="ma-2 me-auto"></v-spacer>   

    <v-btn to="/tasks" stacked>
      <!-- <v-badge color="warning" :content=this.no_tasks > -->
      <v-badge color="warning" dot>
        <v-icon icon="mdi-post"></v-icon>
      </v-badge>
      Tasks
    </v-btn>

    <v-btn to="/health" stacked>
      <v-icon icon="mdi-heart-pulse"></v-icon>
      Health
    </v-btn>

    <v-btn to="/settings" stacked>
        <v-icon icon="mdi-cog"></v-icon>
      Settings
    </v-btn>

    <v-btn stacked>
    <v-avatar color="pink">
      <span>
        DH
      </span>            
    </v-avatar>
  </v-btn>

    <!-- comments in for development of authentication feature -->
    <!-- <v-btn to="/login" stacked variant="tonal">
      <v-icon icon="mdi-login"></v-icon>
      Login
    </v-btn> -->

  </v-app-bar>

  <v-main ma-0 pa-0>
    <FetchersData />
  </v-main>

</v-app>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 10px;
}
</style>
