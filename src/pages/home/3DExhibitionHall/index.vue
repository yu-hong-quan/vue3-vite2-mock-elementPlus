
<template>
  <div class="exhibitionHall">
    <BasicContainer>
      <div class="maskLoading" v-if="isLoading">
        <div class="loading">
          <div :style="{ width: loadingWidth + '%' }"></div>
        </div>
        <div style="padding-left: 10px">
          <!-- {{ parseInt(loadingWidth) }}% -->
          Loding Model 3D...
        </div>
      </div>
      <div class="mask">
        <div>
          <p style="margin-bottom: 10px">
            三维坐标点信息： x : {{ x }} , y : {{ y }} , z : {{ z }}
          </p>
          <el-button type="primary" @click="isAutoFun"> > 转动车</el-button>
          <el-button type="primary" @click="stop"> > 停止</el-button>
          <el-button type="primary" @click="isAction ? action() : brackAction()">
            > {{ isAction ? '车内视角' : '车外视角' }}</el-button>
        </div>
        <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
          > 车辆自定义
        </el-button>
      </div>
      <el-drawer v-model="drawer" :direction="direction">
        <template #title>
          <h4>车辆自定义</h4>
        </template>
        <template #default>
          <el-divider content-position="left">车身颜色</el-divider>
          <div class="flex">
            <div @click="setCarColor(index)" v-for="(item, index) in colorAry" :style="{ backgroundColor: item }"
              :key="index"></div>
          </div>
          <el-divider content-position="left">轮毂颜色</el-divider>
          <div class="flex">
            <div @click="setCarColor(index)" v-for="(item, index) in colorAry" :style="{ backgroundColor: item }"
              :key="index"></div>
          </div>
          <el-divider content-position="left">更换车辆</el-divider>
          <el-radio-group v-model="radio" class="ml-4" @change="selectModl">
            <el-radio label="1" size="large">特斯拉 Model3</el-radio>
            <el-radio label="2" size="large">五菱宏光mini</el-radio>
          </el-radio-group>
        </template>
      </el-drawer>
    </BasicContainer>
  </div>
</template>

<script setup name="exhibitionHall">
import BasicContainer from "coms/vpro-materials/basic-container"
import { onMounted, reactive, ref, toRefs, onBeforeUnmount } from 'vue'
// import {
//   Color,
//   DirectionalLight,
//   DirectionalLightHelper,
//   HemisphereLight,
//   HemisphereLightHelper,
//   PerspectiveCamera,
//   Scene,
//   WebGLRenderer,
//   GridHelper,
//   AmbientLight,
//   Vector3,
//   Box3,
//   BoxGeometry,//正方体
//   SphereGeometry,//球体
//   MeshLambertMaterial,//哑光材质
//   MeshBasicMaterial,
//   Mesh,
//   Vector2,
//   Raycaster
// } from 'three'
import * as THREE from "three"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js' //效果组合器
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js' //在指定的场景和相机的基础上渲染出一个新场景
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js' //物体边界线条
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js' //使用该通道你可以传入一个自定义的着色器，用来生成高级的、自定义的后期处理通道
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js" //着色器主要功能是解决锯齿问题
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import TWEEN from '@tweenjs/tween.js'
import Stats from 'three/examples/jsm/libs/stats.module.js' //性能检测插件（stats.js）监测页面性能

// 设置stats样式
let stats = new Stats();
//车身颜色数组
const colorAry = [
  "rgb(216, 27, 67)", "rgb(142, 36, 170)", "rgb(81, 45, 168)", "rgb(48, 63, 159)", "rgb(30, 136, 229)", "rgb(0, 137, 123)",
  "rgb(67, 160, 71)", "rgb(251, 192, 45)", "rgb(245, 124, 0)", "rgb(230, 74, 25)", "rgb(233, 30, 78)", "rgb(156, 39, 176)",
  "rgb(0, 0, 0)", "rgb(255,255,255)"] // 车身颜色数组 
