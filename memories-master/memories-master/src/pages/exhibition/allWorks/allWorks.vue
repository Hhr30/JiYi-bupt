<template>
<!--数字展馆作品总览路由-->
    <el-container class="all-works-wrapper">
        <el-header class="header">
            <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
        </el-header>
        <el-container class="main-wrapper">
            <el-main class="main">
                <div></div>

                <!-- 作品展示 -->
                <div class="creation-list-wrapper">
                    <!-- 筛选列表 -->
                    <filter-manager
                        class="creation-list-filter"
                        :filterOptions="filterOptions"
                        :filterSelected="filterSelected"
                        @clickOption="clickFilterOptionHandle"
                    ></filter-manager>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import FilterManager from "@/components/fitler-manager.vue";
import * as API from '@/api'
import { WorkTypeLabelMap } from '@/types/LabelMap'


export default {
    name: "allWorks",
    components: {
        jyTabBar,
        FilterManager
    },
    data() {
        return {
            pathTitle: [
                {name: "数字展馆", url: "/exhibition/home"},
                {name: "作品总览", url: ""}
            ],
            filterOptions: [
                {
                    key: 'area',
                    label: '地域',
                    value: [
                        { key: 'all', label: '全部' },
                        { key: 'dongbei', label: '东北' },
                        { key: 'huabei', label: '华北' },
                        { key: 'huazhong', label: '华中' },
                        { key: 'huadong', label: '华东' },
                        { key: 'huanan', label: '华南' },
                        { key: 'xibei', label: '西北' },
                        { key: 'xinan', label: '西南' },
                    ]
                },
                {
                    key: 'createDate',
                    label: '发布时间',
                    value: [
                        { key: 'all', label: '全部' },
                        { key: 'yizhou', label: '一周内' },
                        { key: 'yiyue', label: '一月内' },
                        { key: 'yinian', label: '一年内' },
                        { key: 'sannian', label: '三年内' },
                    ]
                },
                {
                    key: 'workType',
                    label: '非遗类型',
                    value: [
                        { key: 'all', label: '全部' },
                        ...Object.entries(WorkTypeLabelMap).map(([key, value]) => ({ key, label: value }))
                    ]
                }
            ],
            filterSelected: {
                area: 'all',
                createDate: 'all',
                workType: 'all'
            }
        }
    },
    async beforeMount() {
        const creationList = await API.getCreationList()
        console.log(creationList)

    },
    methods: {
        clickFilterOptionHandle() {
            console.log(this.filterSelected)
        }
    }
}
</script>

<style lang="less" scoped>
    .all-works-wrapper {
        position: relative;

        .header {
            padding: 0;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
        }

        .main-wrapper {
            padding-top: 60px;

            .main {
                padding: 0;
                margin: 0 auto;
                max-width: 1440px;
                width: 100%;
            }
        }
    }
</style>