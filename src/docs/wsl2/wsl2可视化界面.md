---
title: wsl2可视化界面
author: Storm Lee
icon: linux
isOriginal: false
date: 2023-03-30
tag: [前端, wsl2]
star: true
figure: true
---

#### 前言

微软正在计划让 WSL2 支持基于 RDP 的 GUI，虽然这一特性目前还不可用，但我们还是能通过别的一些手段来达到目的。

#### 准备环境

* Windows 10 （版本：2004）

* WSL2（Ubuntu 20.04 LTS）（[如何安装 WSL2?](https://docs.microsoft.com/zh-cn/windows/wsl)）

#### 安装工具

1、先把 `apt`   `update`  &  `upgrade`

 `sudo apt update && sudo apt -y upgrade`

2、安装 `XRDP` （远程连接协议）、 `Xfce` （轻量级桌面环境，安装时会提示选择 gdm3 或 lightdm，我选了 gdm3）

```bash
sudo apt-get purge xrdp
sudo apt install -y xrdp
sudo apt install -y xfce4
sudo apt install -y xfce4-goodies
```

（**非必须**）更改 `XRDP` 的一些配置：增加 bpp(bits per pixel)，让远程连接质量更好

```bash
sudo sed -i 's/max_bpp=32/#max_bpp=32\nmax_bpp=128/g' /etc/xrdp/xrdp.ini sudo sed -i 's/xserverbpp=24/#xserverbpp=24\nxserverbpp=128/g' /etc/xrdp/xrdp.ini echo xfce4-session > ~/.xsession
```

接下来更改 `XRDP` 的启动脚本，让它同时启动 `Xfce`

```bash
sudo vim /etc/xrdp/startwm.sh
```

把文件的最后几行改成这样：

```vim
# test -x /etc/X11/Xsession && exec /etc/X11/Xsession
# exec /bin/sh /etc/X11/Xsession
# xfce startxfce4
```

最后，启动 `XDRP`

```bash
sudo /etc/init.d/xrdp start
```

#### 开始使用

使用 Windows 的远程桌面连接，通过 WSL 的 IP 地址 `:3389` ， `3389` 为默认端口，可以在配置 `/etc/xrdp/xrdp.ini` 中更改。
用 WSL 的用户名和密码登录进系统

![效果图](/assets/images/wsl2/wsl2-desktop.png)
