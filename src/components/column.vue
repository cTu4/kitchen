<template>

  <div class="column d-flex flex-column">
    <div class="title">
        <span class="text t-24px font-weight-700">{{index}}</span>
        <span class="summ t-11px t-gray-op3">{{dishes.length}}</span>
    </div>
    <div class="subtitle">
      <span class="text">All</span>
      <span class="summ">{{dishes.length}}</span>
    </div>
    <draggable :list="dishes"
               ghost-class="ghost"
               class="list-group"
               v-bind="dragOptions"
               @start="move"
    >
      <transition-group type="transition" name="flip-list">
        <card class="wrap" v-for="dish in dishes" :dish="dish" :status="index" :key="dish.id"></card>
      </transition-group>
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
    "dishes",
    "index"
  ],
  components:{
    Draggable,
    rawDisplayer,
    card: card
  },
  methods:{

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
      switch (this.index){
        case "Income":
          DragClass = "";
          break;

        case "In Progress":
          DragClass = "Income"
          break;
        case "Ready":
          DragClass = ["Income","In Progress"];
          break;
      }
      return DragClass;
    },
    dragOptions() {
      return {
        animation: 200,
        group: {
          name: this.index,
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
