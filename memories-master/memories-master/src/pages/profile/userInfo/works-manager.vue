<template>
    <div class="works-manager">
        <!-- 筛选器 -->
        <filter-manager class="filter-manager" :filterOptions="filterOptions" v-model="filterSelected"></filter-manager>

        <!-- gallery -->
        <gallery-manager class="gallery-manager" :data="galleryData"></gallery-manager>
    </div>
</template>

<script>
    import FilterManager from '@/components/fitler-manager.vue'
    import GalleryManager from './components/gallery-manager.vue'
    import { WorkTypeLabelMap } from '@/types/LabelMap'
    export default {
        name: 'works-manager',
        components: {
            FilterManager,
            GalleryManager
        },
        data() {
            return {
                filterOptions: [
                    {
                        key: 'reviewStatus',
                        label: '作品状态',
                        value: [
                            { key: 'all', label: '全部' },
                            { key: 'option1', label: '上传作品' },
                            { key: 'option2', label: '作品存证' },
                            { key: 'option3', label: '版权注册' },
                            { key: 'option4', label: '登记确权' },
                        ]
                    },
                    {
                        key: 'approvalStatus',
                        label: '审核状态',
                        value: [
                            { key: 'all', label: '全部' },
                            { key: 'option1', label: '已完成' },
                            { key: 'option2', label: '审核中' },
                            { key: 'option3', label: '未通过' },
                            { key: 'option4', label: '草稿' },
                        ]
                    },
                    {
                        key: 'workType',
                        label: '作品类型',
                        value: [
                            { key: 'all', label: '全部' },
                            ...Object.entries(WorkTypeLabelMap).map(([key, value]) => ({key, label: value}))
                        ]
                    },
                ],
                filterSelected: {
                    reviewStatus: 'all',
                    approvalStatus: 'all',
                    workType: 'all',
                },
                galleryData: [
                    {
                        imageSrc: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        title: '作品名称',
                        labels: ['上传作品', '已完成', '文学']
                    },
                    {
                        imageSrc: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        title: '作品名称',
                        labels: ['上传作品', '已完成', '文学']
                    },
                    {
                        imageSrc: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        title: '作品名称',
                        labels: ['上传作品', '已完成', '文学']
                    },
                    {
                        imageSrc: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        title: '作品名称',
                        labels: ['上传作品', '已完成', '文学']
                    },
                    {
                        imageSrc: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        title: '作品名称',
                        label: ['上传作品', '已完成', '文学']
                    },
                    {
                        imageSrc: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        title: '作品名称',
                        labels: ['上传作品', '已完成', '文学']
                    },
                    {
                        imageSrc: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        title: '作品名称',
                        label: ['上传作品', '已完成', '文学']
                    },
                    {
                        imageSrc: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                        title: '作品名称',
                        labels: ['上传作品', '已完成', '文学']
                    },
                ]
            }
        }
    }
</script>
<style lang="less" scoped>
    .works-manager {
        padding: 60px;

        .filter-manager {
            padding-bottom: 50px;
        }
    }
</style>