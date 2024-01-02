<template>
<!--作品总览-->
  <div style="position: absolute;width: 100%">
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <div style="margin-top: 60px" class="displayAllContent">
      <div ref="map" style="height:644px;width: 100%" ></div>   <!--调用map-->
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  name: "allWorks",
  components: {
    jyTabBar
  },
  data() {
    return {
      pathTitle: [
        {name: "数字展馆", url: "/exhibition/home"},
        {name: "作品总览", url: ""}
      ]
    }
  },
  methods: {
    getmap() {
      // 基于准备好的dom(myEchartPillar)，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.map);
      var mapName = 'china'
      var data = [{name: "北京", value: 27},    //省份数据
        {name: "天津", value: 42},
        {name: "河北", value: 102},
        {name: "山西", value: 81},
        {name: "内蒙古", value: 47},
        {name: "辽宁", value: 67},
        {name: "吉林", value: 82},
        {name: "黑龙江", value: 66},
        {name: "上海", value: 24},
        {name: "江苏", value: 92},
        {name: "浙江", value: 114},
        {name: "安徽", value: 109},
        {name: "福建", value: 116},
        {name: "江西", value: 91},
        {name: "山东", value: 119},
        {name: "河南", value: 137},
        {name: "湖北", value: 116},
        {name: "湖南", value: 114},
        {name: "重庆", value: 91},
        {name: "四川", value: 125},
        {name: "贵州", value: 62},
        {name: "云南", value: 83},
        {name: "西藏", value: 9},
        {name: "陕西", value: 80},
        {name: "甘肃", value: 56},
        {name: "青海", value: 10},
        {name: "宁夏", value: 18},
        {name: "新疆", value: 67},
        {name: "广东", value: 123},
        {name: "广西", value: 59},
        {name: "海南", value: 14},
      ];

      var geoCoordMap = {};
      var toolTipData = [{name: "北京", value: [{name: "地区", value: 95}]},
        {name: "天津", value: [{name: "文科", value: 22}]},
        {name: "河北", value: [{name: "文科", value: 60}]},
        {name: "山西", value: [{name: "文科", value: 40}]},
        {name: "内蒙古", value: [{name: "文科", value: 23}]},
        {name: "辽宁", value: [{name: "文科", value: 39}]},
        {name: "吉林", value: [{name: "文科", value: 41}]},
        {name: "黑龙江", value: [{name: "文科", value: 35}]},
        {name: "上海", value: [{name: "文科", value: 12}]},
        {name: "江苏", value: [{name: "文科", value: 47}]},
        {name: "浙江", value: [{name: "文科", value: 57}]},
        {name: "安徽", value: [{name: "文科", value: 57}]},
        {name: "福建", value: [{name: "文科", value: 59}]},
        {name: "江西", value: [{name: "文科", value: 49}]},
        {name: "山东", value: [{name: "文科", value: 67}]},
        {name: "河南", value: [{name: "文科", value: 69}]},
        {name: "湖北", value: [{name: "文科", value: 60}]},
        {name: "湖南", value: [{name: "文科", value: 62}]},
        {name: "重庆", value: [{name: "文科", value: 47}]},
        {name: "四川", value: [{name: "文科", value: 65}]},
        {name: "贵州", value: [{name: "文科", value: 32}, {name: "理科", value: 30}]},
        {name: "云南", value: [{name: "文科", value: 42}]},
        {name: "西藏", value: [{name: "文科", value: 5}]},
        {name: "陕西", value: [{name: "文科", value: 38}]},
        {name: "甘肃", value: [{name: "文科", value: 28}]},
        {name: "青海", value: [{name: "文科", value: 5}]},
        {name: "宁夏", value: [{name: "文科", value: 10}]},
        {name: "新疆", value: [{name: "文科", value: 36}]},
        {name: "广东", value: [{name: "文科", value: 63}]},
        {name: "广西", value: [{name: "文科", value: 29},]},
        {name: "海南", value: [{name: "文科", value: 8}]},
      ];
      /*获取地图数据*/
      myChart.showLoading();
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

      });
      var max = 480,
          min = 9; // todo
      var maxSize4Pin = 100,
          minSize4Pin = 20;

      var convertData = function(data) {    //进行数据处理
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
//指定图表的配置项和数据，绘制图表
      myChart.setOption({

        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            var toolTiphtml = ''
            if (typeof(params.value)[2] == "undefined") {

              for (let i = 0; i < toolTipData.length; i++) {
                if (params.name === toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ':<br>'
                  for (let j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                  }
                }
              }
              console.log(toolTiphtml)
              // console.log(convertData(data))
              return toolTiphtml;
            } else {
              for (let i = 0; i < toolTipData.length; i++) {
                if (params.name === toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ':<br>'
                  for (let j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml += toolTipData[i].value[j].name + ':' + toolTipData[i].value[j].value + "<br>"
                  }
                }
              }
              console.log(toolTiphtml)
              // console.log(convertData(data))
              return toolTiphtml;
            }
          }
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        visualMap: {
          show: true,
          min: 0,
          max: 200,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {

            color: ['#00467F', '#A5CC82'] // 蓝绿


          }
        },

        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077',
            },
            emphasis: {
              areaColor: '#2B91B7',
            }
          }
        },
        series: [{
          name: '散点',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(data),
          symbolSize: function(val) {
            return val[2] / 10;
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: '#05C3F9'
            }
          }
        },
          {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: data
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function(val) {
              var a = (maxSize4Pin - minSize4Pin) / (max - min);
              var b = minSize4Pin - a * min;
              b = maxSize4Pin - a * max;
              return a * val[2] + b;
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9,
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#F62157', //标志颜色
              }
            },
            zlevel: 6,
            data: convertData(data),
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function(a, b) {
              return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'yellow',
                shadowBlur: 10,
                shadowColor: 'yellow'
              }
            },
            zlevel: 1
          },

        ]
      });



      //解决自适应
      setTimeout(function() {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }, 500);

    }
  },
  mounted() {
    this.getmap()
  }
}
</script>

<style scoped>
.displayAllContent{
  width: 100%;
  min-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>