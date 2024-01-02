<template>
    <div class="info-container">
        <span class="title">{{title}}</span>
        <ul class="info-list" v-if="dataMap.length > 0">
            <li class="info-item" v-for="({key, value}, index) in dataMap" :key="index">
                <span class="info-text">{{`${key} : ${value}`}}</span>
            </li>
        </ul>
        <span class="info-placeholder" v-if="dataMap.length === 0">暂无信息</span>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'info-container',
        data() {
            return {}
        },
        props: {
            // 标题内容
            title: {
                type: String,
                default: '标题'
            },
            // 内容对应数据，例如 [{key: '用户名', value: 'asdf'}, {...}, ...]，为空的情况则渲染 “暂无信息”
            dataMap: {
                type: Array,
                default: () => []
            }
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    ul,li {
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
    .info-container {
        display: block;
        background: #F7F7F7;
        border-radius: 10px;
        max-width: 100%;
        margin: 0;
        padding: 29px 76px;

        .title {
            display: block;
            width: 100%;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            color: #7B7B7B;
            margin-bottom: 15px;
        }

        .info-list {
            display: block;
            width: 100%;

            .info-item {
                .info-text {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 30px;
                    color: #000000;
                }
            }
        }

        .info-placeholder {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #9E9E9E;
        }
    }
</style>