<script>

import { useRoute } from 'vue-router'
import { useApiStore } from '@/stores/ApiStore'

export default {
  name: 'TaskDetail',
  data() {
    return {
        taskId: null,
        task: {},
        checkboxes: [],
        error: true,
        selected: [],
        radioGroup: "1",
        data: null,
        myImage: require('@/assets/images/carrier_12.jpg')
    }
  },
  methods: {
    updateTask () {

    },
    getImgUrl(pic) {
        return require('@/assets/images/carrier_'+pic+'.jpg')
    }
  },  
  setup() {
    const store = useApiStore()
    return { 
      store,
      getTaskById: store.getTaskById
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

  <v-row no-gutters>

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
      <p>{{ this.task.error }}</p>
      <br>


      <v-row>
        <v-col xs="12" md="8"> 

          <v-img 
              :src="this.myImage"  
              cover
          ></v-img>     
          <img :src="getImgUrl(12)" v-bind:alt="pic"/>     

        </v-col>

        <v-col xs="12" md="4">         

          <v-checkbox-btn-group>     
            <br>
            <h4>Fehlerursache</h4> 
              <v-checkbox-btn
                  v-model="selected"
                  label="ohne Fehler"
                  value=0
                  density="comfortable"
              ></v-checkbox-btn><br>     
              <v-checkbox-btn
                  v-model="selected"
                  label="Material falsch (Sicherung links)"
                  value=1
                  density="comfortable"
              ></v-checkbox-btn><br>
              <v-checkbox-btn
                  v-model="selected"
                  label="Material falsch (Sicherung rechts)"
                  value=2
                  density="comfortable"
              ></v-checkbox-btn><br>
              <v-checkbox-btn 
                  v-model="selected"
                  label="Material falsch (beide Sicherungen)"
                  value=3
                  density="comfortable"
              ></v-checkbox-btn><br>
              <v-checkbox-btn
                  v-model="selected"
                  label="Platine verschmutzt / beschädigt"
                  value=4
                  density="comfortable"
              ></v-checkbox-btn><br> 
              <v-checkbox-btn
                  v-model="selected"
                  label="Platine 180° verdreht"
                  value=5
                  density="comfortable"
              ></v-checkbox-btn><br>  
              <div class="d-flex" >           
                <v-checkbox-btn
                  v-model="selected"
                  value=6
                  density="comfortable"
                ></v-checkbox-btn>
                <v-text-field
                  label="Sonstiges"
                  hide-details
                  density="comfortable"
                  underlined
                ></v-text-field>
              </div> 
          </v-checkbox-btn-group>  

        </v-col>     
      </v-row>


      <v-row>
        <v-col>

        <h4>Weiterleiten an</h4>

        <v-btn-toggle>      
          <v-btn 
            append-icon="mdi-leaf" 
            variant="tonal" 
            color="green">
            Reparatur
          </v-btn>
          <v-btn 
            append-icon="mdi-help" 
            variant="tonal">
            unklar
          </v-btn> 
          <v-btn 
            append-icon="mdi-delete" 
            variant="tonal" 
            color="red">
            Ausschuss
          </v-btn>   
        </v-btn-toggle>

        </v-col>
      </v-row>
      <br>

      <v-row>
        <v-col> 
          <v-btn color="primary-darken-1">
            senden
          </v-btn>
        </v-col> 
      </v-row>       

    </v-col>
    <!-- END COLUMN 2/3 -->


    <!-- START COLUMN 3/3 (meta) -->
    <v-col xs="12" md="2 offset-1">
          
      <h4>Aufgabe</h4>       
      <p>{{ this.task.createdAt }}</p>      
      <p>ID: {{ this.task.id }}</p>
      <p>Status: {{ this.task.status }}</p>
      <br>
      <h4>Bearbeiter</h4>
      
      <v-avatar v-if="this.task.assignedTo=='David Heik'" class="avatar" color="pink" variant="tonal">
            <span >DH</span>            
          </v-avatar>
          <v-avatar v-else class="avatar" color="primary" variant="tonal">
            <span >ES</span>            
          </v-avatar>&nbsp;
       <span>{{ this.task.assignedTo }}</span>
      <br><br>
      <h4>Historie</h4>
      <p> - </p>
 
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