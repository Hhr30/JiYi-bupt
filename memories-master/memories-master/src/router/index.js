import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'

//噢淦
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const ArtWorkMenu = () => import("../pages/DigitalArtwork/DegitalArtWorkMenu")   //菜单
const DigitalArtWork = () => import("../pages/DigitalArtwork/DigitalArtwork.vue")   //作品上传等的总界面
const Upload = () => import("../pages/DigitalArtwork/Upload/Upload.vue")            //作品上传
const Deposit = () => import("../pages/DigitalArtwork/Deposit/Deposit.vue")         //作品存证
const DepoInfo = () => import("../components/DigitalArtwork/Deposit/workInfo")      //作品存证  填写作品信息
const DepoauthorInfo = () => import("../components/DigitalArtwork/Deposit/authorInfo")   //作品存证 编辑作品信息
const DepoConfirm = () => import("../components/DigitalArtwork/Deposit/infoConfirm")     //作品存证 信息确认
const DepoComplete = () => import("../components/DigitalArtwork/Deposit/complete")       //作品存证 完成上传
const DepositAdd = () => import("../pages/DigitalArtwork/Deposit/DepositAdd.vue")
const Enroll = () => import ("../pages/DigitalArtwork/Enroll/Enroll.vue")   //版权注册
const Register = () => import("../pages/DigitalArtwork/Register/Register.vue")             //登记确权  发起登记确权 页面导航
const RegisterRight = () => import("../components/DigitalArtwork/Register/registerRights") //登记确权  发起登记确权新界面
const RegisterAdd = () => import("../components/DigitalArtwork/Register/Register")         //登记确权  发起登记确权 填写主体信息
const RegisterObj = () => import("../components/DigitalArtwork/Register/objectInfo")       //登记确权  发起登记确权 填写客体信息
const RegisterMat = () => import("../components/DigitalArtwork/Register/Materials")        //登记确权  发起登记确权 上传证明材料
const RegisterCom = () => import("../components/DigitalArtwork/Register/complete")         //登记确权  发起登记确权 完成上传
const RegisterMain = () => import("../pages/DigitalArtwork/Register/RegisterMain.vue")     //登记确权  编辑主体信息 页面导航
const RegisterBase = () => import("../components/DigitalArtwork/Register/SubjectInfo")     //登记确权  编辑主体信息 填写基本信息
const RegisterRefi = () => import("../components/DigitalArtwork/Register/refineMaterials") //登记确权  编辑主体信息 完善身份证明材料
const RegisterColl = () => import("../components/DigitalArtwork/Register/RightsCollection")//登记确权  编辑主体信息 填写权利集合

const Profile = () => import("../pages/DigitalArtwork/Profile/Profile.vue")  //我的
//作品上传
const uploadInfo = () => import("../components/DigitalArtwork/Upload/uploadContent")  //新作品上传
const WorkInfo = () => import("../components/DigitalArtwork/Upload/UploadContent1")  //作品上传 填写作品信息
const EnsureInfo = () => import("../components/DigitalArtwork/Upload/UploadContent2") //作品上传 信息确认
const UploadComplete = () => import("../components/DigitalArtwork/Upload/UploadContent3")  //作品上传 上传完成
//版权注册
const Copyrights = () => import("../components/DigitalArtwork/Enroll/copyrights")   //版权注册
const CopyrightUnit = () => import("../components/DigitalArtwork/Enroll/CopyrightUnit")   //版权注册 版权单元
const ConstraintInfo = () => import("../components/DigitalArtwork/Enroll/ConstraintInfo")  //版权注册 约束信息
const CopyrightStatus = () => import("../components/DigitalArtwork/Enroll/CopyrightStatus")   //版权注册 版权单元
const CopyrightFinish = () => import("../components/DigitalArtwork/Enroll/CopyrightFinish")    //版权注册 完成

const Home = () => import("../pages/home/home")//首页
const Exhibition = () => import("../pages/exhibition/exhibition")   //数字展馆
const ExhibitionHome = () => import("../components/Exhibition/home/home")   //数字展馆的首页
const ExhiAllWorks = () => import("../pages/exhibition/allWorks/allWorks")  //作品相关路由
const ExhiWorksDisplay = () => import("../components/Exhibition/allWorks/allWorks")    //作品总览
const ExhiWorks = () => import("../pages/exhibition/works/works")  //具体作品
const ExhiDetails = () => import("../components/Exhibition/works/details")  //已发售/未发售
const Welfare = () => import("../pages/exhibition/welfare/welfare")   //公益追溯
const WelfareInfo = () => import("../components/Exhibition/welfare/welfareInfo")  //公益追溯详情界面
const DigitalMall = () => import("../pages/exhibition/digitalMall/digitalMall")   //数字商城

