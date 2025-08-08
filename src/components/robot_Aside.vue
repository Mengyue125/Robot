<template>
  <!--	侧边栏-->
  <transition enter-active-class="animate__animated animate__slideInRight" leave-active-class="animate__animated animate__slideOutRight">
    <aside v-show="isAside">
      <div>
        <ul>
          <li><router-link to="/home">{{ $t('menu.Home') }}</router-link></li>
          <li><router-link to="/news">{{ $t('menu.News') }}</router-link></li>
          <li><router-link to="/faq">{{ $t('menu.FAQ') }}</router-link></li>
        </ul>
      </div>
    </aside>
  </transition>
</template>

<script>
import PubSub from 'pubsub-js';
import router from '@/router/index.js';
export default {
  name: "robot_Aside",
  data(){
	return{
		isAside:false,
	}
  },
  mounted(){
	// 监听侧边栏切换事件
	this.token = PubSub.subscribe('toggleAside',()=>{
		this.isAside = !this.isAside
		console.log(this.isAside)
	})

	// 监听路由变化，路由变化时关闭侧边栏
	this.routeToken = router.afterEach(() => {
		this.isAside = false;
	});
  },
  beforeDestroy(){
	// 取消订阅事件
	PubSub.unsubscribe(this.token)
	// 移除路由监听
	this.routeToken();
  }
};
</script>

<style scoped>
/*侧边栏*/
aside {
  width: 480px;
  position: fixed;
  top: 100px;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  background: rgba(243, 244, 246, 1);
  transition: 1s cubic-bezier(0.2, 1, 0.2, 1);
  height: calc(100vh - 100px);
  z-index: 3;
  right: 0;
}

aside > * {
  width: 100%;
}

.aside {
  right: 0;
}

aside > div > ul > li > a {
  font-size: 24px;
  padding: 10px;
  text-align: center;
  display: block;
  transition: 0.5s;
  color: rgba(14, 41, 81, 1);
}

aside > div > ul > li > a:hover {
  background: rgba(14, 41, 81, 1);
  color: white;
}

@media (max-width:480px) {
  aside {
    width: 100%;
  }
}
</style>
