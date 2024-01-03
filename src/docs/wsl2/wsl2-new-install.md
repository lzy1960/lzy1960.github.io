---
title: 💪WSL2是最好的linux发行版！新版wsl2安装教程
icon: linux
isOriginal: true
date: 2024-01-03
tag: [前端, wsl2]
star: true
---

![wsl2-linux](/assets/images/wsl2/wsl2-linux.png)

> 本文根据自己在配置 wsl 过程中遇到的问题，整理出一套在 wsl 中配置前端开发环境的流程
>
> 按照以下顺序操作即可
>
> 也可以参阅官方教程：[https://learn.microsoft.com/zh-cn/windows/wsl/install](https://learn.microsoft.com/zh-cn/windows/wsl/install)

## 前言

由于 wsl2 有了完整的 linux 内核，网络也是独立的网络，在 wsl2 中发起的服务需要通过端口转发的方式才能被局域网访问，因此一直被人保守诟病。

但在 2023 年 9 月更新了 wsl2.0 版本，彻底解决了 wsl2 与 Windows 之间的网络问题。

**🎉 现在我宣布，wsl2 是最好的 linux 发行版！**

## 先决条件

必须运行 Windows 10 版本 2004 及更高版本（内部版本 19041 及更高版本）或 Windows 11 才能使用以下命令。 如果使用的是更早的版本，请参阅[手动安装页](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual)。

## 本人所使用的操作系统

- 版本：Windows 11 23H2
- 操作系统版本：22631.2861

## 安装前的准备工作

1. 按下 win 键，或点击任务栏的搜索框，输入【windows 功能】，点击打开【启用或关闭 windows 功能】
   ![启用或关闭 windows 功能](/assets/images/wsl2/windows-search-func.png)
2. 勾选如下选项，并点击【确定】，等待安装完成后，按照提示重启计算机
   ![勾选虚拟机功能](/assets/images/wsl2/windows-func-selection.png)
3. 重启后，打开命令行终端，输入`wsl -v`，可正常返回大量参数

## 开始安装

1. 输入以下命令，查看各种可安装的发行版 linux，各位可自行选择

```bash
wsl -l -o
```

输出如下内容：👇

```sh
NAME                                   FRIENDLY NAME
Ubuntu                                 Ubuntu
Debian                                 Debian GNU/Linux
kali-linux                             Kali Linux Rolling
Ubuntu-18.04                           Ubuntu 18.04 LTS
Ubuntu-20.04                           Ubuntu 20.04 LTS
Ubuntu-22.04                           Ubuntu 22.04 LTS
OracleLinux_7_9                        Oracle Linux 7.9
OracleLinux_8_7                        Oracle Linux 8.7
OracleLinux_9_1                        Oracle Linux 9.1
openSUSE-Leap-15.5                     openSUSE Leap 15.5
SUSE-Linux-Enterprise-Server-15-SP4    SUSE Linux Enterprise Server 15 SP4
SUSE-Linux-Enterprise-15-SP5           SUSE Linux Enterprise 15 SP5
openSUSE-Tumbleweed                    openSUSE Tumbleweed
```

2. 此处我选择 Ubuntu-22.04，输入以下命令后会执行安装，等待安装完成，先不要运行

```sh
wsl --install Ubuntu-22.04
```

3. 将默认版本设置为 wsl2

```sh
wsl --set-default-version 2
```

4. 输入`wsl`进入系统，提示初始化用户名和密码，一定要记住

至此，wsl2 已经可以使用，但为了更好的体验，需要继续进行配置

## 配置

> **注意：由于 9 月发布的新版 wsl2 新增了镜像网络的功能，老版教程的【网络代理】、【配置静态 ip】、【自动清理缓存】无需在进行配置。**
>
> 更新日志在此：[https://devblogs.microsoft.com/commandline/windows-subsystem-for-linux-september-2023-update/](https://devblogs.microsoft.com/commandline/windows-subsystem-for-linux-september-2023-update/)

### 将 wsl2 导出到其他分区（可选）

wsl2 默认安装在 C 盘，如果您为了节省 C 盘空间，可以转移至其他分区

> 如果需要转移，那么尽量在首次安装或还未重度使用时进行操作，**因为后期 wsl 会非常占用空间，也会很慢**（本人已经达到了 100+GB）

可分别执行以下命令：

```sh
## 以下每条命令，类似【K:\Ubuntu-22.04_bak.tar】的地址可自行修改
## 1. 备份系统
wsl --export Ubuntu-22.04 K:\Ubuntu-22.04_bak.tar
## 2. 还原系统至某个目录
## 格式为：wsl --import Ubuntu-22.04 xxx(目标路径) xxx(刚刚备份的地址)
wsl --import Ubuntu-22.04 k:\Ubuntu-22.04 K:\Ubuntu-22.04_bak.tar
## 3. 将备份的系统tar文件删除(可选)
```

### 修改基础配置

打开用户目录`C:\Users\用户名`，右键新建 txt 文件，并修改完整名称为.wslconfig（包括后缀名），修改文件内容为：

```ini
[wsl2]
memory=20GB                   #限制最大内存，可自行修改
processors=8                  #限制线程数，可自行修改
localhostforwarding=true
nestedVirtualization=true
guiApplications=true
swap=20GB                     #限制最大交换空间，可自行修改
dnsTunneling=true             #新版dns隧道，建议不改
firewall=true                 #同步windows防火墙，建议不改
networkingMode=mirrored       #新版的镜像网络，建议不改
autoProxy=true                #自动代理，建议不改

[experimental]
autoMemoryReclaim=gradual     #自动回收内存，建议不改
hostAddressLoopback=true      #分配给主机的 IP 地址允许容器连接到主机，建议不改
useWindowsDnsCache=true       #与dnsTunneling相关，建议不改
bestEffortDnsParsing=true     #与dnsTunneling相关，建议不改
sparseVhd=true                #自动清理磁盘空间，建议不改
```

### 设置默认登录用户

在 wsl 系统中，输入以下命令：

```sh
sudo vim /etc/wsl.conf
```

更新配置如下：

```ini
[user]
default=xxx #此处自行修改

[interop]
enable=false
appendWindowsPath=true
```

在 windows 端执行以下命令重启 wsl，目的是切换为默认用户（**必须**）：

```sh
wsl --shutdown
wsl
```

### 安装 zsh

```sh
sudo apt-get install zsh
chsh -s /bin/zsh ## 设为默认终端
```

### oh-my-zsh + 插件

```sh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
## npm-aliases
git clone https://github.com/lzy1960/zsh-npm-aliases ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/npm-aliases
## zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
## zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 配置 zsh

将[此链接](https://github.com/lzy1960/powershell-config/blob/main/.zshrc)中的全部内容复制到`~/.zshrc`文件中

或直接执行以下脚本，即可替换内容：

```sh
curl -o ~/.zshrc https://raw.githubusercontent.com/lzy1960/powershell-config/main/.zshrc
```

配置中包含了 npm 别名、git 别名、样式等配置，直接复制粘贴即可
完成后输入`source ~/.zshrc`使配置生效

### 新建项目文件夹

```sh
mkdir ~/Desktop ~/Desktop/project
```

### 安装 nvm, nodejs

跟着文档走：[https://learn.microsoft.com/zh-cn/windows/dev-environment/javascript/nodejs-on-wslopen in new window](https://learn.microsoft.com/zh-cn/windows/dev-environment/javascript/nodejs-on-wsl)

### 🚫 老版教程中无需进行的配置（无需配置，此处只是列出）

#### 🚫 网络代理（无需配置）

新版 wsl2 支持了镜像网络与自动代理，所以无需配 置网络代理，只需在`.wslconfig`文件中添加如下配置即可：

```ini
[wsl2]
firewall=true
networkingMode=mirrored
autoProxy=true
```

> 此配置需要  [Windows 版本 22H2](https://blogs.windows.com/windows-insider/2023/09/14/releasing-windows-11-build-22621-2359-to-the-release-preview-channel/)  或更高版本。

#### 🚫 配置静态 ip

新版 wsl2 支持了镜像网络，其中有一个实验性的配置为`hostAddressLoopback`，将此配置置为 true，则会将 ip 分配给主机

> 此配置需要  [Windows 版本 22H2](https://blogs.windows.com/windows-insider/2023/09/14/releasing-windows-11-build-22621-2359-to-the-release-preview-channel/)  或更高版本。

#### 🚫 通过局域网访问 wsl2

原因与[[#🚫 配置静态 ip]] 相同
