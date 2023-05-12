---
title: 通过局域网访问wsl2
icon: linux
isOriginal: true
date: 2023-04-13
tag: [前端, wsl2]
star: true
---

## 背景

- 目前工作中，我已经在使用 wsl2 作为前端开发环境，所有 web 端的代码都在 wsl2 中，但小程序还是在 windows 中开发，并且需要用到`web-view`内嵌
- 经过测试，小程序不能直接访问 wsl2 中启动的项目，所以需要用到此方法

## 步骤

1. 防火墙添加入站规则，配置端口，或直接关闭防火墙
2. `ipconfig`查看 ip 地址
   - 宿主 ip 为 192.168.30.48
   - wsl2 的 ip 为 192.168.50.2
3. 端口映射

```powershell
netsh interface portproxy add v4tov4 listenport=12345 connectaddress= 192.168.50.2 connectport=8080 listenaddress=0.0.0.0 protocol=tcp
```

4. 使用完毕后，可删除端口映射

```powershell
# 查看所有监听的端口
netsh interface portproxy show all
# 删除某个端口的监听
netsh interface portproxy delete v4tov4 listenport=22 listenaddress=0.0.0.0
```

完成上述步骤，就能通过`http://本机ip:映射端口`（_`http://192.168.30.48:12345`_）访问
