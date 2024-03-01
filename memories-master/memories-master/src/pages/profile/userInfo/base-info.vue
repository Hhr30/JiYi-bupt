<template>
    <el-container class="base-info-wrapper">
        <!-- 用来放置背景图片 -->
        <div class="background-image">
            <el-image class="image" src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg">
                <div slot="placeholder">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </div>

        <el-main class="main">
            <!-- 头像及其上传功能 -->
            <div class="avatar-wrapper">
                <el-avatar class="avatar" size="large" :src="avatarSrc"></el-avatar>
                <span class="user-name">{{name}}</span>
            </div>

            <!-- 基本信息 -->
            <info-container :title="'基本信息'" :dataMap="userInfoAlias" :style="{marginBottom: '12px'}"></info-container>

            <!-- 实名认证 -->
            <info-container :title="'实名认证'" :dataMap="realUserInfoAlias" :style="{position: 'relative'}">
                <div v-if="!isRealName" class="user-verified-btn" @click="userVerifiedHandle">
                    <span>去认证</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </info-container>
        </el-main>
    </el-container>
</template>

<script>
    import InfoContainer from './components/info-container.vue'
    import { mapState } from 'vuex'
    import * as API from '@/api'
    export default {
        name: 'base-info',
        inject: ['reload'],
        components: {
            InfoContainer
        },
        data() {
            return {
                // 头像url
                avatarSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            }
        },
        computed: {
            ...mapState(['userInfo', 'realUserInfo']),
            // 用户昵称
            name() {
                const userInfo = this.userInfo || {}
                return userInfo.username || '用户昵称'
            },
            // 基本用户信息
            userInfoAlias() {
                const userInfo = this.userInfo || {}
                return [
                    { key: '用户名', value: userInfo.username || '测试用户名' },
                    { key: '手机号', value: userInfo.phone || '234567890' },
                    { key: '注册时间', value: userInfo.registerTime || '2022-08-01' },
                ]
            },
            // 用户实名信息
            realUserInfoAlias() {
                const realUserInfo = this.realUserInfo || {}

                if (!realUserInfo.name || !realUserInfo.identificationNumber) {
                    return
                }

                return [
                    { key: '姓名', value: '**' + realUserInfo.name || '三' },
                    { key: '身份证号', value: '**************' + realUserInfo.identificationNumber || '0000' }
                ]
            },
            // 是否实名认证
            isRealName () {
                return !!this.realUserInfoAlias || false
            }
        },
        async created() {
            // 获取用户信息
            const userInfo = await API.getUserInfo()
            this.$store.commit('storageUserInfo', userInfo)

            // 获取用户实名信息
            const realUserInfo = await API.queryUser({ username: userInfo.username })
            this.$store.commit('storageRealUserInfo', realUserInfo)

            console.log(userInfo,realUserInfo)
        },
        methods: {
            // 点击去认证
            userVerifiedHandle() {
                this.$router.push('/userProfile/userInfo/verified')
                this.reload('verified')
            }
        }
    }
</script>

<style lang="less" scoped>
    .base-info-wrapper {
        position: relative;
        height: 100%;
        overflow-y: auto;

        .background-image {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 340px;
            overflow: hidden;

            &:after {
                display: block;
                content: '';
                width: 100%;
                height: 100%;
                background-color: #000;
                // filter: alpha(Opacity=60);
                opacity: 0.2;
            }

            .image {
                position: absolute;
                filter: blur(2px);
                width: 100%;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
        }

        .main {
            padding: 0;
            margin-top: 340px;
            background: #FFFFFF;
            position: relative;
            z-index: 100;
            overflow: visible;
            padding-top: 152px;
            padding-left: 107px;
            padding-right: 107px;
            padding-bottom: 107px;

            .avatar-wrapper {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%) translateY(-76px);
                width: 152px;
                height: 197px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .avatar {
                    width: 152px;
                    height: 152px;
                    border: 6px solid #FFFFFF;
                }

                .user-name {
                    text-align: center;
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 24px;
                    line-height: 29px;
                    color: #000000;
                }
            }

            .user-verified-btn {
                position: absolute;
                right: 44px;
                top: 50%;
                transform: translateY(-50%);
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 22px;
                color: #326CC2;
                cursor: pointer;
            }
        }
    }
</style>