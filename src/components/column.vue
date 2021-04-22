<template>
  <div class="column d-flex flex-column">
    <div class="title">
        <span class="text t-24px font-weight-700">{{index}}</span>
        <span class="summ t-11px t-gray-op3">{{Object.getOwnPropertyNames(dishes).length - 1}}</span>
    </div>
    <div class="subtitle">
      <span class="text">All</span>
      <span class="summ">{{Object.getOwnPropertyNames(dishes).length - 1}}</span>
    </div>
    <draggable :list="dishes"
               ghost-class="ghost"
               group="people"
               class="list-group"
               v-bind="dragOptions"
               @start="move"
    >
      <transition-group type="transition" name="flip-list">
        <div class="wrap" v-for="dish in dishes" :key="dish.table_number">
          <div class="dish white pointer" @click="card_click">
            <div class="info d-flex justify-content-between">
              <div class="time t-10px">
                {{dish.time_placement}}
              </div>
              <div class="number t-10px t-gray-op3">
                TABLE {{dish.table_number}}
              </div>
            </div>
            <div class="name t-15px font-weight-bold">
              {{dish.name}}
            </div>
            <div class="code t-11px t-gray-op3">
              {{dish.code}}
            </div>
            <div class="comment t-11px t-white">
              {{dish.comment}}
            </div>
            <div class="options d-flex">
              <div class="option t-11px" v-for="option in dish.options">
                {{option}}
              </div>
            </div>
          </div>
          <div class="buttons ">
            <div class="my_btn t-15px t-white font-weight-600">Start</div>
            <div class="my_btn t-15px t-white font-weight-600">Comment</div>
          </div>
        </div>
      </transition-group>
    </draggable>


  </div>

</template>

<script>
import Draggable from 'vuedraggable'
import rawDisplayer from './rawDisplayer'

export default {
  name: 'app',
  props: [
    "dishes",
    "index"
  ],
  components:{
    Draggable,
    rawDisplayer
  },
  methods:{
    card_click(e){
      var card = $(e.target).closest('.dish');
      card.toggleClass('active');
      card.next().toggleClass('active');
      card.parent().siblings('.wrap').find('.dish').toggleClass('blur');

    },
    move(e){
      console.log($(e.item).find('.dish.active'));
      let card = $(e.item).find('.dish.active');
      card.toggleClass('active');
      card.next().toggleClass('active');
      card.parent().siblings('.wrap').find('.dish').toggleClass('blur');

    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
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
  .wrap{
    position: relative;
  }
  .dish{
    margin: 4px 0px;
    padding: 12px;
    border-radius: 10px;
  }
  .dish.active{
    box-shadow: 0 2px 4px rgba(37,40,44,.02), 0 40px 80px rgba(37,40,44,.3);
  }
  .dish.blur{
    opacity: 0.3;
    /*pointer-events: none*/
  }
  .white{
    background: #FFFFFF;
  }
  .red{
    background: #C5301C;
  }
  .name{
    margin-top: 8px;
  }
  .code{
    margin-top: 4px;
  }
  .comment{
    background: #97A0AB;
    border-radius: 100px;
    padding: 3px 7px;
    margin-top: 14px;

  }
  .options{
    margin-top: 12px;
  }
  .option{
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 3px 4px;
    margin: 0 3px;
  }
  .buttons{
    display: none;
  }
  .buttons.active{
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: -92px;
    right: 0;
    z-index: 1;
  }
  .my_btn{
    cursor: pointer;
    background: #1A79EE;
    box-shadow: 0px 2px 4px rgba(37, 40, 44, 0.02), 0px 40px 80px rgba(37, 40, 44, 0.3);
    padding: 10px;
    min-width: 144px;
    margin-top: 8px;
    border-radius: 100px;
    text-align: center;
  }
</style>
