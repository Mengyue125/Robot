<template>
  <!--	尾部-->
	<footer>
		<div>
			<ul>
				<h3>{{ $t('menu.Home') }}</h3>
				<li><router-link to="/home#News">{{ $t('menu.News') }}</router-link></li>
				<li><router-link to="/home#Introduce">{{ $t('menu.Introduce') }}</router-link></li>
				<li><router-link to="/home#file">{{ $t('menu.File') }}</router-link></li>
				<li><router-link to="/home#instruction">{{ $t('menu.Team') }}</router-link></li>
				<li><router-link to="/home#project">{{ $t('menu.Project') }}</router-link></li>
			</ul>
			<ul>
				<h3>{{ $t('menu.News') }}</h3>
				<li><router-link to="/news#News">{{ $t('menu.News') }}</router-link></li>
			</ul>
			<ul>
				<h3>{{ $t('menu.FAQ') }}</h3>
				<li><router-link to="/faq#Introduce">{{ $t('menu.Introduce') }}</router-link></li>
				<li><router-link to="/faq#FAQ">{{ $t('menu.FAQ') }}</router-link></li>
				<li><router-link to="/faq#Contact">{{ $t('menu.Contact') }}</router-link></li>
			</ul>
			<ul>
				<li>
					<router-link to="/home"><img src="../assets/img/logo.webp" alt="logo"></router-link>
				</li>
			</ul>
		</div>
		<div>
			<p>&copy;2023 IAA All rights reserved.</p>
		</div>
	</footer>
</template>

<script>
export default {
    name:'robot_Footer'
}
</script>

<style scoped>
    /*尾部*/
	footer{
		width: 100%;
		background: rgba(243,244,246,1.00);
	}

	footer>div:last-of-type{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 46px;
		font-size: 18px;
		color: white;
		background: rgba(14,42,82,1.00);	
		flex-wrap: wrap;
	}

	footer>div:first-of-type{
		width: 70%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20px 0;
		color: rgba(14,42,82,1.00);
	}

	footer>div:first-of-type a{
		color: rgba(14,42,82,1.00);
	}
	footer>div:first-of-type>ul{
		width: 20%;
	}
	footer>div:first-of-type>ul:last-of-type{
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	footer ul img{
		width: 200px;
	}

	/* 响应式 */
  @media(max-width:790px){
    footer>div:first-of-type{
      width: 90%;
    }
    footer>div:first-of-type>ul{
      width: 50%;
      margin-bottom: 20px;
    }
    footer>div:first-of-type>ul:last-of-type{
      width: 100%;
      margin-bottom: 0px;
    }
  }

  @media(max-width:630px){
    footer>div:first-of-type>ul{
      width: 100%;
    }
  }
</style>