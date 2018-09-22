//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name: 'Wechat',

    text: 'init data',
    num: 0,
    array: [{ text: 'init data' }],
    object: {
      text: 'init data'
    },
    // Restaurant settings
    restaurant_idx: -1,
    restaurant: '<click to pick>',
    rest_leng: 3,
    input_rest: '',
    restaurant_list: [
      { name: '小刘清粥' },
      { name: '京味轩' },
      { name: '西贡渔港' }
    ],
    rest_hash: {
      '小刘清粥': true,
      '京味轩': true,
      '西贡渔港': true
    },
    // End Restaurant settings.
    count: 1,
    my_array: [1, 2, 3, 4, 5],
    objectArray: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    numberArray: [1, 2, 3, 4]
  },
  changeName: function (e) {
    this.setData({
      name: 'Alice',
      restaurant: 'hahha'
    })
  },
  pickRestaurant: function (e) {
    const length = this.data.restaurant_list.length
    var x = Math.floor(Math.random() * length)
    while (length > 1 && x == this.data.restaurant_idx) {
      x = Math.floor(Math.random() * length)
    }
    this.setData({
      restaurant_idx: x,
      restaurant: this.data.restaurant_list[x].name
    })
  },
  addRestaurant: function (e) {
    var input_rest = e.detail.value
    if (this.data.rest_hash[input_rest]) {
      console.log('Already has this restaurant in list: '.concat(input_rest))
      return
    }
    console.log('Add to restaurant list: '.concat(input_rest))
    // Add to hashset.
    this.data.rest_hash[input_rest] = true
    // Add to list.
    this.data.restaurant_list = this.data.restaurant_list.concat([{ name: input_rest }])
    this.setData({
      restaurant_list: this.data.restaurant_list,
      rest_length: this.data.restaurant_list.length,
    })
  },
  removeRestaurant: function (e) {
    var idx = this.data.restaurant_idx
    if (idx == -1) {
      console.log('Invalid operation: idx = -1')
      return
    }
    console.log('Remove from restaurant list: '.concat(this.data.restaurant_list[idx]))
    // Remove from hashset.
    delete this.data.rest_hash[this.data.restaurant_list[idx]]
    // Remove from list.
    this.data.restaurant_list = this.data.restaurant_list.slice(0, idx).concat(
      this.data.restaurant_list.slice(idx + 1))
    this.setData({
      restaurant_idx: -1,
      restaurant: '<click to pick>',
      restaurant_list: this.data.restaurant_list,
      rest_length: this.data.restaurant_list.length,
    })
  },
  // switch: function (e) {
  //   const length = this.data.objectArray.length
  //   for (let i = 0; i < length; ++i) {
  //     const x = Math.floor(Math.random() * length)
  //     const y = Math.floor(Math.random() * length)
  //     const temp = this.data.objectArray[x]
  //     this.data.objectArray[x] = this.data.objectArray[y]
  //     this.data.objectArray[y] = temp
  //   }
  //   this.setData({
  //     objectArray: this.data.objectArray
  //   })
  // },
  // addToFront: function (e) {
  //   const length = this.data.objectArray.length
  //   this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
  //   this.setData({
  //     objectArray: this.data.objectArray
  //   })
  // },
  // addNumberToFront: function (e) {
  //   this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
  //   this.setData({
  //     numberArray: this.data.numberArray
  //   })
  // },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changeName: function (e) {
    this.setData({
      name: 'Alice',
      restaurant: 'hahha'
    })
  },
  onLoad: function () {
    this.setData({
      rest_length: this.data.restaurant_list.length,
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
