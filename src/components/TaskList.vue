<script>
import { useApiStore } from '@/stores/ApiStore'

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: {},
      tasksByUser: [],
      page: 1  
    }
  },
  props: {
    apiData: {}
  },
  methods: {
    showTaskDetail(tid) {
      this.$router.push({ name:`TaskDetail`, params:{id: tid }})      
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
  },
}
</script>

<template>



<v-container fluid>

  <v-row no-gutters>
    <h3>Meine Aufgaben</h3>

    <v-expansion-panels class="mb-6">  
      <v-expansion-panel v-for="task in this.tasksByUser" :key="task.id">
        
        <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">   
          <v-row no-gutters>
            <v-col md="3">
              <span>{{ task.createdAt }}</span>
            </v-col>
            <v-col md="3"> 
              <span class="offset-1">
                Prüfung fehlerhaftes Produkt
              </span> 
            </v-col>
            <v-col md="3"> 
              <span class="offset-2">
                Status: 
                <v-btn variant="plain">{{ task.status }}</v-btn>
              </span>
            </v-col>
            <v-col md="1">
              <v-avatar color="pink" variant="tonal">
                <span>
                  DH
                </span>            
              </v-avatar>
            </v-col>
            <v-col md="2">
              <v-btn v-if="task.status=='!erledigt'" class="offset-1" color="primary-darken-1" small :to="{ name: 'TaskDetail', params: { id: task.id } }">
                bearbeiten
              </v-btn>
              <v-btn v-else class="offset-1" color="plain" small :to="{ name: 'TaskDetail', params: { id: task.id } }">
                ansehen
              </v-btn>
            </v-col>
          </v-row>   
        </v-expansion-panel-title>
      
        <v-expansion-panel-text>

          Modul: "{{ task.module }}". Bitte prüfen Sie die Ursache und geben Sie an, wohin das Produkt weitergeleitet werden soll.
          

        </v-expansion-panel-text>

      </v-expansion-panel>
    </v-expansion-panels>

  


  </v-row>

  <v-row no-gutters>
    <h3>Alle Aufgaben</h3>

    <v-expansion-panels class="mb-6">  
      <v-expansion-panel v-for="task in this.tasks" :key="task.id">
        
        <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
          <v-row no-gutters>
            <v-col md="3">
              <span>{{ task.createdAt }}</span>
            </v-col>
            <v-col md="3"> 
              <span class="offset-1">
                Prüfung fehlerhaftes Produkt
              </span> 
            </v-col>
            <v-col md="3"> 
              <span class="offset-2">
                Status: 
                <v-btn variant="plain">{{ task.status }}</v-btn>
              </span>
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
              <v-btn v-if="task.assignedTo=='David Heik' && task.status!='erledigt'" class="offset-1" color="primary-darken-1" small :to="{ name: 'TaskDetail', params: { id: task.id } }">
                bearbeiten
              </v-btn>
              <v-btn v-else class="offset-1" color="plain" small :to="{ name: 'TaskDetail', params: { id: task.id } }">
                ansehen
              </v-btn>
              
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
</style>