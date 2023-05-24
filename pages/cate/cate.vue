<template>
	<view class="scroll-view-container">
		<!-- 左侧滑动区 -->
		<scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
			<block v-for="(item,index) in cataList" :key="index">
				<view :class="['left-scroll-view-item', index===active? 'active':'' ]" @click="activeChanged(index)">
					{{item.cat_name}}
				</view>
			</block>

		</scroll-view>
		<!-- 右侧滑动区 -->
		<scroll-view scroll-y="true" class="right-scroll-view" :style="{height: wh +'px'}" :scroll-top="scrollTop">
			<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
				<view class="cate-lv2-title">
					/ {{item2.cat_name}} /
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon" mode=""></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用的屏幕高度
				wh: 0,
				active:0,
				cataList: [],
				cateLevel2: [],
				scrollTop:0,
				l1: [1, 1, 1, 1, 1, 1],
				r1: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				console.log(res)
				if (res.meta.status !== 200) {
					uni.$showMsg()
				}
				this.cataList = res.message
				// 二级菜单
				this.cateLevel2 = res.message[0].children
			},
			activeChanged(index){
				this.active = index
				this.cateLevel2 = this.cataList[index].children
				this.scrollTop = this.scrollTop===0? 1:0
			},
			
			// 跳转到商品列表页面
			gotoGoodsList(item) {
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?cid="+item.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;


				& .active {
					background-color: #FFFFFF;

					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
					}
				}
			}
		}
	}
	
	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	
	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			
			text{
				font-size: 12px;
			}
		}
	}
</style>