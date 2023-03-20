<script>

import { settings } from '../main.js'

export default {
  name: 'HealthManagement',
  data() {
    return {
      loading: [],
      snackbar: false,
      connected: false,
      settings
    }
  },
  props: {
    apiData: {}
  },
  methods: {
    load (i) {
        this.loading[i] = true
        setTimeout(() => {this.loading[i] = false, this.toggleConnect();}, 3000)
    },
    toggleConnect () {
      this.connected = !this.connected;
      settings.healthConnected = this.connected;
      this.snackbar = true;      
      setTimeout(() => (this.snackbar = false), 5000)
    },
  },
  mounted (){

  // restore connection settings from global value (main.js)
  this.connected = settings.healthConnected;    

  }
}
</script>

<template>

<v-container fluid>

  <h1 class="text-high-emphasis">Gesundheit</h1>

  <v-row>
    <v-col md="4" xs="12">
      <v-card class="pa-8" color="primary" variant="tonal">
        <v-row>
          <v-col cols="1">
            <v-icon 
              icon="mdi-information" 
              color=""
            ></v-icon>
          </v-col>
          <v-col>
            <p>Der Gesundheitstracker ist ein Hilfsmittel zur Überwachung Ihrer Gesundheit. Wenn Sie sich krank fühlen, sollten Sie ärztlichen Rat einholen.</p>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-if="connected" class="pa-8 text-center" color="primary" variant="tonal">
        <v-icon 
          icon="mdi-watch-vibrate" 
          color="primary-lighten-1"
          style="font-size: 6em; height: 2em;"
        ></v-icon>
        <p class="py-2">Verbunden mit Galaxy Watch</p>
        <v-btn
          color="primary-darken-1"
          prepend-icon="mdi-bluetooth-connect"
          @click="toggleConnect"
        >
          trennen
        </v-btn>
      </v-card>

      <v-card v-else class="pa-8 text-center" color="primary" variant="tonal">
        <v-icon 
          icon="mdi-watch-vibrate-off" 
          color="primary-lighten-1"
          style="font-size: 6em; height: 2em;"
        ></v-icon>
        <p class="pb-2">Bitte verbinden Sie Ihren Tracker, um die Gesundheitsfunktion zu aktivieren.</p>

        <v-btn       
          :loading="loading[2]"
          :disabled="loading[2]"
          color="primary-darken-1"
          prepend-icon="mdi-bluetooth-connect"
          @click="load(2)"
        >
          verbinden
        </v-btn>
      </v-card>

    </v-col>

 
    <v-col v-if="connected" md="4" xs="12" class="text-center">

      <v-card>
        <v-card-title class="text-h5">
          Schritte
        </v-card-title>
          <v-img
          contain
          :src="require('@/assets/images/steps.png')"
          class="text-center align-center"
        ></v-img>
      </v-card>

      <v-card>
        <v-card-title class="text-h5">
          Herzfrequenz
        </v-card-title>
        <v-img
          contain
          :src="require('@/assets/images/bpm.png')"
          class="text-center align-center"
        ></v-img>
        <v-card-actions>
          <v-btn variant="text">
            Test starten
          </v-btn>
        </v-card-actions> 
      </v-card> 
      
    </v-col>

    <v-col v-if="connected" md="4" xs="12" class="text-center">

      <v-card>
        <v-card-title class="text-h5">
          Stress
        </v-card-title>
        <v-img
          contain
          :src="require('@/assets/images/stress.png')"
          class="text-center align-center"
        ></v-img>
        <v-card-actions>
          <v-btn variant="text">
            Test starten
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    
  </v-row>

  <v-row>
    <v-col class="d-flex"> 
      <v-snackbar
        v-model="snackbar"
      >
        <span v-if="connected">Verbindung erfolgreich</span>  
        <span v-else>Verbindung getrennt</span>  

        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="snackbar = false"
          >
            x
          </v-btn>
        </template>
      </v-snackbar>
    </v-col> 
  </v-row>   

</v-container>

</template>

<style scoped>

.v-card {
  margin-bottom: 1em;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }


</style>