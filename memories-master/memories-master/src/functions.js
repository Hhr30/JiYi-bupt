//城市

//处理城市数据
function Province(name, cities, proNum) {   //构造器函数
  this.name = name
  this.cities = cities
  this.proNum = proNum          //城市号码
}
function Cities(name, cities, proNum) {      //构造器函数
  this.name = name
  this.cities = cities
  this.proNum = proNum         //城市号码
}
function City(name, proNum) {
  this.name = name
  this.proNum = proNum         //城市号码
}
import province from "./province.json"

export function createProvince() {
  let newPro = province['province']
  let resPro = []
  for(let i = 0; i < newPro.length; i++) {
    let Pro = new Province(newPro[i].name,[])
    resPro.push(Pro)
    for(let j = 0; j < newPro[i].cities.length; j++) {
      let myCities = new Cities(newPro[i].cities[j].name, [])
      resPro[i]['cities'].push(myCities)
      for(let k = 0; k < newPro[i]['cities'][j]['cities'].length; k++) {
        let myCount = new City(newPro[i]['cities'][j]['cities'][k])
        resPro[i]['cities'][j]['cities'].push(myCount)
      }
    }
  }
  return resPro
}