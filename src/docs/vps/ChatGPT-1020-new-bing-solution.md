---
title: 如何修复ChatGPT 访问被拒绝错误代码1020
icon: alias
isOriginal: true
date: 2023-04-10
tag: [服务器, vps]
star: true
---

## 前言

ChatGpt 出来已经很久了，某天兴致勃勃地注册了账号，准备体验一下它的强大之处，一个大大的`Access denied`出现在我眼前，错误代码为 1020，经过网上的一番查找，确认 vps 的 ip 被封了。于是，疯狂寻找解决办法，最终找到了这个方法。

![chatgpt拒绝图](/assets/images/vps/chatgpt_access_denied.webp)

## 准备工作

- 一个海外的 vps

## 开始

### 搭建 xray 服务

使用 mack-a 大神的[一键脚本](https://github.com/mack-a/v2ray-agent)，根据步骤完成安装
下方贴出脚本代码：

```bash
wget -P /root -N --no-check-certificate "https://raw.githubusercontent.com/mack-a/v2ray-agent/master/install.sh" && chmod 700 /root/install.sh && /root/install.sh
```

### 搭建 warp 服务

使用甬哥大神的[一键脚本](https://github.com/yonggekkk/warp-yg)，根据步骤和视频完成安装，一定记得要分配 ipv6 地址
下方贴出脚本代码：

```bash
wget -N https://gitlab.com/rwkgyg/CFwarp/raw/main/CFwarp.sh && bash CFwarp.sh
```

### 配置 ipv6 分流

- 运行`vasma`打开 xray 脚本
- 选择`ipv6分流`
- 选择`添加域名`
- 输入`openai`
- 回车

完成后可选择`查看已分流域名`，会显示 openai 和 bing，说明已经配置完成

## 测试

现在，打开[ChatGPT 官网](https://chat.openai.com/)，发现已不再被拒绝，可以正常使用了

## 补充

偶然发现微软 New Bing 也无法访问了，会提示网络被拒绝，如下图

![newbing拒绝图](/assets/images/vps/newbing_error.webp)

### 解决办法

步骤相同，根据上述“配置 ipv6 分流”的步骤，只需要在`ipv6分流`的列表中加入`bing`即可，即输入`openai,bing`
测试一下，发现已不再报网络被拒绝，可以正常交流
