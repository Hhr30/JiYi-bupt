<template>
    <div class="filter-container">
        <div class="filter-table">
            <div class="filter-row" v-for="(option, index) in filterOptions" :key="index">
                <span class="filter-label">{{`${option.label} :`}}</span>
                <ul class="filter-option-list">
                    <li
                        class="filter-option-item"
                        v-for="(item, i) in option.value"
                        :key="i"
                        @click="clickOptionHandle(option, i)"
                        :class="{
                            selected: filterSelected[option.key] === item.key
                        }"
                    >
                        {{item.label}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'filter-manager',
        props: {
            filterOptions: {
                type: Array,
                default: () => ([
                    {
                        key: 'filterOption',
                        label: '筛选选项',
                        value: [
                            { key: 'all', label: '全部' },
                            { key: 'one', label: '选项一' },
                            { key: 'two', label: '选项二' },
                        ]
                    }
                ])
            },
            filterSelected: {
                type: Object,
                default: () => ({
                    filterOption: 'all'
                })
            }
        },
        model: {
            prop: 'filterSelected',
            event: 'clickOption'
        },
        data() {
            return {

            }
        },
        methods: {
            clickOptionHandle(option, index) {
                this.filterSelected[option.key] = option.value[index].key
                this.$emit('clickOption', this.filterSelected)
            }
        }
    }
</script>

<style lang="less" scoped>
    ul,li {
        list-style: none;
        padding: 0px;
        margin: 0px;
    }

    .filter-container {
        max-width: 100%;
        position: relative;

        .filter-table {
            width: 100%;

            .filter-row {
                width: 100%;
                display: flex;

                &:nth-child(n+2) {
                    margin-top: 14px;
                }

                .filter-label {
                    display: inline-block;
                    padding-right: 19px;
                    text-align: right;
                    flex: none;
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 20px;
                    color: #545454;
                    width: 100px;
                }

                .filter-option-list {
                    display: flex;
                    flex-wrap: wrap;

                    .filter-option-item {
                        vertical-align: middle;
                        display: inline-block;
                        margin: 0px 10px;
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 20px;
                        color: #969696;
                        flex: none;
                        flex-grow: 0;

                        &:hover, &.selected {
                            cursor: pointer;
                            font-family: 'Inter';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 19px;
                            color: #326CC2;
                            flex: none;
                            flex-grow: 0;
                        }
                    }
                }
            }
        }
    }
</style>