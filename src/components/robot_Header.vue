<template>
  <!--	头部-->
	<header>
		<div>
			<img src="../assets/img/logo.png" alt="">
			<div>
				<div>
					<ul>
						<li><router-link to="/home" :class="{ hover: $route.path === '/home' }" exact-active-class="hover">{{ $t('menu.Home') }}</router-link></li>
                        <li><router-link to="/news" :class="{ hover: $route.path === '/news' }" exact-active-class="hover">{{ $t('menu.News') }}</router-link></li>
                        <li><router-link to="/faq" :class="{ hover: $route.path === '/faq' }" exact-active-class="hover">{{ $t('menu.FAQ') }}</router-link></li>
					</ul>
				</div>
				<div class="language_box btn">
					<button @click="changeLanguage('en')">English</button>
					<button @click="changeLanguage('zh-cn')">中文</button>
				</div>
				<div class="left btn" @click="toggleAside" :class="{left_dh :isLeft_dh}">
					<div>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div class="search_btn btn" @click="toggleSearch" >
					<div>
						<img src="../assets/img/search2.png" alt="" sizes="" srcset="">
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import PubSub from 'pubsub-js';
import router from '@/router/index.js';
export default {
    name:'robot_Header',
    data(){
        return{
            isLeft_dh:false
        }
    },
    mounted(){
        // 监听路由变化，路由变化时关闭侧边栏按钮状态
        this.routeToken = router.afterEach(() => {
            this.isLeft_dh = false;
        });
    },
    beforeDestroy(){
        // 移除路由监听
        this.routeToken();
    },
    methods:{
        toggleAside(){
            PubSub.publish('toggleAside')
            this.isLeft_dh = !this.isLeft_dh
        },
        toggleSearch(){
            PubSub.publish('toggleSearch')
        },
        changeLanguage(lang) {
            this.$i18n.locale = lang  // 切换语言
        },
    }
}
</script>

<style scoped>
    /*头部*/
    header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        position: sticky;
        top: 0;
        height: 100px;
        background: white;
        z-index: 3;
        box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    }

    header>div{
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;
        height: 100%;
    }

    header>div>img{
        width: 20%;
        filter: drop-shadow(10px 10px 4px rgba(0,0,0,0.2));
    }

    header>div>div>div>ul{
        display: flex;
        margin-right: 330px;
    }

    header>div>div>div>ul>li>a{
        font-size: 24px;
        margin: 0 10px;
        position: relative;
        transition: .5s;
        color: rgba(14,41,81,1.00);
    }

    header>div>div>div>ul>li>a:hover{
        color:rgba(182,182,183,1.00);
    }

    header>div>div>div>ul>li>a:hover::after{
        transform: scale(1,1);
        transform-origin: left;
    }

    .hover{
        color:rgba(182,182,183,1.00);
    }

    .hover::after{
        transform: scale(1,1);
        transform-origin: left;
    }

    header>div>div>div>ul>li>a::after{
        width: 100%;
        position: absolute;
        bottom: -2px;
        left: -0.5px;
        display: block;
        background: rgba(182,182,183,1.00);
        transform-origin: right;
        transform: scale(0,1);
        transition: transform 0.7s;
        content: '';
        height: 2px;
    }

    .btn{
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-left: 1px solid rgba(182,182,182,1.00);
    }

    .btn>*{
        cursor: pointer;
    }

    .left{
        right: 100px;
    }

    .left div{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .left span{
        width: 35px;
        height: 5px;
        margin: 4px auto;
        display: block;
        background: rgba(13,41,81,1.00);
        border-radius: 10px;
        transition: 1s cubic-bezier(0.2,1,0.2,1);
    }

    .left_dh span:nth-of-type(1){
        transform: rotate(-45deg);
    }
    .left_dh span:nth-of-type(2){
        transform: rotate(-135deg);
        margin-top: -8px;
        margin-bottom: -9px;
    }
    .left_dh span:nth-of-type(3){
        transform: rotate(-225deg);
    }

    .search_btn>div{
        width: 35px;
        height: 35px;
        background-color: rgba(13,41,81,1.00);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.5s ease;
    }

    .search_btn>div:hover{
        transform: translateY(-3px);
    }

    .search_btn>div>img{
        width: 70%;
    }

    .language_box{
        right: 200px;
        gap:10px;
    }

    .language_box button{
        background: none;
        border: 2px solid rgba(13,41,81,1.00);
        border-radius: 5px;
        padding: 3px 10px;
        transition: 0.5s ease;
    }

    .language_box button:hover{
        background-color: rgba(13,41,81,1.00);
        color: white;
    }

    /* 响应式 */
  @media(max-width:790px){
    header>div{
      width: 100%;
      flex-direction: column; /* 垂直排列元素 */
      align-items: flex-start; /* 左对齐 */
      justify-content: center;
      gap:10px;
    }
    header>div>img{
      margin-left: 30px;
    }
    header>div>div{
      width: 100%;
    }
    header>div>div>div>ul{
      margin: 0;
      margin-left: 30px;
      flex-wrap: wrap; /* 允许换行 */
      width: calc(100% - 30px); /* 宽度填满容器 */
    }
  }

  @media(max-width:630px){
    header>div>div>div>ul{
      display: none;
    }

    header>div>img{
      margin-left: 15px;
    }

    .btn{
        width: 80px;
    }
    .left{
        right: 80px;
    }
    .language_box{
        right: 160px;
    }

  }
</style>