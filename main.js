// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 按需导入 $http 对象
import {
	$http
} from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
$http.baseUrl = "https://api-hmugo-web.itheima.net"

$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中。。。"
	})
}

$http.afterRequest = function() {
	uni.hideLoading()
}

uni.$showMsg = function(title, duration){
	uni.showToast({
		title:title,
		duration:duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif