<template>
    <transition enter-active-class="animate__animated animate__rotateInDownLeft" leave-active-class="animate__animated animate__rotateOutDownLeft">
        <form @submit.prevent="search" role="form" class="search" v-show="isSearch">
            <!-- 关闭按钮 - 放置在最外层确保始终可见 -->
            <div class="close-button" @click="toggleSearch"><span></span><span></span></div>
            
            <!-- 搜索内容容器 - 包裹搜索框和结果 -->
            <div class="search-content">
                <!-- 搜索输入区域 -->
                <div class="search-input-container">
                    <input type="text" v-model="searchQuery" required placeholder="Search for anything" />
                    <div>
                        <button type="submit" :disabled="isSearching">
                            <span v-if="isSearching">搜索中...</span>
                            <svg v-else
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
                  </svg>
                        </button>
                    </div>
                </div>
                
                <!-- 搜索结果区域 -->
                <div class="search-results" v-if="showResults">
                    <h3>搜索结果 ({{ searchResults.length }})</h3>
                    <div v-if="searchResults.length === 0 && searchQuery">
                        <p>没有找到相关内容</p>
                    </div>
                    <ul>
                        <li v-for="(result, index) in searchResults" :key="index" @click="goToResult(result)">
                            <h4>{{ result.title || '无标题' }}</h4>
                            <p>{{ result.content || result.description || '无描述' }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </transition>
</template>

<script>
import PubSub from 'pubsub-js';
import supabase from '@/plugins/supabase';
export default {
  name: "robot_Search",
  data(){
    return {
        isSearch: false,
        searchQuery: '',
        searchResults: [],
        showResults: false,
        isSearching: false,
        bannerData: [],
        newsData: []
    }
  },
  methods:{
    toggleSearch(){
            PubSub.publish('toggleSearch')
        },
        // 控制body滚动
        controlBodyScroll(shouldPrevent) {
            if (shouldPrevent) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },
        async fetchDataFromSupabase() {
            try {
                // 获取banner数据
                const { data: bannerData, error: bannerError } = await supabase
                  .from('banner')
                  .select('*')
                  .order('created_at', { ascending: false })
                  .eq('is_active', 1);
                
                if (!bannerError) {
                  this.bannerData = bannerData;
                }
                
                // 获取news数据
                const { data: newsData, error: newsError } = await supabase
                  .from('news')
                  .select('*')
                  .order('publish_time', { ascending: false })
                  .eq('status', 1);
                
                if (!newsError) {
                  this.newsData = newsData;
                }
                
              } catch (error) {
                console.error('获取Supabase数据失败:', error);
              }
        },
        search() {
            if (!this.searchQuery.trim()) {
                return;
            }
            
            // 设置为搜索中状态
            this.showResults = true;
            this.isSearching = true;
            
            // 保存当前搜索词，以便稍后清空搜索框
            const currentQuery = this.searchQuery;
            
            // 模拟搜索延迟
            setTimeout(() => {
                // 确保数据存在且为数组
                const bannerData = Array.isArray(this.bannerData) ? this.bannerData : [];
                const newsData = Array.isArray(this.newsData) ? this.newsData : [];
                
                // 合并banner和news数据进行搜索
                const allData = [
                  ...bannerData.map(item => ({ ...item, type: 'banner', content: item.description })),
                  ...newsData.map(item => ({ ...item, type: 'news', content: item.description || item.content }))
                ].filter(Boolean); // 过滤掉null或undefined的项
                
                // 过滤匹配的结果
                this.searchResults = allData.filter(item => {
                    if (!item || !item.title) return false;
                    
                    const searchLower = currentQuery.toLowerCase();
                    const titleMatch = item.title && item.title.toLowerCase().includes(searchLower);
                    const contentMatch = item.content && item.content.toLowerCase().includes(searchLower);
                    const descriptionMatch = item.description && item.description.toLowerCase().includes(searchLower);
                    
                    return titleMatch || contentMatch || descriptionMatch;
                });
                
                // 搜索完成后保留搜索框值
                this.isSearching = false;
            }, 300);
        },
        
        // 跳转到搜索结果对应的页面
        goToResult(result) {
            // 如果有link_url，则跳转到该链接（新窗口）
            if (result.link_url) {
                window.open(result.link_url, '_blank');
                // 在新窗口打开链接时，保持搜索框状态不变
                return;
            } 
            
            // 如果是页面内跳转，则正常跳转并关闭搜索框
            if (result.path) {
                this.$router.push(result.path);
            }
            
            // 清空搜索结果
            this.searchResults = [];
            this.showResults = false;
            this.toggleSearch();
        }
  },
  mounted(){
	this.token = PubSub.subscribe('toggleSearch',()=>{
		this.isSearch = !this.isSearch;
        this.controlBodyScroll(this.isSearch);
	})
    this.fetchDataFromSupabase();
  },
  beforeDestroy(){
	PubSub.unsubscribe(this.token);
    // 确保在组件销毁时恢复body滚动
    document.body.style.overflow = '';
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

    /* 关闭按钮样式 - 放置在右上角，不影响搜索内容区域 */
    .close-button {
        position: absolute;
        right: 15%;
        top: 15%;
        cursor: pointer;
        width: 40px;
        height: 40px;
        z-index: 20;
    }

    .close-button > span {
        width: 1px;
        height: 40px;
        display: block;
        background: white;
        position: absolute;
        transform: rotate(45deg);
    }

    .close-button > span:last-of-type {
        transform: rotate(-45deg);
    }

    /* 搜索内容容器 - 集中管理搜索框和结果 */
    .search-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
    }

    /* 搜索输入框容器 - 确保搜索框和按钮在同一行 */
    .search-input-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-input-container input {
        padding: 10px;
        height: 40px;
        background: none;
        border: 1px solid white;
        color: white;
        width: 300px;
    }

    .search-input-container input::-webkit-input-placeholder {
        color: white;
    }

    .search-input-container > div {
        width: 40px;
        height: 40px;
        display: flex;
        background: white;
        align-items: center;
        justify-content: center;
    }

    .search-input-container > div button{
        background: transparent;
        border: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    /* 搜索结果样式 - 模态框样式，最多显示3个结果 */
    .search-results {
        width: 600px;
        max-height: 280px; /* 大约适合显示3个结果 */
        overflow-y: auto;
        background: white;
        margin-top: 20px;
        padding: 20px;
        border-radius: 8px;
        position: relative;
        z-index: 15; /* 高于背景但低于关闭按钮 */
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        border: 1px solid #ddd;
    }
    
    /* 自定义滚动条样式 */
    .search-results::-webkit-scrollbar {
        width: 8px;
    }
    
    .search-results::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    
    .search-results::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }
    
    .search-results::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .search-results h3 {
        color: #0d2951;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
    }

    .search-results ul {
        list-style: none;
        padding: 0;
    }

    .search-results li {
        padding: 15px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .search-results li:hover {
        background-color: #f5f5f5;
    }

    .search-results li:last-child {
        border-bottom: none;
    }

    .search-results h4 {
        color: #0d2951;
        margin: 0 0 8px 0;
        font-size: 16px;
    }

    .search-results p {
        color: #666;
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
    }

    /* 响应式设计 */
    @media (max-width: 768px) {
        .search-results {
            width: 90%;
            max-width: 500px;
        }
        
        .search-input-container input {
            width: 200px;
        }
    }
</style>
