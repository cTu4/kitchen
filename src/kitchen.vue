<script src="../../SeaFight/src/main.js"></script>
<template>
  <div id="kitchen" class="d-flex">
        <app-sidebar :tables=tables></app-sidebar>
        <div class="kanban d-flex" >
          <column v-for="(dishes, index) in kanban" :id="index" :dishes=dishes :index=index ></column>
        </div>
        <right-bar></right-bar>
  </div>

</template>

<script>
import sidebar from './components/sidebar.vue'
import column from './components/column.vue'
import right_bar from './components/right_bar.vue'
import Draggable from 'vuedraggable'

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
        "Income": [
          {
            id: 1,
            "table_number": 3,
            "name": "Steak Machette",
            "time": "60",
            "time_placement": moment().unix(),
            "comment": "Without honey",
            "code": "D17",
            "status": "In progress",
            "guest": 3,
            "options": [
              "Label",
              "Label 2"
            ]
          },
          {
            id: 2,
            "table_number": 5,
            "name": "Steak Machette",
            "time": "360",
            "time_placement": moment().unix() - 200,
            "comment": "Without honey",
            "code": "D17",
            "status": "In progress",
            "guest": 3,
            "options": [
              "Label",
              "Label 2"
            ]
          }
        ],
        "In Progress": [
          {
            id: 3,
            "table_number": 6,
            "name": "Steak Machette",
            "time": "300",
            "time_placement": moment().unix() - 290,
            "comment": "Without honey",
            "code": "D17",
            "status": "In progress",
            "guest": 3,
            "options": [
              "Label",
              "Label 2"
            ]
          },
          {
            id: 4,
            "table_number": 7,
            "name": "Steak Machette",
            "time": "1200",
            "time_placement": moment().unix() - 500,

            "comment": "Without honey",
            "code": "D17",
            "status": "In progress",
            "guest": 3,
            "options": [
              "Label",
              "Label 2"
            ]
          }
        ],
        "Ready": [
          {
            id: 5,
            "table_number": 9,
            "name": "Steak Machette",
            "time": "540",
            "time_placement": moment().unix() - 400,
            "comment": "Without honey",
            "code": "D17",
            "status": "In progress",
            "guest": 3,
            "options": [
              "Label",
              "Label 2"
            ]
          },
          {
            id: 6,
            "table_number": 10,
            "name": "Steak Machette",
            "time": "540",
            "time_placement": moment().unix() - 300,
            "comment": "Without honey",
            "code": "D17",
            "status": "In progress",
            "guest": 3,
            "options": [
              "Label",
              "Label 2"
            ]
          }
        ]
      }
    }
  },
  methods:{
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
        kitchen.kanban.Income.push({
          id: kitchen.id,
          "table_number": kitchen.randomInteger(1,20),
          "name": "Steak Machette",
          "time": "120",
          "time_placement": moment().unix(),
          "comment": "Without honey",
          "code": "D17",
          "status": "In progress",
          "guest": 3,
          "options": [
            "Label",
            "Label 2"
          ]
        });
        kitchen.id++;
      }, timeout);
      console.log(timeout);

     },
    deleteTable(){
        console.log(this.kanban.Ready);
        this.kanban.Ready.pop();
    }
  },
  computed:{

  },
  mounted(){
    setInterval(this.addTable, 10000);
    setInterval(this.deleteTable, 10000);
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
