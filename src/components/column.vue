<template>

  <div class="column d-flex flex-column">
    <div class="title">
        <span class="text t-24px font-weight-700">{{column.status}}</span>
        <span class="summ t-11px t-gray-op3">{{column.dishes.length}}</span>
    </div>
    <div class="subtitle">
      <span class="text">All</span>
      <span class="summ">{{column.dishes.length}}</span>
    </div>
    <draggable :list="column.dishes"
               ghost-class="ghost"
               class="list-group"
               v-bind="dragOptions"
               @start="move"
               @change="change(index, $event)"
    >
        <card class="wrap" v-for="dish in column.dishes" :dish="dish" :status="status" :key="dish.id"></card>
    </draggable>


  </div>

</template>

<script>
import Draggable from 'vuedraggable'
import rawDisplayer from './rawDisplayer'
import card from './card'

export default {
  name: 'app',
  props: [
    "column",
    "status",
    "index"
  ],
  components:{
    Draggable,
    rawDisplayer,
    card: card
  },
  methods:{
    change(status,e){
      if(e.added){
        e.added.element.status = status;
        // request to change status of dish
      }
    },
    move(e){
      let card = $(e.item).find('.dish.active');
      card.toggleClass('active');
      card.next().toggleClass('active');
      card.parent().siblings('.wrap').find('.dish').toggleClass('blur');

    }
  },

  computed: {
    checkTime(dish){
      console.log(dish);
    },
    DragClass(){
      let DragClass = "";
      switch (this.status){
        case "income":
          DragClass = "";
          break;

        case "progress":
          DragClass = "income"
          break;
        case "ready":
          DragClass = ["progress"];
          break;
      }
      return DragClass;
    },
    dragOptions() {
      return {
        animation: 200,
        group: {
          name: this.status,
          put: this.DragClass
        },
        disabled: false,
        ghostClass: "ghost",
        sort: true,
        onSort: function (/**Event*/evt) {
          console.log('aaa');
        },
      };
    }
  },
  data () {

    return {

    }
  }
}
</script>

<style scoped>
  .column{
    width: 33.3%;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 12px;
  }

  .title .summ{
    vertical-align: top;
  }
  .wrap{
    position: relative;
  }
  .list-group{
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .list-group,.list-group span{
    height: 100%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