const defaultMap = {
  x: -388,
  y: 61,
  z: -20,
}// 相机的默认坐标
const map = reactive(defaultMap)//把相机坐标设置成可观察对象
const { x, y, z } = toRefs(map)//输出坐标给模板使用
let scene, camera, renderer, controls, floor, dhelper, hHelper, directionalLight, hemisphereLight // 定义所有three实例变量
let isLoading = ref(true) //是否显示loading  这个load模型监听的进度
let loadingWidth = ref(0)// loading的进度
let composer = ref(null)
let outlinePass = ref(null)
let renderPass = ref(null)
let meshArr = toRefs([])
let isAction = ref(true)
let radio = ref('1')
const drawer = ref(false)
const direction = ref('rtl')
let modUrl = ref('/src/assets/scene.gltf')
let gltfMod = ref(null)

// 关闭侧边栏
const cancelClick = () => {
  drawer.value = false
}
const confirmClick = () => {
  ElMessageBox.confirm(`Are you confirm to chose  ?`)
    .then(() => {
      drawer.value = false
    })
    .catch(() => {
      // catch error
    })
}

//创建灯光
const setLight = () => {
  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(0, 8, 4)
  dhelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000)
  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4)
  hemisphereLight.position.set(4, 8, 0)
  hHelper = new THREE.HemisphereLightHelper(hemisphereLight, 5)
  scene.add(directionalLight)
  scene.add(hemisphereLight)
}

// 创建场景
const setScene = () => {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({
    antialias: false, //开启抗锯齿 卡顿，暂时关闭
    alpha: true, //开启背景透明
  });
  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio) // 设置显示比例 
  renderer.setClearColor(0x333334, 1) // 设置背景颜色
  // 在导入材质时，会默认将贴图编码格式定义为Three.LinearEncoding，
  // 故需将带颜色信息的贴图手动指定为Three.sRGBEncoding
  renderer.outputEncoding = THREE.sRGBEncoding // 输出到屏幕 使用颜色贴图--上皮肤
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  document.querySelector('.basic-container').appendChild(renderer.domElement)
}

// 创建相机【远景相机，与人眼观察类似，近大远小】
/**
 * param1:视角【视角越大  物体渲染到屏幕时则看着越小，反之越大】
    param2:相机拍摄面的长宽比
    param3:近裁剪面
    param4:远裁剪面
 */
const setCamera = () => {
  const { x, y, z } = defaultMap
  camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 1, 2000)
  camera.position.set(x, y, z)
}

// 设置模型控制 == 视图控制器
const setControls = () => {
  controls = new OrbitControls(camera, renderer.domElement);
  // 相机垂直方向移动的弧度，默认从顶部九十度到底部九十度 默认值是0和Math.PI
  controls.maxPolarAngle = (0.9 * Math.PI) / 2;
  // 设置控制器是否缩放以及缩放速度
  controls.enableZoom = true;
  // 是否开启键盘控制
  controls.enableKeys = true;
  controls.addEventListener("change", render);
};

//返回坐标信息
const render = () => {
  map.x = Number.parseInt(camera.position.x);
  map.y = Number.parseInt(camera.position.y);
  map.z = Number.parseInt(camera.position.z);
};

// 循环场景 、相机、 位置更新
const loop = () => {
  stats.update();
  controls.update();
  requestAnimationFrame(loop);
  TWEEN.update();
  renderer.render(scene, camera);

  // if (composer) {
  //   composer.render()
  // }
};

//是否自动转动
const isAutoFun = () => {
  controls.autoRotate = true;
};
//停止转动
const stop = () => {
  controls.autoRotate = false;
};

//设置车身颜色
const setCarColor = (index) => {
  const currentColor = new THREE.Color(colorAry[index])
  scene.traverse(child => {
    if (child.isMesh) {
      console.log(child.name);
      if (child.name.includes("door_")) {
        child.material.color.set(currentColor);
      }
    }
  })
}

// 添加地面网格GIRDHELPER
/**
 * size 网格总边长
 * step 网格个数
 * colorCenterLine  网格中心线颜色
 * colorGrid    网格其他线颜色
 */
const setGridHelper = () => {
  var gridHelper = new THREE.GridHelper(1360, 20, 'red', 'gray');
  gridHelper.position.y = -100;
  gridHelper.position.x = 0;
  scene.add(gridHelper);
};

// 浏览器窗口大小调整
const resizeWindow = () => {
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);
}

