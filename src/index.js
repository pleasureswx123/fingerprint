import "./styles.css";
import { v5 as uuidv5 } from "uuid";
const MY_NAMESPACE = "868efab6-d4d6-4536-9065-b9dc37f6a148";
const keys = [
  "userAgent", // 浏览器类型
  "language", // 系统语言
  "deviceMemory", // 设备内存的大致数量
  "hardwareConcurrency", // 返回可用的逻辑处理器核心数
  "platform", // 操作系统
  "vendor", // 返回当前浏览器的供应商的名字
  "vendorSub", // 返回供应商版本号码
  "product", // 在任意浏览器下都只返回'Gecko'，此属性只用于兼容的目的
  "productSub", // 当前浏览器的编译版本号
  "maxTouchPoints", // 前设备支持的最大同时触摸接触点数
  "cpuClass", // cpu等级
  "appCodeName",
  "appName", // 浏览器官方名称
  "appVersion" // 浏览器版本号
];
const screen = `${window.screen.colorDepth}-${window.screen.width}-${window.screen.height}`;
const timezone = window.Intl.DateTimeFormat().resolvedOptions().timeZone;
const storage = `${!!window.sessionStorage}-${!!window.localStorage}-${!!window.indexedDb}`;
const infoStr = [screen, timezone].join("-");

const getUUID = (txt) => {
  let result = "xxxxxx";
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = "14px serif";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    const b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
    const bin = atob(b64) || "";
    result = bin.slice(-16, -12);
  } catch (e) {
    console.log(e);
  }
  return result;
};
const bin2hex = (s) => {
  let i,
    l,
    o = "",
    n;
  s += "";
  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16);
    o += n.length < 2 ? "0" + n : n;
  }
  return o;
};
const getCanvasId = () => {
  let id = "";
  try {
    const uuid = getUUID("gotin.track.com");
    id = bin2hex(uuid);
  } catch (e) {
    console.log(e);
  }
  return id;
};

const keysLen = keys.length;
const getNavigatorInfo = () =>
  keys
    .map((key, index) => {
      return `${navigator[key]}${
        index + 1 === keysLen ? `-${infoStr}-${getCanvasId()}` : ""
      }`;
    })
    .join("-");

const info = getNavigatorInfo();
const generateFingerprintId = () => {
  return uuidv5(info, MY_NAMESPACE);
};
// navigator.userAgentData.mobile
// navigator.userAgentData.platform
// navigator.userAgentData.brands
// geolocation

document.getElementById("app").innerHTML = `html2: ${generateFingerprintId()}`;
