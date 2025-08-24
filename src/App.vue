<template>
  <div>
    <!-- 搜索栏 -->
     <robot_Search/>
    <!-- 侧边栏 -->
    <robot_Aside></robot_Aside>
    <!-- 头部 -->
    <robot_Header></robot_Header>
    <!-- 内容 -->
    <main class="content-wrapper">
      <router-view/>
    </main>
    <!-- 尾部 -->
    <robot_Footer></robot_Footer> 
    
  </div>
</template>

<script>
import robot_Header from './components/robot_Header.vue';
import robot_Footer from './components/robot_Footer.vue';
import robot_Aside from './components/robot_Aside.vue';
import robot_Search from './components/robot_Search.vue';

export default {
    name:"App",
    components:{robot_Header,robot_Footer,robot_Aside,robot_Search},
}
</script>

<style>
  /* 格式化 */
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,body, #app{
    /* overflow-x: hidden; */
    position: relative;
    left: 0;
    right: 0;
  }

  body{
    width: 100%;
    margin: 0 auto;
    font-family: Times;
    overflow-x: hidden;
  }

  a,p,span,h1,h2,h3,h4,h5,h6{
    line-height: 36px;
  }

  a{text-decoration: none}
  li{list-style: none}
  input{outline: none}
  h2{font-size: 30px;font-weight: 500}
  h3{font-size: 20px;}
  .a{position: relative;bottom: 120px;}
  .title{text-align: center;font-family: MV Boli;color: rgba(15,41,76,1.00)}

  .item {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
  }

  .item.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  /*xing*/
  .line{
    position: relative;
    width: 150px;
    height: 2px;
    display: block;
    background: rgba(14,42,82,1.00);
    margin: 30px auto;
    margin-bottom: 50px;
  }

  .line>span{
    width: 15px;
    height: 15px;
    position: absolute;
    left: 50%;
    top: -6.5px;
    transform: translateX(-50%) rotate(45deg);
    background: rgba(14,42,82,1.00);
  }

  .line>span::after,
  .line>span::before
  {
    width: 15px;
    height: 15px;
    position: absolute;
    display: block;
    content: '';
    left: 7px;
    top: -7px;
    background: rgba(14,42,82,0.3);
  }

  .line>span::before
  {
    left: auto;
    right: 7px;
    top: 7px;
  }

  .content-wrapper {
  flex: 1;
  overflow-y: hidden;  /* 允许垂直滚动 */
  overflow-x: hidden; /* 禁止水平滚动 */
}
</style>