// 添加圆体
const addMesh = () => {
  let geometry = new THREE.SphereGeometry(7, 20, 20);//盒子模型
  let coordinate = [
    { x: -121, y: 17, z: -5 }, //驾驶座车门点
    { x: 121, y: 17, z: -5 }, //副驾驶车门点
    { x: 0, y: 20, z: 280 }, //后背箱点
    { x: 121, y: 26, z: 110 }, //右后车门点
    { x: -121, y: 26, z: 110 }, //左后车门点
    { x: 0, y: 36, z: -228 }, //前车盖点
  ];
  for (let i = 0; i < coordinate.length; i++) {
    const item = coordinate[i];
    let material = new THREE.MeshLambertMaterial({
      color: 'rgba(255,255,255)',
      transparent: true,//是否开启透明
      opacity: 0.5//透明度
    });//材料
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = item.x;
    mesh.position.y = item.y;
    mesh.position.z = item.z;
    mesh.receiveShadow = true;
    mesh.castShadow = true; //球体
    mesh.name = `cube_demo_${item}`;
    scene.add(mesh);
    meshArr.push(mesh);
  }
  // outlineObj([meshArr[0]])
  // 物体高亮发光
  // for (let j = 0; j < meshArr.length; j++) {
  //   const item = meshArr[j];
  //   outlineObj([item])
  // }
};

// 高亮显示模型（呼吸灯）
const outlineObj = (selectedObjects) => {
  // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
  composer = new EffectComposer(renderer);

  // 新建一个场景通道  为了覆盖到原理来的场景上
  renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // 物体边缘发光通道
  outlinePass = new OutlinePass(new THREE.Vector2(100, 100), scene, camera)
  outlinePass.selectedObjects = selectedObjects
  outlinePass.edgeStrength = 20.0 // 边框的亮度
  outlinePass.edgeGlow = 1 // 光晕[0,1]
  outlinePass.usePatternTexture = false // 是否使用父级的材质
  outlinePass.edgeThickness = 1.0 // 边框宽度
  outlinePass.downSampleRatio = 2 // 边框弯曲度
  outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
  outlinePass.visibleEdgeColor.set(parseInt(0xffffff)) // 呼吸显示的颜色
  outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
  outlinePass.clear = true
  composer.addPass(outlinePass)

  // 自定义的着色器通道 作为参数
  let effectFXAA = new ShaderPass(FXAAShader);
  effectFXAA.uniforms.resolution.value.set(
    1 / window.innerWidth,
    1 / window.innerHeight
  );
  effectFXAA.renderToScreen = true;
  composer.addPass(effectFXAA);
};

// 环境光---阳光普照，自然光
const setAmbientLight = () => {
  let ambient = new THREE.AmbientLight(0x444444)
  ambient.name = '环境光'
  scene.add(ambient)
}

// 查看车内饰
const action = () => {
  // 暂停车身旋转
  stop();
  let tweena = cameraCon({ x: 0, y: 9, z: -60 }, 4000);
  let tweenb = cameraCon({ x: 0, y: 1, z: 8 }, 4000);
  isAction.value = false;
  // 链式补间：tween.chain
  // 如果有多组补间动画，想要a组动画结束后立即启动b组动画，则需要使用tweena.chain(tweenb)
  // tweena.chain(tweenb)

  // tweena.start()
  tweenb.start()
}

// 查看车外饰
const brackAction = () => {
  let tweenc = cameraCon({ x: 3, y: 66, z: -422 }, 4000);
  isAction.value = true;
  tweenc.start();
};

// 动画
const cameraCon = (p2, time) => {
  let p1 = { x: x.value, y: y.value, z: z.value }; //动画预开始 相机初始位置
  let tween = new TWEEN.Tween(p1)
    .to(p2, time)
    .easing(TWEEN.Easing.Quadratic.InOut);
  tween.onUpdate(() => {
    camera.position.set(p1.x, p1.y, p1.z);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0); // 确保镜头移动后，视觉中心还在圆点处
    controls.update();
  });
  return tween;
};

