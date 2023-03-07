<script>
import TaskNotification from './TaskNotification.vue';
import NoTaskNotification from './NoTaskNotification.vue';
import { settings } from '../main.js'
import { useApiStore } from '@/stores/ApiStore';

export default {
data() {
    return {
    alert: false,
    data: [],
    intervalId: null,
    id: null,
    randInt: 20000,
    task: null,
    latestTask: null,
    exampleSocket: null,
    settings
    }
},
watch: {
    useApiStore: function(value) {
            // If "pageData" ever changes, then we will console log its new value.
            console.log(value);
    }
},
components: {
    TaskNotification,
    NoTaskNotification
},
methods: {
    createNotification(){
       this.alert = true;
       if(settings.soundAlert) {
            this.playSound()
       }
    },
    createTask(){         

        // check no of tasks
        let no_tasks = this.data.tasks.length;     
        
        if (no_tasks < 8 ){

            let dateTime = this.getDateTime();
            let assignee = this.getAvailableUser();  
            let errorImg = this.getError();   
            
            if(no_tasks == 0)
               this.id = 0;
            else 
               this.id = this.getMaxId(this.data.tasks)

            //create new task
            this.task = {
            type: 'create', 
            path: 'tasks', 
            id: this.id++, 
            data: {
                id: this.id, 
                assignedTo: assignee,
                comments: [],
                createdAt: dateTime,
                description: "Bitte prüfen Sie die Ursache und leiten Sie das Produkt weiter.",               
                errorImg: errorImg,
                errors: [],
                forwardTo: "",
                module: "Kamera-Station",                
                status: "offen"            
                } 
            }      

            //send to socket
            this.exampleSocket.send(JSON.stringify(this.task));   

             //create notification
            this.latestTask = this.task.data;        
            this.createNotification();  
        }

        // clear interval
        clearInterval(this.intervalId);      
    
        // new loop
        this.randInt = Math.round(Math.random() * (40000 - 20000) + 20000); 
        this.intervalId = setInterval(this.createTask, this.randInt);      

    },
    getDateTime() {
        const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
        }
        return new Intl.DateTimeFormat('de-DE', options).format(Date.now());
    },
    getError() {
        let err = [12, 13, 14]
        let x = err[Math.floor(Math.random()* err.length)]
        return x
    },
    getAvailableUser(){    
        let assignee = "-";
        const availableUsers = this.data.users.filter( item => {
            return item.available
        });
        assignee = availableUsers[Math.floor(Math.random()*availableUsers.length)]

        return assignee.surname +" "+ assignee.lastname;
    },
    getMaxId(obj) {
        return (Math.max.apply(Math, obj.map(function(o) {
            return o.id;
        })));
    },
    playSound (){
      const sound = ( new Audio( require('@/assets/ping.mp3')))
      sound.play();
    },
    updateTask(t){

        console.log('updated task via API')

        this.task = {
            type: 'update', 
            path: 'tasks', 
            id: t.id, 
            data: t
        }     

        //send to socket
        this.exampleSocket.send(JSON.stringify(this.task));   

    }
},
async created() {

    // Connect to the server.
    const socketUrl = "ws://localhost:8080";
    this.exampleSocket = new WebSocket(socketUrl);
    
    // Listen connection events.
    this.exampleSocket.onopen = (ev) => {
        console.log('Socket opened: ', ev);
        this.exampleSocket.send(JSON.stringify({type: 'read', path: 'users'}));
        this.exampleSocket.send(JSON.stringify({type: 'read', path: 'modules'}));
        this.exampleSocket.send(JSON.stringify({type: 'read', path: 'tasks'}));
    
        this.intervalId = setInterval(this.createTask, this.randInt);
    
    };
    this.exampleSocket.onmessage = (m) => {
        let message = JSON.parse(m.data);        
        this.data[message.path] = message.data;

        this.store.setApiData(this.data);
    };
    this.exampleSocket.onclose = (ev) => {
        console.log('Socket closed: ', ev);
    };
        
},
setup() {
    const store = useApiStore()
    return { 
        store 
    }
}

}
</script>

<template>

    <TaskNotification v-if="alert" :latestTaskData="latestTask" />
    <NoTaskNotification v-else />

    <router-view :apiData="data"></router-view>        

</template>