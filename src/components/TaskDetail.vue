<script>

import { useRoute } from 'vue-router'
import { useApiStore } from '@/stores/ApiStore'

export default {
  name: 'TaskDetail',
  data() {
    return {
        taskId: null,
        task: {},
        errorImg: 12,
        errors: [],
        forwardTo: "",
        snackbar: false,
        overlay: false
    }
  },
  methods: {
    sendTask () {
      this.snackbar = true

      this.task.errors = this.errors 
      this.task.forwardTo = this.forwardTo        
      this.setTaskStatus()
      this.pushTask(this.task)         
    },
    // set task status based on "Weiterleiten" value
    setTaskStatus() {
      switch(this.forwardTo) {
        case("Reparatur"): 
          this.task.status = 'erledigt'; break;
        case("unklar"): 
          this.task.status = 'Klärung erforderlich'; break;
        case("Ausschuss"): 
          this.task.status = 'erledigt'; break;
        default: 
          this.task.status = 'offen';
      }
    },
    getImgPath() {

        return require('@/assets/images/carrier_'+this.errorImg+'.jpg')
    }
  },  
  setup() {
    const store = useApiStore()
    return { 
      store,
      getTaskById: store.getTaskById,
      updateTaskById: store.updateTaskById,
      pushTask: store.pushTask,
    }
  },
  async mounted () {
    //get task data by ID
    const route = useRoute();   
    this.taskId = JSON.parse(route.params.id);  
    this.task = this.getTaskById(JSON.parse(this.taskId))
    this.errorImg = this.task.errorImg
  },
}
</script>

<template>

