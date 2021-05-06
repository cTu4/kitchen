<script src="../../SeaFight/src/main.js"></script>
<template>
  <div id="kitchen" class="d-flex">
        <app-sidebar :tables=tables></app-sidebar>
        <div class="kanban d-flex" >
          <column v-for="(column, status, index) in kanban" :key="index" :id="index" :index="index" :column=column :status=status ></column>
        </div>
        <right-bar></right-bar>
  </div>

</template>

<script>
import sidebar from './components/sidebar.vue'
import column from './components/column.vue'
import right_bar from './components/right_bar.vue'
import Draggable from 'vuedraggable'
import axios from 'axios';

export default {
  name: 'app',
  data() {
    return {
      id: 100,
      tables: {
        "1": {
          "number": 3,
          "guests": 6,
          "guests_fact": 5,
          "floor": 1,
          "summ": 6.34,
          "time_come": "11:34",
          "time_gone": "18:00",
          "status":  "free"
        },
        "2": {
          "number": 12,
          "guests": 6,
          "guests_fact": 5,
          "floor": 1,
          "summ": 6.34,
          "time_come": "11:34",
          "time_gone": "18:00",
          "status":  "openned"
        }
      },
      kanban: {
        'income': {
          status: 'Income',
          dishes: [

          ]
        },
        'progress':{
          status: 'In Progress',
          dishes: [

          ]
        },
        'ready':{
          status: 'Ready',
          dishes: [

          ]
        }
      }
    }
  },

  methods:{
    GetDish(dish, kitchen){
      dish.id = this.id;
      dish.name = dish.dishName;
      dish.table_number = this.randomInteger(1,20);
      dish.time = dish.prepTime;
      dish.time_placement = moment().unix();
      dish.comment = "Without honey";
      dish.code = "D17";
      dish.status = "Income";
      dish.guest = 5;
      dish.options = [
        "Label",
        "Label 2"
      ];
      kitchen.id++;
      return dish;
    },
    randomInteger(min, max) {
      // случайное число от min до (max+1)
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    },
     addTable(){
      let timeout = this.randomInteger(0,60000);
      let kitchen = this;
      // let k = this.id++;
      setTimeout(function (){
        axios.get("https://api.brest.app/kitchen/1/queue").then((resp) =>{

          let dish = kitchen.GetDish(resp.data[0], kitchen);

          kitchen.kanban.income.dishes.push(dish);
        }).catch((error)=> console.log(error))
      }, timeout);
      console.log(timeout);

     },
    deleteTable(){
        this.kanban.ready.dishes.pop();
    }
  },
  computed:{

  },
  created() {

  for (let i=1;i<5; i+=3){
    axios.get("https://api.brest.app/kitchen/1/queue").then((resp) =>{
            let dish = this.GetDish(resp.data[0], this);
            this.kanban.income.dishes.push(dish);
    }).catch((error)=> console.log(error));
    axios.get("https://api.brest.app/kitchen/1/queue").then((resp) =>{
      let dish = this.GetDish(resp.data[0], this);
      this.kanban.progress.dishes.push(dish);
    }).catch((error)=> console.log(error));
    axios.get("https://api.brest.app/kitchen/1/queue").then((resp) =>{
      let dish = this.GetDish(resp.data[0], this);
      this.kanban.ready.dishes.push(dish);
    }).catch((error)=> console.log(error));

  }


  },
  mounted(){
    setInterval(this.addTable, 10000);
    setInterval(this.deleteTable, 50000);

  },
  components: {
    AppSidebar: sidebar,
    Column: column,
    RightBar: right_bar,
    Draggable

  }
}
</script>

<style>
  #kitchen{
    background: #e8e9eb;
    height: 100vh;
    max-width: 1024px;
    margin: auto;
  }
  .pointer{
    cursor: pointer;
  }
  .kanban{
    width: 80%;
    height: 100vh;
  }
  body{
    /*font-family: Inter;*/
    font-style: normal;
  }

</style>
