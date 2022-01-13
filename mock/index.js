const mockList = [
  { id: 1, name: 'tom', age: 18 },
  { id: 2, name: 'jerry', age: 18 },
  { id: 3, name: 'mike', age: 18 },
  { id: 4, name: 'jack', age: 18 },
  { id: 5, name: 'larry', age: 18 },
  { id: 6, name: 'white', age: 18 },
  { id: 7, name: 'peter', age: 18 },
  { id: 8, name: 'james', age: 18 },
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
    url: '/api/getList',
    type: 'get',
    response: (config) => {
      // 从查询参数中获取分页、过滤关键词等参数
      const { page = 1, limit = 5 } = config.query;
      // 分页
      const data = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 200,
        data,
        total: mockList.length,
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
