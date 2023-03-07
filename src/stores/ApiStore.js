import { defineStore } from 'pinia'

export const useApiStore = defineStore('ApiStore', {

  id: "api",

// state = a function returning the initial state
    state: () => ({
      count: 1,
      apiData: {},
      currTask: null
    }),

// getters = retrieving data from a store
    getters: {
      doubleCount(state) {
        return state.count * 2
      },
      getTasks(state) {
        return state.apiData.tasks
      },
      getTaskById(state) {        
        if(state.apiData.tasks) {
          return (i) => state.apiData.tasks.find( x => x.id === i)         
        }        
      },
      getTasksByUser(state) {
        let t=[]

        try {
          t=state.apiData.tasks.filter( x => x.assignedTo == "David Heik")    
        } catch(error) {
          console.log(error)
        }
        return t   
      },
    },

// actions = modifying data in a store (can be async)
    actions: {
      setApiData(data) {
        try {
          this.apiData = data;
        } catch (error) {        
          console.log(error);
        }         
      },
      setCurrTask(state) {
        try {
          (task) => state.currTask = task
        } catch (error) {        
          console.log(error);
        }  
      },
      pushTask(obj) {
        const index = this.apiData.tasks.findIndex((e) => e.id === obj.id);
    
        if (index === -1) {
          this.apiData.tasks.push(obj); // add
        } else {
          this.apiData.tasks[index] = obj; // modify
        }
        console.log(obj)
    }
    //deleteTask
    }
  })