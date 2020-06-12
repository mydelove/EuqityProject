import baseNetwork from "../../utils/baseNetwork.js";
var network = require('../../utils/network.js');
var configurl = require('../../utils/config.js');
var utilsMap = require('../../utils/util.js');
var  nav= require('../../utils/getDatas.js');

Page({
  data: {
    //首页轮播图数据
    bannerData: [],
    navList: [],
    miaoshaGoods:[],
    goods:[],
    scrollTop: 0,
  },
  /**
   * 请求轮播图与首页列表数据
   */
  loadData() {
    var that = this;
    //首页轮播图
    baseNetwork.getHomeBanner().then(
      function (res) {
        that.setData({
          bannerData: res.data
        })
      })

  },

  onLoad: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    const that = this
    if (e && e.scene) {
      const scene = decodeURIComponent(e.scene)
      if (scene) {
        wx.setStorageSync('referrer', scene.substring(11))
      }
    }
    this.setData({
      navList: nav.activityData,
      miaoshaGoods: nav.miaosha,
      goods:nav.goods
    });
    this.loadData()
  },
 
 
  onShow: function (e) {
    this.setData({
      shopInfo: wx.getStorageSync('shopInfo')
    })
  },


  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  
  onReachBottom: function () {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getGoodsList(this.data.activeCategoryId, true)
  },
  onPullDownRefresh: function () {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId)
    wx.stopPullDownRefresh()
  },

  bindinput(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  bindconfirm(e) {
    this.setData({
      inputVal: e.detail.value
    })
    wx.navigateTo({
      url: '/pages/goods/list?name=' + this.data.inputVal,
    })
  },
  goSearch() {
    wx.navigateTo({
      url: '/pages/goods/list?name=' + this.data.inputVal,
    })
  }
})