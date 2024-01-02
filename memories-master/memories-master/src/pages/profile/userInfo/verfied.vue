<template>
    <el-container class="verfied-wrapper">
        <span v-if="this.verfiedState === 'verfied'" class="state-wrapper-verfied">已实名认证</span>

        <div v-else="this.verfiedState === 'verfied_no'" class="state-wrapper-verfied-no">
            <span class="title">实名认证</span>
            <div class="ruleform-back-wrapper">
                <el-form class="ruleForm-wrapper" label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item class="item" label="姓名" prop="name">
                        <el-input class="input" v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item class="item" label="手机号" prop="phone">
                        <el-input class="input" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item class="item" label="身份证号" prop="identificationNumber">
                        <el-input class="input"  v-model="ruleForm.identificationNumber" placeholder="请输入身份证号码"></el-input>
                    </el-form-item>
                    <el-form-item class="item el-button-wrapper">
                        <el-button class="el-button" type="primary" @click="completeVerfield">完成认证</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-container>
</template>

<script>
    import { mapState } from 'vuex'
    import * as API from '@/api'
    const verfiedState = {
        VERFIED: 'verfied', // 经查询用户信息后，已经完成实名认证
        VERFIED_NO: 'verfied_no', // 经过查询用户信息后，没有完成实名认证
        // VERFIED_ING: 'verfied_ing', // 正在实名认证
        VERFIED_END: 'verfied_end', // 实名认证结束
    }

    export default {
        name: 'verfied',
        components: {

        },
        data() {
            return {
                verfiedState: verfiedState.VERFIED_NO, // 默认没有完成实名认证
                ruleForm: {
                    name: '',
                    phone: '',
                    identificationNumber: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    identificationNumber: [
                        { required: true, message: '请输入身份证号码', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            ...mapState(['userInfo', 'realUserInfo']),
            // 是否实名认证
            isRealName () {
                const realUserInfo = this.realUserInfo || {}
                if (!realUserInfo.name || !realUserInfo.identificationNumber) {
                    return false
                } else {
                    return true
                }
            }
        },
        watch: {
            isRealName:{
                handler(newValue) {
                    if (newValue) {
                        this.verfiedState = verfiedState.VERFIED
                    }
                },
                immediate: true
            }
        },
        async created() {
            // 获取用户信息
            const userInfo = await API.getUserInfo()
            this.$store.commit('storageUserInfo', userInfo)

            // 获取用户实名信息
            const realUserInfo = await API.queryUser({ username: userInfo.username })
            this.$store.commit('storageRealUserInfo', realUserInfo)
        },
        methods: {
            async completeVerfield() {
                // API.realName()
                const { name, phone, identificationNumber } = this.ruleForm
                if (name && phone && identificationNumber) {
                    const res = await API.realName({
                        name, phone, identificationNumber
                    })
                    console.log(res)
                }
            }
        }
    }
</script>

<style lang="less">
    .verfied-wrapper {
        position: relative;

        .state-wrapper-verfied {
            display: inline-block;
            margin-top: 300px;
            margin-left: auto;
            margin-right: auto;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-size: 30px;
            line-height: 70px;
            color: #7E7E7E;
        }


        .state-wrapper-verfied-no {
            width: 100%;

            .title {
                display: block;
                text-align: center;
                margin-top: 200px;
                margin-bottom: 30px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
                font-size: 30px;
                line-height: 70px;
                color: #7E7E7E;
            }

            .ruleform-back-wrapper {
                width: 990px;
                background: #F1F1F1;
                border-radius: 13px;
                padding-top: 82px;
                padding-bottom: 30px;
                margin: 0 auto;

                .ruleForm-wrapper {
                    .el-form-item {
                        margin: 0 auto;
                        margin-bottom: 18px;
                    }

                    .item {
                        width: 462px;
                        position: relative;

                        label {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            font-family: 'Inter';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 20px;
                            line-height: 24px;
                            color: #797979;
                        }

                        .input {
                            width: 100%;
                            background: #FDFDFD;
                            border: 1px solid #C1C1C1;
                            border-radius: 7px;
                        }
                    }

                    .el-button-wrapper {
                        // margin-top: 50px;
                    }

                    .el-button {
                        width: 183.89px;
                        height: 54px;
                        border-radius: 4px;
                        font-family: 'Inter';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 19px;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
</style>