<template>
    <div class="gallery-manager">
        <el-row class="gallery-row" v-for="(i, index) in colNum" :key="i">
            <el-col class="gallery-col" v-for="(item, k) in data.slice(index * 4, (index + 1) * 4)" :key="k" @click="clickWorkHandle">
                <el-image class="image" :src="item.imageSrc" :fit="'fill'"></el-image>
                <div class="gallery-content">
                    <span class="title">{{item.title}}</span>
                    <div class="label-wrapper">
                        <el-tag class="label" v-for="(label, j) in item.labels" :key="j" type="info" size="mini">{{label}}</el-tag>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'gallery-manager',
        data(){
            return {
            }
        },
        computed: {
            rowNum() {
                return Math.ceil(data.length / col)
            }
        },
        props: {
            // 一行 gallery 的列数
            colNum: {
                type: Number,
                default: 4
            },
            // gallery 数据
            /**
             * eg: data
             * [
             *    {
             *      // 图片的链接
             *      imageSrc: '...',
             *      // 标题内容
             *      title: '...',
             *      // 标签
             *      labels: ['上传作品', '已完成', '文字', ...]
             *    }
             * ]
             */
            data: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        methods: {
            clickWorkHandle() {
                console.log('asdfa')
                this.$message({
                    type: 'error',
                    message: '接口尚未准备完成，请等待后续更新！',
                    showClose: true
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .gallery-manager {
        padding: 0;
        margin: 0;
        flex-wrap: wrap;

        .gallery-row {
            display: flex;
            justify-content: space-between;
            padding-bottom: 20px;
            

            .gallery-col {
                width: 242px;
                height: 268px;
                flex: none;
                background: #E3E3E3;
                border-radius: 11px;
                overflow: hidden;
                box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .15);

                &:hover {
                    cursor: pointer;
                    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, .25);
                    transition: all .2s ease-in-out;
                }


                .image {
                    width: 242px;
                    height: 184px;
                }

                .gallery-content {
                    padding: 12px 12px;
                    padding-bottom: 0px;
                    

                    .title {
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 18px;
                        line-height: 22px;
                        color: #000000;
                        margin-bottom: 10px;
                    }

                    .label-wrapper {
                        .label {
                            font-family: 'Inter';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 17px;

                            color: #000000;
                            margin-right: 6px;
                        }
                    }
                }
            }
        }
    }
</style>