<template>
  <div>
    <div class="box" :style="{backgroundImage: 'url(' + bg + ')' }">
      <div class="son">
        <h1>
          新型冠状病毒
          <br />疫情实时动态
        </h1>
        <p>by很溜的老铁</p>
      </div>
    </div>

    <div class="number">
      <div class="headertop">统计</div>
      <div class="bottom">
        <div class="item">
          <p class="p1">{{confirmed}}</p>
          <p class="p2">确诊</p>
        </div>
        <div class="item">
          <p class="p1">---</p>
          <p class="p2">疑似</p>
        </div>
        <div class="item">
          <p class="p1">{{dead}}</p>
          <p class="p2">死亡</p>
        </div>
        <div class="item">
          <p class="p1">{{cured}}</p>
          <p class="p2">治愈</p>
        </div>
      </div>
    </div>
    <div class="map">
      <div class="headertop">疫情地图</div>
      <div class="mid">
        <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
      </div>
    </div>
    <div class="data">
      <div class="headertop">疫情数据</div>
      <div class="top">
        <div class="topitem">地区</div>
        <div class="topitem">确诊</div>
        <div class="topitem">死亡</div>
        <div class="topitem">治愈</div>
      </div>
      <div class="top top1" v-for="(item,index) in arr" :key="index">
        <div class="topitem">{{item.provinceShortName}}</div>
        <div class="topitem">{{item.confirmedCount}}</div>
        <div class="topitem">{{item.deadCount}}</div>
        <div class="topitem">{{item.curedCount}}</div>
      </div>
    </div>
    <div class="latest">
      <div class="headertop">实时动态</div>
      <div class="bottom">
        <div class="item" v-for="item in msg" :key="item.id">
          <p class="top">{{item.pubDateStr}}</p>
          <p class="mid">{{item.title}}</p>
          <p>{{item.summary}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bg from "@/assets/bg.jpg";
export default {
  name: "home",
  props: {},
  data() {
    return {
      arr: [],
      msg: [],
      bg,
      confirmed: 0,
      dead: 0,
      cured: 0,
      orgOptions: {},
      list: []
    };
  },
  computed: {},
  created() {
    axios.get("http://112.126.74.171:3000/msg").then(res => {
      this.arr = res.data.getAreaStat;
      this.arr.forEach(ele => {
        this.list.push({
          name: ele.provinceShortName,
          value: ele.currentConfirmedCount
        });
      });
      console.log(this.list, "list");
      this.msg = res.data.getTimelineServiceundefined;
      console.log(res);
      this.arr.forEach(ele => {
        this.confirmed += ele.confirmedCount;
        this.dead += ele.deadCount;
        this.cured += ele.curedCount;
      });
    });
  },
  mounted() {
    this.orgOptions = {
      backgroundColor:'#fff',
      series: [
        {
          type: "map",
          map: "china",
          data: this.list,
          label: {
            show: true,
            fontSize: 8
          }
        }
      ],
      tooltip: {
        formatter: function(params) {
          return `省份${params.data.name || ""}<br/>现存确诊${params.data
            .value || ""}`;
        }
      },
      visualMap: [
        {
          type: "piecewise",
          pieces: [
            { gt: 10000 },
            { gt: 1000, lte: 10000 }, // (1500, Infinity]
            { gt: 500, lte: 999 }, // (900, 1500]
            { gt: 100, lte: 499 }, // (310, 1000]
            { gt: 10, lte: 99 }, // (200, 300]
            { gt: 1, lte: 9 }, // (10, 200]
            { lt: 0 } // (-Infinity, 5)
          ],
          inRange: {
            color: ['#fff','#F8EED4', '#EBA692', '#D46C5D','#C44040','#7F2A2F','#501114'],
        }
        }
      ]
    };
  },
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 150px;
  background-size: 100% 100%;
  margin-bottom: 10px;
  .son {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    display: flex;
    padding-top: 20px;
    justify-content: space-around;
    flex-direction: column;
    font-size: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    h1 {
      padding: 0;
      margin: 0;
    }
  }
}
.number {
  // height:100px;
  background-color: #fff;
  padding-top: 10px;
  margin-bottom: 10px;
  .bottom {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    algin-items: center;
    .item {
      width: 15%;
      height: 45px;
      background-color: #f3f3f3;
      padding: 5px 10px;
      text-align: center;
      font-size: 16px;
      .p1 {
        color: #f60;
        padding-bottom: 5px;
      }
      .p2 {
        color: #888;
      }
    }
  }
}
.headertop {
  // padding-top:10px;
  height: 38px;
  width: calc(100% - 30px);
  margin: 0 auto;
  border-left: 4px solid #f60;
  border-bottom: 1px solid #efefef;
  color: black;
  font-size: 25px;
  box-sizing: border-box;
  padding-left: 10px;
  font-weight: 700;
  line-height: 30px;
}
.latest {
  background-color: #fff;
  padding-top: 10px;
  .bottom {
    width: calc(100% - 30px);
    margin: 0 auto;
    .item {
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #efefef;
      font-size: 16px;
      .top {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 5px;
      }
      .mid {
        font-size: 19px;
        font-weight: 700;
        color: #f60;
        margin-bottom: 5px;
      }
    }
  }
}
.map {
  background-color: #fff;
  padding-top: 10px;
  margin-bottom: 10px;
  .mid {
    height: 300px;
    margin: 10px auto;
    background-color: #efefef;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
.data {
  background-color: #fff;
  padding-top: 10px;
  margin-bottom: 10px;

  .top {
    width: calc(100% - 30px);
    margin: 10px auto 0;
    display: flex;
    justify-content: space-between;
    .topitem {
      font-size: 16px;
      height: 34px;
      width: 24.7%;
      background-color: #f60;
      color: #fcfcfc;
      line-height: 34px;
      text-align: center;
    }
  }
  .top1 {
    margin: 1px auto;
    .topitem {
      background-color: #f8f8f8;
      color: black;
    }
  }
}
</style>
