<template>
  <div class="ar_dataCon">
    <div class="ar_nav">
      <ul id="ar_ul">
        <li
          v-for="(item, index) in tabData"
          :key="index"
          @click="liClickMethod(item.name, index)"
        >
          {{ item.name }}
          <div class="line hide" :class="{ active: show === index }"></div>
        </li>
      </ul>
    </div>
    <div class="swiper-container">
      <div
        class="left wrap"
        :class="{ showDis: leftShow }"
        @click="moveMethod(87, 1)"
      ></div>
      <div class="swiper-wrapper">
        <transition-group
          tag="div"
          name="slide"
          class="swiper-con"
          :style="containerStyle"
        >
          <div
            class="swiper-slide"
            v-for="(item, index) in showColorArr.color"
            :key="index"
            @click="colorClickMethod(item, showColorArr.name, index)"
          >
            <!-- :style="{ backgroundColor: item }" -->
            <!-- style="background-image:url('../assets/img/apple_logo.png')" -->
            <span
              class="swiper-span"
              :style="`backgroundImage:url(${item})`"
              :class="{ activeStyle: currentIndex === index }"
            >
            </span>
            <div
              class="select hide"
              :class="{ active: currentIndex === index }"
            >
              <div class="selectContent"></div>
            </div>
          </div>
        </transition-group>
      </div>
      <div
        class="right wrap"
        :class="{ showDis: rightShow }"
        @click="moveMethod(87, -1)"
      ></div>
    </div>
  </div>
</template>
<script>
const config = require('../js/config').default
const SenseAR = require('../js/senseAR').default
export default {
  name: 'App',
  data() {
    return {
      message: '123',
      show: 0,
      currentIndex: 0,
      distance: 0,
      showColorArr: {},
      leftShow: true,
      rightShow: false,
      colorArr: config.colorArr,
      tabData: config.tabData,
      temp: null
    }
  },
  created() {},
  mounted() {
    this.showColorArr = this.colorArr[0]
    if (
      this.showColorArr.color.length < 6 ||
      this.showColorArr.color.length === 6
    ) {
      this.leftShow = true
      this.rightShow = true
    }
  },
  computed: {
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}px,0,0)`
      }
    }
  },
  methods: {
    liClickMethod(name, index) {
      this.show = index
      this.showColorArr = []
      this.distance = 0
      this.currentIndex = 0
      this.colorArr.filter(item => {
        if (item.name === this.tabData[index].name) {
          let obj = {
            name: '',
            color: []
          }
          obj.name = item.name
          item.color.map(itemIn => {
            obj.color.push(itemIn)
          })
          this.showColorArr = obj
        }
      })
      if (
        this.showColorArr.color.length < 6 ||
        this.showColorArr.color.length === 6
      ) {
        this.leftShow = true
        this.rightShow = true
      } else {
        this.leftShow = true
        this.rightShow = false
      }
    },
    moveMethod(offset, direction) {
      if (
        this.showColorArr.color.length < 6 ||
        this.showColorArr.color.length === 6
      ) {
        return
      } else {
        if (this.distance === 0 && direction === 1) {
          this.rightShow = false
          this.leftShow = true
          return
        } else if (
          Math.abs(this.distance) >
            Math.abs(644 - this.showColorArr.color.length * 107) &&
          direction === -1
        ) {
          this.rightShow = true
          this.leftShow = false
          return
        } else {
          this.rightShow = false
          this.leftShow = false
          this.distance += offset * direction
        }
      }
    },
    colorClickMethod(url, title, index) {
      this.currentIndex = index
      console.log(url, title, index)
      // this.SenseARMethods()
    },
    SenseARMethods() {
      var senseAr = new SenseAR()
      senseAr.init()
      console.log('v', senseAr)
    }
  }
}
</script>
