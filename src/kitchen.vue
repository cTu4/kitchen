<script src="../../SeaFight/src/main.js"></script>
<template>
  <div id="kitchen" class="d-flex">
        <app-sidebar :tables=tables></app-sidebar>
        <div class="kanban d-flex" >
          <column v-for="(dishes, index) in kanban" :id="index" :dishes=dishes :index=index></column>
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
            "table_number": 3,
            "name": "Steak Machette",
            "time": "60",
            "time_placement": "1619629709",
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
            "table_number": 5,
            "name": "Steak Machette",
            "time": "540",
            "time_placement": "1619629709",
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
            "table_number": 6,
            "name": "Steak Machette",
            "time": "540",
            "time_placement": "1619629709",

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
            "table_number": 7,
            "name": "Steak Machette",
            "time": "540",
            "time_placement": "1619279336",

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
            "table_number": 9,
            "name": "Steak Machette",
            "time": "540",
            "time_placement": "1619273836",
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
            "table_number": 10,
            "name": "Steak Machette",
            "time": "540",
            "time_placement": "1619223136",
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
