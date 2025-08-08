<template>
    <transition enter-active-class="animate__animated animate__rotateInDownLeft" leave-active-class="animate__animated animate__rotateOutDownLeft">
        <form action="" role="form" class="search" v-show="isSearch">
            <input type="text" required placeholder="Search for anything" />
            <div>
            <button type="submit"><svg
        width="16"
        height="19"
        viewBox="0 0 16 19"
        fill="nones"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
        <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
        <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
        <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
        <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
        <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
        <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
        <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
        <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
        <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
      </svg></button>
            
            </div>
            <div @click="toggleSearch"><span></span><span></span></div>
        </form>
    </transition>
</template>

<script>
import PubSub from 'pubsub-js';
export default {
  name: "robot_Search",
  data(){
    return {
        isSearch:false
    }
  },
  methods:{
    toggleSearch(){
            PubSub.publish('toggleSearch')
        }
  },
  mounted(){
	this.token = PubSub.subscribe('toggleSearch',()=>{
		this.isSearch = !this.isSearch
		console.log(this.isAside)
	})
  },
  beforeDestroy(){
	PubSub.unsubscribe(this.token)
  }
};
</script>

<style scoped>
    /*搜索*/
    .search {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10;
    }

    .search > input {
        padding: 10px;
        height: 40px;
        background: none;
        border: 1px solid white;
    }

    .search > input::-webkit-input-placeholder {
        color: white;
    }

    .search > div:first-of-type {
        width: 40px;
        height: 40px;
        display: flex;
        background: white;
        align-items: center;
        justify-content: center;
    }

    .search > div:first-of-type button{
        background: transparent;
        border: none;
    }

    .search > div:last-of-type {
        position: absolute;
        right: 15%;
        top: 15%;
        cursor: pointer;
        width: 40px;
        height: 40px;
    }

    .search > div:last-of-type > span {
        width: 1px;
        height: 40px;
        display: block;
        background: white;
        position: absolute;
        transform: rotate(45deg);
    }

    .search > div:last-of-type > span:last-of-type {
        transform: rotate(-45deg);
    }
</style>
