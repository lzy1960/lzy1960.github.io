---
title: wsl2配置前端开发环境
icon: linux
isOriginal: true
date: 2022-11-11
tag: [前端, wsl2]
star: true
---

## 开始

> 本文根据自己在配置 wsl 过程中遇到的问题，整理出一套在 wsl 中配置前端开发环境的流程
>
> 因此，省略了创建 wsl 子系统的步骤
>
> 按照以下顺序操作即可

### 还原备份

```bash
wsl --import Ubuntu-22.04 e:\Ubuntu-22.04 e:\Ubuntu-22.04.tar
```

### 设置默认登录用户

```bash
sudo vim /etc/wsl.conf
```

```ini
[user]
default=xxx

[interop]
enable=false
appendWindowsPath=true

[network]
generateResolvConf = false
```

### 设置代理

临时给 bash 设置代理，之后 bash 就不用了

> 采用 v2rayN 进行代理

```bash
vim ~/.bashrc
# 以下是文件中的新增
export hostip=$(cat /etc/resolv.conf |grep -oP '(?<=nameserver\ ).*')
alias setss='export all_proxy="socks5://${hostip}:10810"'
alias unsetss='unset all_proxy'
setss # 每次进入终端都配置代理
```

### zsh

```bash
sudo apt-get install zsh
chsh -s /bin/zsh # 设为默认终端
```

### oh-my-zsh + 插件

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 配置 zsh

重启 wsl 终端，输入 `ezs`

配置地址：https://github.com/lzy1960/powershell-config/blob/main/.zshrc

配置中包含了 npm 别名、git 别名、样式等配置，直接复制粘贴即可

完成后输入 `szs` 使配置生效

### 新建项目文件夹

```bash
mkdir ~/Desktop/project
```

### 安装 nvm, nodejs

跟着文档走：https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl

### 配置静态 ip

```bash
# 在windows中
wsl -d Ubuntu-22.04 -u root ip addr del $(ip addr show eth0 ^| grep 'inet\b' ^| awk '{print $2}' ^| head -n 1) dev eth0
wsl -d Ubuntu-22.04 -u root ip addr add 192.168.50.2/24 broadcast 192.168.50.255 dev eth0
wsl -d Ubuntu-22.04 -u root ip route add 0.0.0.0/0 via 192.168.50.1 dev eth0
wsl -d Ubuntu-22.04 -u root echo nameserver 192.168.50.1 ^> /etc/resolv.conf
powershell -c "Get-NetAdapter 'vEthernet (WSL)' | Get-NetIPAddress | Remove-NetIPAddress -Confirm:$False; New-NetIPAddress -IPAddress 192.168.50.1 -PrefixLength 24 -InterfaceAlias 'vEthernet (WSL)'; Get-NetNat | ? Name -Eq WSLNat | Remove-NetNat -Confirm:$False; New-NetNat -Name WSLNat -InternalIPInterfaceAddressPrefix 192.168.50.0/24;"
```

然后重启 wsl 终端

> 重启电脑以后会失效，需要重新运行脚本

### 配置 git

```bash
git config --global user.name xxx # 修改为自己的
git config --global user.email xxxxxx # 修改为自己的
git config --global credential.helper store # 防止每次都需要输入密码

git config --global core.ignorecase false              # 开启大小写敏感
git config --global merge.conflictstyle diff3          # 三路合并(3-way merge)，便于合并解决冲突
git config --global credential.helper store            # 不用每次询问密码
git config --global merge.ff false                     # 非快进合并，强制产生merge节点
git config --global pull.ff true                       # overrides merge.ff when pulling
```

配置完成，可以开始开发了

## 使用中可能会遇到的问题

### dpkg warning files list file for package 解决方法

```bash
sudo apt-get install --reinstall $(sudo apt-get install unzip | grep "warning: files list file for package '" | grep -Po "[^'\n ]+'" | grep -Po "[^']+");
```

第一句 `sudo apt-get install unzip` 是为了获取到所有的问题包，有时需要换成其他的语句

这时候去吃个饭，吃完就好了

### Zone. Identifier 文件

在 `powershell` 中执行以下命令即可

```bash
find . -name "*:Zone.Identifier" -type f -delete
```