<v-container fluid>

  <!-- START ROW 1/2 (headline)-->
  <v-row class="pa-2 ma-2">
    <p>Detailansicht Aufgabe</p>
  </v-row>
  <v-row class="pa-2 ma-2">   
    <h2 class="text-high-emphasis">Fehlerhaftes Produkt am Modul {{ this.task.module }}</h2>  
  </v-row>
  <!-- END ROW 1/2 -->


  <!-- START ROW 2/2 (task)-->
  <v-row class="pa-2 ma-2">

    <!-- START COLUMN 1/2 (image) (EDIT MODE) -->
    <v-col v-if="task.assignedTo=='David Heik' && task.status!='erledigt'" sm="12" md="8">  
      
      <v-row class="pb-2 mb-2">
      
        <v-alert
            type="warning"
            color="primary"
            variant="tonal"
            class="mt-2"
            >
            <span>{{ this.task.description }}</span>

          </v-alert>

      </v-row>

      <v-row class="mt-4">
        <v-col sm="12" md="8">
          
          <v-img :src="getImgPath()"></v-img>   
  
          <p class="text-caption text-medium-emphasis text-right">Fehlerbild</p>
        </v-col>

        <v-col sm="12" md="4" class="fill-height">
          <v-img
            contain
            :src="require('@/assets/images/carrier_reference3.png')"
            class="text-center align-center"
          >
            <v-btn
              color="primary"
              icon="mdi-arrow-expand"
              @click="overlay = !overlay"
            ></v-btn>  
          </v-img>
          <p class="text-caption text-medium-emphasis text-right">Referenzbild</p>
    
        </v-col>
        
      </v-row>      

      <v-overlay
        v-model="overlay"
        contained
        class="align-center justify-center"
      >
        <v-btn
          color="primary"
          icon="mdi-close"
          @click="overlay = false"
        ></v-btn>
        <v-img :src="require('@/assets/images/carrier_reference3.png')" :width="800"></v-img>   
      </v-overlay>

      <v-row>
        <v-col class="d-flex"> 
          <v-snackbar
            v-model="snackbar"
          >
            Vielen Dank, Ihre Änderungen wurden gespeichert.

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
      
      
      <v-row>
        <h4>Fehlerhafte Teile</h4>
      </v-row>   
      
      <v-row>

        <v-btn-toggle
          v-model="errors"
          borderless
          multiple
        >
          <v-btn value="Sicherung links" size="large">                
            <v-icon color="red-darken-1" icon="mdi-fuse-alert"></v-icon>
            <v-icon color="grey-darken-4" icon="mdi-fuse"></v-icon>
            Links
          </v-btn>

          <v-btn value="Sicherung rechts" size="large">                
            <v-icon color="grey-darken-4" icon="mdi-fuse"></v-icon>
            <v-icon color="red-darken-1" icon="mdi-fuse-alert"></v-icon>
            Rechts
          </v-btn>

          <v-btn value="Platine" size="large">
            <v-icon right>mdi-integrated-circuit-chip</v-icon>
            Platine            
          </v-btn>

          <v-btn value="Sonstiger Fehler" size="large">
            Sonstiges
          </v-btn>
        </v-btn-toggle>
        
      </v-row>

      <v-row class="pt-4">
        <h4>Weiterleitung an</h4>             
      </v-row>

      <v-row>
        <v-btn-toggle mandatory>      
          <v-btn 
            prepend-icon="mdi-leaf" 
            variant="text" 
            color="green-darken-1"
            size="large"
            @click="this.forwardTo='Reparatur'">
            Reparatur
          </v-btn>
          <v-btn 
            prepend-icon="mdi-help" 
            variant="text"
            size="large"
            @click="this.forwardTo='unklar'">
            unklar
          </v-btn> 
          <v-btn 
            prepend-icon="mdi-delete" 
            variant="text" 
            color="red-darken-1"
            size="large"
            @click="this.forwardTo='Ausschuss'">
            Ausschuss
          </v-btn>   
        </v-btn-toggle>     

      </v-row>

      <v-row class="pt-8">  
       
        <v-btn          
          v-if="this.task.assignedTo=='David Heik' && this.task.status!='erledigt'" 
          color="primary-darken-1" 
          @click="this.sendTask()">
          senden
        </v-btn>
        <v-btn           
          v-else 
          disabled 
          color="primary-darken-1">
          senden
        </v-btn>
        
      </v-row>

    </v-col>
    <!-- END COLUMN 1/2 -->


    <!-- START COLUMN 1/2 (image) (VIEW MODE) -->
    <v-col v-else sm="12" md="8">  
      
      <v-row class="pb-2 mb-2">
      
        <v-alert
            type="warning"
            color="primary"
            variant="tonal"
            class="mt-2"
            >
            <span>Diese Aufgabe können Sie nur ansehen.</span>

          </v-alert>

      </v-row>

      <v-row class="mt-4">
        <v-col sm="12" md="8">
          
          <v-img :src="getImgPath(12)"></v-img>    
          <p class="text-caption text-medium-emphasis text-right">Fehlerbild</p>
        </v-col>

        <v-col sm="12" md="4" class="fill-height">
          <v-img
            contain
            :src="require('@/assets/images/carrier_reference3.png')"
            class="text-center align-center"
          >
            <v-btn
              color="primary"
              icon="mdi-arrow-expand"
              @click="overlay = !overlay"
            ></v-btn>  
          </v-img>
          <p class="text-caption text-medium-emphasis text-right">Referenzbild</p>
    
        </v-col>
        
      </v-row>      

      <v-overlay
        v-model="overlay"
        contained
        class="align-center justify-center"
      >
        <v-btn
          color="primary"
          icon="mdi-close"
          @click="overlay = false"
        ></v-btn>
        <v-img :src="require('@/assets/images/carrier_reference3.png')" :width="800"></v-img>   
      </v-overlay>

    </v-col>
    <!-- END COLUMN 1/2 -->


    <!-- START COLUMN 2/2 (meta) -->
    <v-col xs="12" md="3 offset-1">
          
      <h4>Details</h4>       
      <p>{{ this.task.createdAt }}</p>      
      <p>ID: {{ this.task.id }}</p>
      <p>
        Status: 
        <v-btn variant="plain">{{ this.task.status }}
          <v-icon v-if="this.task.status=='erledigt'" icon="mdi-check-small"></v-icon>
        </v-btn>
      </p>
      <br>
      <h4>Bearbeiter</h4>
      
      <v-avatar v-if="this.task.assignedTo=='David Heik'" class="avatar" color="pink" variant="tonal">
        <span >DH</span>            
      </v-avatar>
      <v-avatar v-else class="avatar" color="primary" variant="tonal">
        <span >ES</span>            
      </v-avatar>&nbsp;
       <span>{{ this.task.assignedTo }}</span>


    </v-col>
    <!-- END COLUMN 3/3 -->
      
  </v-row>  
  <!-- END ROW 2/2 (task)-->   

</v-container>

</template>

<style scoped>

.v-input__details {
  display: none;
}
.error-image {
  height: 100%;
  width: auto;
  background-size: contain;
  background-repeat: no-repeat;
}

.svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    vertical-align: top;
    overflow: hidden;
}

.svg-content {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}

.thumbnail {
  background-image: url('@/assets/images/carrier_reference3.png');
  background-size: contain;
  height: 100%;
}


</style>