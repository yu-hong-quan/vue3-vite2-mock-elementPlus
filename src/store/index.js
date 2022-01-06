import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";// 数据持久化依赖
// 创建一个新的 store 实例
const initModule = () => {
    // 获取modules文件夹内所有的模块
    const requireModules = import.meta.globEager("./modules/*.js")

    const modules = {}
    for (let i in requireModules) {
        // 将模块路径切割出模块名
        const moduleName = i
            .split("/")
            [i.split("/").length - 1].replace(".js", "")
        // 将模块放入modules
        modules[moduleName] = requireModules[i].default
    }
    return modules
}


const store = createStore({
    state: {
        
    },
    mutations: {
        getUserInfo(state,value){
            state.userInfo.name = value;
        }
    },
    modules: { ...initModule() },
    plugins: [
        createPersistedState(),
    ],
})

export default store;