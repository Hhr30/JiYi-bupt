import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data';

// 中国全区域城市编码对应数据
export const ChinaAreaMap = {
    // 是省市二级联动数据（不带“全部”选项）
    provinceAndCityData,
    // 是省市区三级联动数据（不带“全部”选项）
    regionData,
    // 是省市区三级联动数据（带“全部”选项）
    provinceAndCityDataPlus,
    // 是省市区三级联动数据（带“全部”选项）
    regionDataPlus,
    // 是个大对象，属性是区域码，属性值是汉字 用法例如：CodeToText['110000']输出北京市 (常用)
    CodeToText,
    // 是个大对象，属性是汉字，属性值是区域码 用法例如：TextToCode['北京市'].code输出110000,TextToCode['北京市']['市辖区'].code输出110100,TextToCode['北京市']['市辖区']['朝阳区'].code输出110105
    TextToCode
}

// 作品类型对应集合
export const WorkTypeLabelMap = {
    1: '文学',
    2: '口述',
    3: '音乐',
    4: '戏剧',
    5: '曲艺',
    6: '舞蹈',
    7: '杂技',
    8: '美术',
    9: '建筑',
    10: '摄影',
    11: '电影',
    12: '类似摄制电影方法创作作品',
    13: '工程设计图，产品设计图',
    15: '地图，示意图',
    17: '模型',
    19: '录音作品',
    20: '录像作品',
    21: '其他作品',
}

// 创作性质对应集合
export const CreateTypeLableMap = {
    all: '全部',
    0: '原创',
    1: '改编',
    2: '翻译',
    3: '汇编',
    4: '注释',
    5: '整理',
    6: '其他',
}

// 著作权生产方式
export const CopyrightCreateTypeLabelMap = {
    all: '全部',
    0: '个人',
    1: '合作',
    2: '法人',
    3: '职务',
    4: '委托',
}