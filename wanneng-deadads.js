/*
 * wanneng-deadads.js — 万能钥匙去广告 (Quantumult X script-response-body)
 * ------------------------------------------------------------
 * 作用: 把 wkanx 广告配置/策略接口的响应体置空, 让 FSMix 聚合层拿不到广告配置。
 * 说明: 需启用 MITM; 若已有 wanneng-deadads.filter 拦截, 本脚本为可选"温和模式"。
 * 挂载 (将 <用户>/<仓库> 换成你的地址):
 *   ^https?://adx-ad-prod\.wkanx\.com/ url script-response-body https://raw.githubusercontent.com/<用户>/<仓库>/main/wanneng-deadads.js
 *   ^https?://adx\.ad\.pre\.wkanx\.com/ url script-response-body https://raw.githubusercontent.com/<用户>/<仓库>/main/wanneng-deadads.js
 *   ^https?://t1\.wkanx\.com/ url script-response-body https://raw.githubusercontent.com/<用户>/<仓库>/main/wanneng-deadads.js
 *   ^https?://di\.wkanx\.com/ url script-response-body https://raw.githubusercontent.com/<用户>/<仓库>/main/wanneng-deadads.js
 *   ^https?://a1\.wkanx\.com/ url script-response-body https://raw.githubusercontent.com/<用户>/<仓库>/main/wanneng-deadads.js
 */

const url = $request.url || "";
// 策略 / 竞价接口多为 protobuf → 返回空体; 配置类接口 → 返回空 JSON
let body = /strategy|hermes\/mock\/bid/i.test(url) ? "" : "{}";
$done({ body });