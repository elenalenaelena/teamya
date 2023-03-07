<script>

import { useRoute } from 'vue-router'
import { useApiStore } from '@/stores/ApiStore'

export default {
  name: 'TaskDetail',
  data() {
    return {
        taskId: null,
        task: {},
        errors: [],
        forwardTo: "",
        snackbar: false
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
    getImgPath(pic) {
        return require('@/assets/images/carrier_'+pic+'.jpg')
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
  },
}
</script>

<template>

<v-container fluid>

  <v-row>

    <!-- START COLUMN 1/3 (back navigation) -->
    <v-col sm="12" md="2">
      <v-btn to="/tasks">
        <v-icon >mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>
    <!-- END COLUMN 1/3 -->


    <!-- START COLUMN 2/3 (content) -->
    <v-col sm="12" md="7">

      <h2>Fehlerhaftes Produkt am Modul "{{ this.task.module }}"</h2>  
      <br>
      <p v-if="task.assignedTo=='David Heik' && task.status!='erledigt'">{{ this.task.description }}</p>
      <br>

      <v-row>
        <v-col xs="12" md="6"> 
   
          <v-img :src="getImgPath(12)"></v-img>     

        </v-col>

        <v-col xs="12" md="6">
 
          <v-checkbox-btn-group>     
            <br>
            <h4>Fehlerursache</h4> 
              <v-checkbox-btn
                  v-model="errors"
                  label="ohne Fehler"
                  value=0
                  density="comfortable"
              ></v-checkbox-btn><br>     
              <v-checkbox-btn
                  v-model="errors"
                  label="Material falsch (Sicherung links)"
                  value=1
                  density="comfortable"
              ></v-checkbox-btn><br>
              <v-checkbox-btn
                  v-model="errors"
                  label="Material falsch (Sicherung rechts)"
                  value=2
                  density="comfortable"
              ></v-checkbox-btn><br>
              <v-checkbox-btn 
                  v-model="errors"
                  label="Material falsch (beide Sicherungen)"
                  value=3
                  density="comfortable"
              ></v-checkbox-btn><br>
              <v-checkbox-btn
                  v-model="errors"
                  label="Platine verschmutzt / beschädigt"
                  value=4
                  density="comfortable"
              ></v-checkbox-btn><br> 
              <v-checkbox-btn
                  v-model="errors"
                  label="Platine 180° verdreht"
                  value=5
                  density="comfortable"
              ></v-checkbox-btn><br>  
              <!-- <div class="d-flex" >           
                <v-checkbox-btn
                  v-model="errors"
                  label="Sonstiges"
                  value=6
                  density="comfortable"
                ></v-checkbox-btn>
                <v-text-field
                  label="Sonstiges"
                  hide-details
                  density="comfortable"
                  underlined
                  clearable
                ></v-text-field>
              </div>  -->
          </v-checkbox-btn-group>  

        </v-col>     
      </v-row>


      <v-row>
        <v-col>

        <h4>Weiterleiten an</h4>

        <v-btn-toggle mandatory>      
          <v-btn 
            append-icon="mdi-leaf" 
            variant="tonal" 
            color="green"
            @click="this.forwardTo='Reparatur'">
            Reparatur
          </v-btn>
          <v-btn 
            append-icon="mdi-help" 
            variant="tonal"
            @click="this.forwardTo='unklar'">
            unklar
          </v-btn> 
          <v-btn 
            append-icon="mdi-delete" 
            variant="tonal" 
            color="red"
            @click="this.forwardTo='Ausschuss'">
            Ausschuss
          </v-btn>   
        </v-btn-toggle>

        </v-col>
      </v-row>
      <br>

      <v-row>
        <v-col> 
          <v-btn v-if="this.task.assignedTo=='David Heik' && this.task.status!='erledigt'" color="primary-darken-1" @click="this.sendTask()">
            senden
          </v-btn>
          <v-btn v-else disabled color="primary-darken-1" @click="this.sendTask()">
            senden
          </v-btn>
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

    </v-col>
    <!-- END COLUMN 2/3 -->


    <!-- START COLUMN 3/3 (meta) -->
    <v-col xs="12" md="2 offset-1">
          
      <h4>Aufgabe</h4>       
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
      <!-- <br><br>
      <h4>Historie</h4>
      <p> - </p> -->
 
    </v-col>
    <!-- END COLUMN 3/3 -->
      
  </v-row> 

    

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



</style>