// 更换车辆
const selectModl = () => {
  console.log(radio.value);
  if (radio.value == '1') {
    modUrl.value = '/src/assets/scene.gltf'
  } else {
    modUrl.value = '/src/assets/car.glb'
  }
  isLoading.value = true;
  console.log(gltfMod);
  // 删除原有模型
  clearScene(scene)
  loadingWidth.value = 0;
  drawer.value = false;
  load3D();
}

/**
 * 清除模型，模型中有 group 和 scene,需要进行判断
 * @param scene
 * @returns
 */
const clearScene = (myObjects) => {
  console.log(myObjects);
  // 从scene中删除模型并释放内存
  if (myObjects.length > 0) {
    for (var i = 0; i < myObjects.length; i++) {
      var currObj = myObjects[i];
      console.log(currObj);
      // 判断类型
      if (currObj instanceof THREE.Scene) {
        var children = currObj.children;
        for (var i = 0; i < children.length; i++) {
          deleteGroup(children[i]);
        }
      } else {
        deleteGroup(currObj);
      }
      scene.remove(currObj);
    }
  }
}


// 删除group，释放内存
const deleteGroup = (group) => {
  //console.log(group);
  if (!group) return;
  // 删除掉所有的模型组内的mesh
  group.traverse(function (item) {
    if (item instanceof THREE.Mesh) {
      item.geometry.dispose(); // 删除几何体
      item.material.dispose(); // 删除材质
    }
  });
}

//加载模型，并将模型加入到场景中
const load3D = () => {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/')
  dracoLoader.preload()
  loader.setDRACOLoader(dracoLoader)
  loader.load(modUrl.value, (gltf) => {
    gltfMod.value = gltf.scene
    scene.add(gltf.scene)
    renderer.render(scene, camera)
  }, (xhr) => {
    let load = (xhr.loaded / xhr.total) * 100
    loadingWidth.value = load
    console.log(load + '% loaded')
    if (load >= 100) {
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    }
  }, (error) => {
    console.error(error)
  })
}

//初始化所有函数
const init = async () => {
  setScene()
  setCamera()
  setLight()
  setControls()
  setGridHelper()
  setAmbientLight()
  load3D()
  addMesh()
  resizeWindow()
  loop()
}

//vue3钩子函数
onMounted(() => {
  init();
  // 添加性能检测插件
  stats.domElement.style.position = "absolute"; //绝对坐标
  stats.domElement.style.left = "10px"; // (0,0)px,左上角
  stats.domElement.style.top = "10px";
  console.log(document.getElementsByTagName("BasicContainer"));
  document.querySelector(".basic-container").appendChild(stats.domElement);
});
onBeforeUnmount(() => {
  // vue2的beforeDestroy(vue3中的onBeforeUnmount)内将这些track到的3D物体内存释放,保证体验性能流畅
  try {
    scene.clear();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.content = null;
    let gl = renderer.domElement.getContext("webgl");
    gl && gl.getExtension("WEBGL_lose_context").loseContext();
  } catch (e) {
    console.log(e);
  }
});
</script>

<style lang="less" scoped>
.exhibitionHall {
  width: 100%;
  height: 100%;
  position: relative;

  .basic-container {
    // height: 845px;
    height: calc(100% - 10px);
    position: relative;
    padding: 0;
    background: #333334;
    // background: url('@/assets/bg.jpg') no-repeat;
    background-size: cover;
    background-position: bottom;
  }
}

.maskLoading {
  background: #333334;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1111111;
  color: #fff;
}

.maskLoading .loading {
  width: 400px;
  height: 20px;
  border: 1px solid #fff;
  background: #333334;
  overflow: hidden;
  border-radius: 10px;
}

.maskLoading .loading div {
  background: #fff;
  height: 20px;
  width: 0;
  transition-duration: 500ms;
  transition-timing-function: ease-in;
}

.mask {
  color: #fff;
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  user-select: none;

  >div:nth-child(1) {
    margin-left: 17px;
    margin-bottom: 20px;
  }
}

.flex {
  display: flex;
  flex-wrap: wrap;
  // padding: 20px;
}

.flex div {
  width: 15px;
  height: 15px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid #eee;
}

:deep(.el-overlay) {
  position: absolute;
}

:deep(.el-drawer__header) {
  margin-bottom: 0;
}
</style>
