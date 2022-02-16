const unprocessedOrdersList = [
  {
    title: '未处理订单30条',
    status: false,
  },
  {
    title: '未处理订单30条',
    status: false,
  },
  {
    title: '客户投诉问题10条',
    status: false,
  },
  {
    title: '未处理订单30条',
    status: false,
  },
  {
    title: '未处理订单30条',
    status: false,
  },
  {
    title: '客户投诉问题10条',
    status: false,
  },
  {
    title: '未处理订单30条',
    status: false,
  },
  {
    title: '未处理订单30条',
    status: false,
  },
  {
    title: '客户投诉问题10条',
    status: false,
  },
  {
    title: '未处理订单30条',
    status: false,
  },
  {
    title: '未处理订单30条',
    status: false,
  },
  {
    title: '客户投诉问题10条',
    status: false,
  },
];

const tabList = [
  {
    id: 1,
    name: '张三',
    money: 123,
    address: '广东省东莞市长安镇',
    state: '成功',
    date: '2021-6-1',
    thumb: 'https://lin-xin.gitee.io/images/post/wms.png',
  },
  {
    id: 2,
    name: '李四',
    money: 456,
    address: '广东省广州市白云区',
    state: '成功',
    date: '2021-6-2',
    thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
  },
  {
    id: 3,
    name: '王五',
    money: 789,
    address: '湖南省长沙市',
    state: '失败',
    date: '2021-6-3',
    thumb: 'https://lin-xin.gitee.io/images/post/parcel.png',
  },
  {
    id: 4,
    name: '赵六',
    money: 1011,
    address: '福建省厦门市鼓浪屿',
    state: '成功',
    date: '2021-6-3',
    thumb: 'https://lin-xin.gitee.io/images/post/notice.png',
  },
];

module.exports = [
  {
    url: '/api/captcha/sent',
    type: 'post',
    response: (config) => {
      return {
        code: 200,
        data: { smCode: '123' },
      };
    },
  },
  {
    url: '/api/getUser',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: { id: 1, name: 'tom', age: 18 },
      };
    },
  },
  {
    url: '/api/getSubMenuList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          list: [
            {
              icon: 'HomeFilled',
              index: 'dashboard',
              title: '系统首页',
            },
            {
              icon: 'BorderlessTableOutlined',
              index: 'table',
              title: '基础表格',
            },
            {
              icon: 'TableOutlined',
              index: 'tabs',
              title: 'tab选项卡',
            },
            {
              icon: 'formOutlined',
              index: '3',
              title: '表单相关',
              subs: [
                {
                  index: 'form',
                  title: '基本表单',
                },
                {
                  index: 'tabledemo',
                  title: '表格组件',
                },
                {
                  index: 'upload',
                  title: '文件上传',
                },
              ],
            },
            {
              icon: 'WarningFilled',
              index: '7',
              title: '错误处理',
              subs: [
                {
                  index: 'permission',
                  title: '权限测试',
                },
                {
                  index: '404',
                  title: '404页面',
                },
              ],
            },
          ],
        },
      };
    },
  },
  {
    url: '/api/unprocessedOrders',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          list: unprocessedOrdersList,
        },
      };
    },
  },
  {
    url: '/api/table/getList',
    type: 'get',
    response: (config) => {
      // 从查询参数中获取分页、过滤关键词等参数
      const { page = 1, limit = 5 } = config.query;
      // 分页
      const list = tabList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 200,
        data: {
          list,
          pageTotal: tabList.length,
        },
      };
    },
  },
  {
    url: '/api/addUser',
    type: 'post',
    response: () => {
      // 直接返回
      return {
        code: 200,
      };
    },
  },
  {
    url: '/api/updateUser',
    type: 'post',
    response: () => {
      return {
        code: 200,
      };
    },
  },
  {
    url: '/api/deleteUser',
    type: 'get',
    response: () => {
      return {
        code: 200,
      };
    },
  },
];
