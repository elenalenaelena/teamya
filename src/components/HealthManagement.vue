<script>

export default {
  name: 'HealthManagement',
  data() {
    return {

    }
  },
  props: {
    apiData: {}
  },
  methods: {

  }
}
</script>

<template>

<v-container>
  <v-row>
    <v-col class="text-center">

      <v-icon 
        icon="mdi-watch-vibrate-off" 
        color="primary-lighten-1"
        size="5em"
      ></v-icon>
      <p>Bitte verbinden Sie Ihren Tracker, um die Gesundheitsfunktion zu aktivieren.</p>

    </v-col>
  </v-row>
</v-container>
</template>

<style scoped>



</style>