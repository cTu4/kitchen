<template>
  <div>
      <div :class="{red: check_delay && status !== 'ready'}" class="dish white pointer" @click="card_click">
        <div v-if="!check_delay && status !== 'ready'" class="progress time-view" :style="{'display': width === 100?'none':'', 'background-color': 'rgba('+ color.r+','+color.g+','+color.b+',0.3'+')'}">
          <div class="progress-bar " role="progressbar" :style="{'width': width + '%', 'background-color': 'rgb('+ color.r+','+color.g+','+color.b+')', 'opacity': 1}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="info d-flex justify-content-between" >
          <div v-if="!check_delay || status === 'ready'" class="time t-10px"  :class="{'t-white': check_delay  }">
            {{dish.time_placement * 1000 | moment("H:mm:ss")}}
          </div>
          <div v-if="check_delay && status !== 'ready'" class="time t-10px"  :class="{'t-white': check_delay }">
            {{[delay,'seconds'] | duration('as', 'seconds')}} SEC
          </div>
          <div v-if="status !== 'ready'" class="number t-10px font-weight-500" :class="check_delay ? 't-white op-3':'t-gray-op3'">
            TABLE {{dish.table_number}}
          </div>
<!--          <div v-if="!check_delay && status === 'ready'"  class="diagram progress" :class="{over_50: prep >= 50}"   data-percent="10">-->
<!--            <div class="piece left" ></div>-->
<!--            <div class="piece right" :style="{'transform': 'rotate('+prep_perc+'deg)'}"></div>-->
<!--          </div>-->
        </div>
        <div class="name t-15px font-weight-bold" :class="{'t-white':check_delay }">
          {{dish.name}}
        </div>
        <div class="code t-11px" :class="check_delay? 't-white op-3':'t-gray-op3'">
          {{dish.code}}
        </div>
        <div class="comment t-11px " :class="check_delay ? 'white':'grey t-white'">
          {{dish.comment}}
        </div>
        <div class="options d-flex">
          <div class="option t-11px" v-for="option in dish.options"  :class="{'t-white grey':check_delay }">
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
import moment from 'moment';

export default {
  name: 'app',
  props: [
    "dish",
      "index",
    "status"
  ],
  components:{
    moment
  },
  methods:{
    progressView(){
      // let diagramBox = document.querySelectorAll('.diagram.progress');
      // diagramBox.forEach((box) => {
      //   let deg = (360 * this.prep / 100) + 180;
      //   if(box.dataset.percent >= 50){
      //     box.classList.add('over_50');
      //   }else{
      //     box.classList.remove('over_50');
      //   }
      //   // box.querySelector('.piece.right').style.transform = 'rotate('+deg+'deg)';
      // });
    },

    card_click(e){
      var card = $(e.target).closest('.dish');
      card.toggleClass('active');
      card.next().toggleClass('active');
      card.parent().siblings('.wrap').find('.dish').toggleClass('blur');

    },
    timer(){
        this.delay++;
        // this.prep -= 5;
        // this.prep_perc = (360 * this.prep / 100) + 180;
        console.log(this.prep);
        if(this.delay > 0){
          this.sec = this.delay % 60;
          this.min = Math.trunc(this.delay / 60);
          this.hour = Math.trunc(this.delay / 3600);
          this.delay_time = this.hour > 0? this.hour :'00'+ ":" + this.min  > 0? this.min:'00'+ ":" + this.sec;


        }



      if(this.width === 100){
        this.check_delay = true;
        // clearInterval(this.IntervalWidth);
      }
      else {
        this.width = Math.round(((this.dish.time - Math.abs(this.delay)) / this.dish.time) * 100);
        this.changeColor(this.width);

      }

    },
    changeColor(percentage){
      if(percentage <= 50){
          this.color.r = 255 * percentage / 50;
          this.color.g = 255;
      }
      else{
        this.color.r = 255;
        this.color.g = (255 * (100 - percentage) / 50);
      }
    },
    getDelay(){
      let place_time = moment(this.dish.time_placement * 1000);
      let end_time = moment(this.dish.time_placement * 1000 + this.dish.time * 1000);
      let now_time = moment();
      this.delay = now_time.diff(end_time,'seconds');
      this.IntervalWidth = setInterval(this.timer, 1000);

      this.check_delay = now_time.isAfter(end_time);
    },
  },
  beforeMount(){
    this.getDelay();
  },
  computed: {
      // check_delay(){
      //   this.IntervalWidth = setInterval(this.timer, 1000);
      //   return this.getDelay()
      // }
  },
  mounted(){
    this.check_ready = this.index === "Ready";
    // this.progressView();
  },
  data () {

    return {
      IntervalWidth: '',
      check_delay: '',
      prep: 100,
      prep_perc: 360,
      check_ready: false,
      delay: 0,
      sec: 0,
      min: 0,
      hour: 0,
      delay_time: '',
      width: 0,
      color: {
        r: 1,
        g: 255,
        b: 122
      },
      cssWidth: 0,
      options: {
        text: {
          color: '#FFFFFF',
          shadowEnable: true,
          shadowColor: '#000000',
          fontSize: 14,
          fontFamily: 'Helvetica',
          dynamicPosition: false,
          hideText: true
        },
        progress: {
          color: '#2dbd2d',
          backgroundColor: '#333333',
          inverted: false
        },
        layout: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          width: '80%',
          margin: '0 auto',
          borderRadius: '0 0 12px 12px',
          zeroOffset: 0,
          strokeWidth: 0,
          progressPadding: 0,
          type: 'line'
        }
      }
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
  touch-action: pinch-zoom;
}
.dish.active{
  box-shadow: 0 2px 4px rgba(37,40,44,.02), 0 40px 80px rgba(37,40,44,.3);
}
.dish.blur{
  opacity: 0.3;
  /*pointer-events: none*/
}
.dish .time-view{
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
  /*border-radius: 100px;*/
  text-align: center;
}
.diagram {
  width: 50px;
  height:50px;
  border-radius: 50%;
  background: #990;
  position: relative;
  overflow: hidden;
}
/*.diagram::before {*/
/*  content: '';*/
/*  display: block;*/
/*  position: absolute;*/
/*  top:20px;*/
/*  left:20px;*/
/*  right:20px;*/
/*  bottom:20px;*/
/*  !*border-radius: 50%;*!*/
/*  background: #ccc;*/
/*  z-index: 3;*/
/*  opacity: 1;*/
/*}*/
.diagram .piece {
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  position: absolute;
}
.diagram .piece::before {
  content: '';
  display: block;
  position: absolute;
  width: 50%;
  height: 100%;
}
.diagram .piece.left {
  transform: rotate(0deg);
  z-index: 2;
  border-radius: 50%; /* only FireFox < 75.0v (fix bug)*/
}
.diagram.over_50 .piece.left {
  transform: rotate(180deg);
}
.diagram .piece.right {
  transform: rotate(180deg);
  z-index: 1;
  border-radius: 50%; /* only FireFox < 75.0v (fix bug)*/
}
.diagram.over_50 .piece.right {
  transform: rotate(360deg);
}
.diagram .left::before {
  background: #059;
}
.diagram.over_50 .left::before {
  background: #990;
}
.diagram .right::before {
  background: #059;
}
.diagram .text {
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left:0;
  right:0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.diagram .text b {
  font-size: 72px;
}
.diagram .text span {
  font-size: 16px;
  display: block;
}

</style>
