# wanneng-deadads — 万能钥匙 (Lite) 去广告 · Quantumult X

针对 **万能钥匙 Lite（`com.wifi.masterkey.lite`）** 的 QX 网络层去广告规则。
原理：拦截广告中台与各广告 SDK 的基础设施域名，其中 `wkanx.com`（连尚广告中台）是 FSMix 聚合层的配置下发源，拦截后穿山甲/优量汇/快手/百度/章鱼各路的调度整体停摆。

> ⚠️ 网络层方案：不拦已缓存素材与本地逻辑；有巨魔/越狱的设备建议使用 dylib 方案（更强）。

## 文件

| 文件 | 说明 |
|---|---|
| `wanneng-deadads.filter` | 主规则（连接级拦截，零 MITM，推荐） |
| `wanneng-deadads-rewrite.snippet` | 温和模式：wkanx 接口返回空（可选，需 MITM） |
| `wanneng-deadads.js` | 温和模式 JS 版（可选，需 MITM + script-response-body） |

## Quantumult X 导入

把下面两行贴进你的 QX 配置（将 `<用户>/<仓库>` 换成实际地址）：

```
[filter_remote]
https://raw.githubusercontent.com/<用户>/<仓库>/main/wanneng-deadads.filter, tag=万能钥匙去广告, enabled=true
```

（可选·温和模式；与上面的 wkanx 规则二选一或同时存在均可，同时存在时连接拦截优先）

```
[rewrite_remote]
https://raw.githubusercontent.com/<用户>/<仓库>/main/wanneng-deadads-rewrite.snippet, tag=万能钥匙去广告(温和), enabled=true
```

国内直连更稳的镜像（jsdelivr）：

```
https://cdn.jsdelivr.net/gh/<用户>/<仓库>@main/wanneng-deadads.filter
```

## 已知局限

- 不拦已缓存广告素材（清一次 app 数据即可）
- QUIC/UDP 通道（app 内置 Tquic）可能绕过域名规则，个别场景漏网
- 走 `lianwifi.com` 的自家运营位不在拦截范围（与核心功能同域）

## 依据

域名清单来自对 IPA 的静态分析（Mach-O / ObjC 元数据 / 字符串扫描）：
`adx-ad-prod.wkanx.com/config/strategy/v2`、`mon.snssdk.com`、`mazu.m.qq.com`、`api.kuaishouzt.com`、`mobads.baidu.com` 等。