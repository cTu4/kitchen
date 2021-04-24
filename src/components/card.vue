<template>
  <div>
    <div :class="{red: check_delay}" class="dish white pointer" @click="card_click">
      <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" :style="{'width': width}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div class="info d-flex justify-content-between" >
        <div v-if="!check_delay" class="time t-10px"  :class="{'t-white': check_delay}">
          {{dish.time_placement * 1000 | moment("H:mm:ss")}}
        </div>
        <div v-if="check_delay" class="time t-10px"  :class="{'t-white': check_delay}">
           +{{delay}} SEC
        </div>
        <div class="number t-10px font-weight-500" :class="check_delay? 't-white op-3':'t-gray-op3'">
          TABLE {{dish.table_number}}
        </div>
        <!--              <div class="circle"></div>-->
      </div>
      <div class="name t-15px font-weight-bold" :class="{'t-white':check_delay}">
        {{dish.name}}
      </div>
      <div class="code t-11px" :class="check_delay? 't-white op-3':'t-gray-op3'">
        {{dish.code}}
      </div>
      <div class="comment t-11px " :class="check_delay? 'white':'grey t-white'">
        {{dish.comment}}
      </div>
      <div class="options d-flex">
        <div class="option t-11px" v-for="option in dish.options"  :class="{'t-white grey':check_delay}">
          {{option}}
        </div>
      </div>
    </div>
    <div class="buttons ">
      <div class="my_btn t-15px t-white font-weight-600">Start</div>
      <div class="my_btn t-15px t-white font-weight-600">Comment</div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import rawDisplayer from './rawDisplayer'

export default {
  name: 'app',
  props: [
    "dish"
  ],
  components:{

  },
  methods:{
    card_click(e){
      var card = $(e.target).closest('.dish');
      card.toggleClass('active');
      card.next().toggleClass('active');
      card.parent().siblings('.wrap').find('.dish').toggleClass('blur');

    },
    timer(){
        this.delay++;
        this.width = (Math.abs(this.delay) / this.dish.time) * 100;
        this.cssWidth = Math.round(this.width) + "%";
        if(this.dish.table_number === 3){
            console.log(this.width,this.cssWidth)
       }
    }
  },
  computed: {
      check_delay(){
          let place_time = moment(this.dish.time_placement * 1000);
          let end_time = moment(this.dish.time_placement * 1000 + this.dish.time * 1000);
          let now_time = moment();
          // console.log(place_time.format("H:mm:ss"), end_time.format("H:mm:ss"), now_time.format("H:mm:ss"));
        this.delay = now_time.diff(end_time,'seconds');
        setInterval(this.timer, 1000);
        return now_time.isAfter(end_time);
      }
  },
  data () {

    return {
      delay: 0,
      width: 0,
      cssWidth: 0
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
.dish{
  margin: 8px 0px;
  padding: 12px;
  border-radius: 10px;
  position: relative;
}
.dish.active{
  box-shadow: 0 2px 4px rgba(37,40,44,.02), 0 40px 80px rgba(37,40,44,.3);
}
.dish.blur{
  opacity: 0.3;
  /*pointer-events: none*/
}
.dish .progress{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  width: 80%;
  margin: 0 auto;
  border-radius: 0 0 12px 12px;
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
  border-radius: 100px;
  padding: 3px 7px;
  margin-top: 14px;
}
.comment.grey{
  background: #97A0AB;
}
.comment.white{
  /*background: rgba(37, 40, 44, 0.1);*/
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
.option.grey{
  background: rgba(255, 255, 255, 0.2);
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
