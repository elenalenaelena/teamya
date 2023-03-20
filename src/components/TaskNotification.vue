<script>

export default {
  name: 'TaskNotification',
  data() {
    return {
    }
  },
  props: {
    latestTaskData: {}
  },
  methods: {
    showTaskDetail() {
      this.$router.push({name:'TaskDetail', params:{id: this.latestTaskData.id }})
    }
  }
}
</script>

<template>

  <v-alert  v-if="latestTaskData"
      type="warning" 
      title="Neue Aufgabe"
      density="comfortable"
      closable
  >
      <div>Prüfung fehlerhaftes Produkt an {{ latestTaskData.module }}</div>
      <v-btn 
        @click="showTaskDetail()" 
        color="white" 
      >
        bearbeiten
      </v-btn>
  </v-alert> 

  <v-alert  v-else
      type="info" 
      title="Keine aktuellen Benachrichtigungen"
      closable
  >
      <v-btn to="/tasks">
        zur Aufgabenübersicht
      </v-btn>
  </v-alert> 

</template>

<style scoped>

</style>