const Enter = () => import("../pages/exhibition/enter/enter")   //走进纪艺
const EnterMenu = () => import("../components/Enter/enterMenu")    //走进纪艺  传承人/创作者
const Inheritor = () => import("../components/Enter/inheritor")   //我是传承人
const Campus = () => import("../components/Enter/Campus")         //我是高校
const Program = () => import("../components/Enter/knowProgram")   //了解程序
const AddWeChat = () => import("../components/Enter/addWeChat")   //添加微信页面
const Creator = () => import("../components/Enter/creator")   //我是创作者
const Creators = () => import("../components/DigitalArtwork/creators")   //作品相关表单初始
const UserProfile = () => import("../pages/profile/profile") //用户相关
const UserLogin = () => import("../pages/profile/login/login")  //登录
const UserRegister = () => import("../pages/profile/register/register")  //注册
const nonHeritagePlanet = () => import("../pages/nonHeritagePlanet/nonHeritagePlanet")

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: "/home",      //首页
    component: Home,
    name: "首页"
  },
  {
    path: "/exhibition",
    component: Exhibition,
    children: [
      {
        path: '',
        redirect: 'exhibitionHome'
      },
      {
        path: 'exhibitionHome',
        component: ExhibitionHome,     //数字展馆首页 即含四大类的界面
        name: "数字展馆"
      },
      {
        path: 'allWorks',
        component: ExhiAllWorks,   //作品总览
        children: [
          {
            path: '',
            redirect: 'worksDisplay'
          },
          {
            path: 'worksDisplay',
            component: ExhiWorksDisplay,   //真的总览
            name: "作品总览"
          },
          {
            path: 'works',
            component: ExhiWorks,  //具体作品
            children: [
              {
                path: 'details',
                component: ExhiDetails,   //已发售未发售,
                name: "作品总览-详情"
              }
            ]
          }
        ]
      },
      {
        path: 'welfare',
        component: Welfare,         //公益追溯
        name: "公益追溯"
      },
      {
        path: 'welfare/info',
        component: WelfareInfo,
        name: "公益追溯详情"
      },
      {
        path: 'digitalMall',
        component: DigitalMall,     //数字商城
        name: "数字商城",
        children: [

        ]
      },
      {
        path: 'enter',
        component: Enter,           //走进纪艺
        children: [
          {
            path: "",
            redirect: "menu"
          },
          {
            path: "menu",
            component: EnterMenu,
            name: "走进纪艺",
          },
          {
            path: 'inheritor',      //传承人
            component: Inheritor,
            name: "走进纪艺-我是传承人"
          },
          {
            path: 'campus',    //我是高校
            component: Campus,
            name: "走进纪艺-我是高校"
          },
          {
            path: 'program',   //了解程序
            component: Program,
            name: "走进纪艺-了解程序"
          },
          {
            path: 'weChat',          //添加微信
            component: AddWeChat,
            name: "走进纪艺-添加微信"
          },
          {
            path: 'creator',
            component: Creator,       //创作者
            name: "我是创作者"
          }
        ]
      },
      
    ]
  },
  {
    path: '/userProfile',
    component: UserProfile,
    children: [
      { path: 'login', component: UserLogin, name: '登录' },
      {
        path: 'userInfo',
        component: () => import("../pages/profile/userInfo/index.vue"),
        children: [
          { path: '', component: () => import("../pages/profile/userInfo/base-info.vue"), name: '我的 - 基本信息' },
          { path: 'verified', component: () => import("../pages/profile/userInfo/verfied.vue"), name: '我的 - 实名认证' },
          { path: 'worksManager', component: () => import("../pages/profile/userInfo/works-manager.vue"), name: '我的 - 作品管理' },
          { path: 'userCollection', component: () => import("../pages/profile/userInfo/works-manager.vue"), name: '我的 - 我的藏品' },
        ]
      }
    ]
  },
  {
    path: '/register',         //用户注册
    component: UserRegister,
    name: "注册"
  },
  {
    path: "/DigitalArtwork",
    component: ArtWorkMenu,   //路由
    children: [     //子路由
      {
        path: '',
        redirect: "Work"
      },
      {
        path: 'Work',
        component: DigitalArtWork,
        name: "创作者家园"
      },
      {
        path: 'creators',
        component: Creators,
        name: "创作者家园"
      },
      {
        path: 'upload',   //上传
        component: Upload,
        name: "作品上传"
      },
      {
        path: 'deposit',
        component: Deposit,
        name: "作品存证"
        // children: [
        //   {
        //     path: '',
        //     redirect: "workInfo"
        //   },
        //   {
        //     path: "workInfo",
        //     component: DepoInfo    //填写作品信息
        //   },
        //   {
        //     path: "authorInfo",
        //     component: DepoauthorInfo   //编辑作者信息
        //   },
        //   {
        //     path: "confirmInfo",
        //     component: DepoConfirm     //信息确认
        //   },
        //   {
        //     path: "complete",
        //     component: DepoComplete     //完成上传
        //   }
        // ]
      },
      {
        path: 'enroll',  //注册
        component: Copyrights,
        name: "版权注册"
        // component: Enroll,
        // children: [
        //   {
        //     path: '',
        //     redirect: 'unit'
        //   },
        //   {
        //     path: 'unit',            //单元
        //     component: CopyrightUnit
        //   },
        //   {
        //     path: 'info',      //约束信息
        //     component: ConstraintInfo
        //   },
        //   {
        //     path: 'status',     //版权状态
        //     component: CopyrightStatus
        //   },
        //   {
        //     path: 'finish',
        //     component: CopyrightFinish
        //   }
        // ]
      },
      {
        path: "registerRight",             //登记确权  发起确权登记
        component: RegisterRight,
        name: "登记确权"
        // children: [
        //   {
        //     path: '',
        //     redirect: 'add'
        //   },
        //   {
        //     path: 'add',
        //     component: RegisterAdd        //填写主体信息
        //   },
        //   {
        //     path: 'objectInfo',           //填写客体信息
        //     component: RegisterObj
        //   },
        //   {
        //     path: 'materials',
        //     component: RegisterMat        //上传证明材料
        //   },
        //   {
        //     path: 'complete',             //完成上传
        //     component: RegisterCom
        //   }
        // ]
      },
      // {
      //   path: 'registerMain',              //确权登记 编辑主体信息
      //   component: RegisterMain,
      //   children: [
      //     {
      //       path: '',
      //       redirect: 'basicInfo'
      //     },
      //     {
      //       path: 'basicInfo',             //填写基本信息
      //       component: RegisterBase
      //     },
      //     {
      //       path: 'refineMat',
      //       component: RegisterRefi        //完善身份证明材料
      //     },
      //     {
      //       path: 'collection',
      //       component: RegisterColl        //填写权利集合
      //     }
      //   ]
      // },
      {                            //我自己？？？
        path: 'profile',
        component: Profile,
        name: "我的"
      }
    ]
  },
  {
    path: '/nonHeritagePlanet/nonHeritagePlanet',   //非遗星球
    component: nonHeritagePlanet,
    name: "非遗星球"
  },
]

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部, 并添加动画效果
    return { offset: { top: 0 }, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  // 如果没有token信息，则需要进行登录
  // 无需登录就可以浏览的页面名单
  const noLoginPathList = [
    '/',
    '/home',
    '/userProfile/login',
    '/register',
    '/exhibition/exhibitionHome',
    '/exhibition/allWorks/worksDisplay',
    '/exhibition/allWorks/works',
    '/exhibition/welfare',
    '/exhibition/welfare/info',
    '/exhibition/digitalMall',
    '/exhibition/enter/menu',
    '/exhibition/enter/inheritor',
    '/exhibition/enter/campus',
    '/exhibition/enter/program',
    '/exhibition/enter/weChat',
    '/exhibition/enter/creator',
    '/DigitalArtwork/Work',
    '/nonHeritagePlanet/nonHeritagePlanet',
  ]
  const isAuthenticated = VueCookies.isKey('token')
  if (!isAuthenticated && noLoginPathList.indexOf(to.path) === -1 ) {
    next({ path: '/userProfile/login' })
  } else {
    document.title = to.name
    next()
  }
})

export default router
