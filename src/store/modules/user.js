export default { 
    namespaced:true,
    state: {
        userInfo: {
            name: '小余',
            age: 18
        }
    },
    mutations: {
        getUserInfo(state,value){
            state.userInfo.name = value;
        }
    },
    actions:{
        asyncGetUserInfo({commit},value){
            setTimeout(()=>{
                commit('getUserInfo',value)
            },2000)
        }
    },
    getters:{
        userInfoGetter(state){
            return state.userInfo
        }
    },
}