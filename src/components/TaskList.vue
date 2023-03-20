<script>
import { useApiStore } from '@/stores/ApiStore'

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: {},
      tasksByUser: [],
      visibleTasks: {},
      userTasksOnly: true,
      openTasksOnly: false,
      closedTasksOnly: false,
      sortBy: "createdAt"
    }
  },
  props: {
    apiData: {}
  },
  methods: {
    showTaskDetail(tid) {
      this.$router.push({ name:`TaskDetail`, params:{id: tid }})      
    },
    sortTasks(){

    },
    filterTasks(){

      // reset
      this.visibleTasks = this.tasks;

      // apply active filters
      if(this.userTasksOnly){
        this.visibleTasks = this.visibleTasks.filter(x => x.assignedTo == 'David Heik')
      }
      if(this.openTasksOnly){
        this.visibleTasks = this.visibleTasks.filter(x => x.status == 'offen')
      } 
      if(this.closedTasksOnly){
        this.visibleTasks = this.visibleTasks.filter(x => x.status == 'erledigt')
      }      

    },
    toggleUserTasksOnly(){
      this.userTasksOnly = !this.userTasksOnly;
      this.filterTasks();
    },
    toggleOpenTasksOnly(){
      this.openTasksOnly = !this.openTasksOnly;
      this.closedTasksOnly = false;
      this.filterTasks();
    },
    toggleClosedTasksOnly(){
      this.closedTasksOnly = !this.closedTasksOnly;
      this.openTasksOnly = false;
      this.filterTasks();
    }
  },
  setup() {
    const store = useApiStore()

    return { 
      store,
      getTasks: store.getTasks,
      getTasksByUser: store.getTasksByUser
    }
  },
  async mounted () {
      this.tasks = this.getTasks;
      this.tasksByUser = this.getTasksByUser;
      this.visibleTasks = this.tasks; 

      this.filterTasks();

  },
}
</script>

<template>



<v-container fluid>

  <h1 class="text-high-emphasis">Aufgabenübersicht ({{ this.visibleTasks.length }})</h1>

    <!-- meine Aufgaben -->
    <v-chip
      v-if="userTasksOnly"
      class="ma-2 chip-btn" color="primary" text-color="white" closable prepend-icon="mdi-account-circle"
      @click="this.toggleUserTasksOnly()"
    > Meine Aufgaben
    </v-chip>
   
    <v-chip
      v-else
      class="ma-2 chip-btn" color="grey" text-color="white" prepend-icon="mdi-account-circle"
      @click="this.toggleUserTasksOnly()"
    > Meine Aufgaben
    </v-chip>

    <!-- offene Aufgaben -->
    <!-- <v-chip
      v-if="openTasksOnly"
      class="ma-2 chip-btn" color="primary" text-color="white" closable prepend-icon=""
      @click="this.toggleOpenTasksOnly()"
    > Offene Aufgaben
    </v-chip>
   
    <v-chip
      v-else
      class="ma-2 chip-btn" color="grey" text-color="white" prepend-icon=""
      @click="this.toggleOpenTasksOnly()"
    > Offene Aufgaben
    </v-chip> -->

    <!-- erledigte Aufgaben -->
    <v-chip
      v-if="closedTasksOnly"
      class="ma-2 chip-btn" color="primary" text-color="white" closable prepend-icon=""
      @click="this.toggleClosedTasksOnly()"
    > Erledigte Aufgaben
    </v-chip>
   
    <v-chip
      v-else
      class="ma-2 chip-btn" color="grey" text-color="white" prepend-icon=""
      @click="this.toggleClosedTasksOnly()"
    > Erledigte Aufgaben
    </v-chip>



  <v-row no-gutters>

    <v-row class="pa-3 extra-margin">
      <v-col md="4 offset-3 font-weight-medium"> 
        Beschreibung
      </v-col>
      <v-col md="2" class="text-center font-weight-medium"> 
        Status
      </v-col>
    </v-row>  


    <v-expansion-panels class="mb-6">  
      <v-expansion-panel v-for="task in this.visibleTasks" :key="task.id">
        
        <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
          <v-row no-gutters>
            <v-col md="3">
              <span>{{ task.createdAt }}</span>
            </v-col>
            <v-col md="4"> 
              <span>
                Prüfung fehlerhaftes Produkt
              </span> 
            </v-col>
            <v-col md="2" class="text-center"> 
                <v-btn variant="plain">{{ task.status }}</v-btn>
            </v-col>
            <v-col md="1">
              <v-avatar v-if="task.assignedTo=='David Heik'" class="avatar" color="pink" variant="tonal">
                <span >DH</span>            
              </v-avatar>
              <v-avatar v-else class="avatar" color="primary" variant="tonal">
                <span >ES</span>            
              </v-avatar>
            </v-col>
            <v-col md="2">
              <span v-if="task.assignedTo=='David Heik' && task.status!='erledigt'">
                <v-btn  
                  class="offset-1" 
                  prepend-icon="mdi-pencil" 
                  variant="plain" 
                  color="primary-darken-1" 
                  x-small 
                  :to="{ name: 'TaskDetail', params: { id: task.id } }"
                >bearbeiten</v-btn>
              </span>
              <span v-else>
                <v-btn  
                  class="offset-1" 
                  prepend-icon="mdi-eye"
                  variant="plain" 
                  color="primary-darken-1"  
                  x-small 
                  :to="{ name: 'TaskDetail', params: { id: task.id } }"
                >ansehen</v-btn>
              </span>      
            </v-col>
          </v-row>      
        </v-expansion-panel-title>
      
        <v-expansion-panel-text>
          
          Modul: "{{ task.module }}". Bitte prüfen Sie die Ursache und geben Sie an, wohin das Produkt weitergeleitet werden soll.  

        </v-expansion-panel-text>

      </v-expansion-panel>
    </v-expansion-panels>

  </v-row>  

</v-container>

</template>

<style>
.chip-btn{
  cursor: pointer;
}

.extra-margin {
  margin-right: 22.5px !important;
}
</style>