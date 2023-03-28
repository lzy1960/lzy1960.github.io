---
title: wsl出现Vmmem内存占用过大的问题
author: Storm Lee
icon: linux
isOriginal: true
date: 2023-03-28
tag: [前端, wsl2]
star: true
---

分步解决方法

## 定期执行缓存删除

在 WSL bash 上，执行

```bash
sudo crontab -e -u root
```

并添加以下行：

```bash
_/15 _ \* \* \* sync; echo 3 > /proc/sys/vm/drop_caches; touch /root/drop_caches_last_run
# “ \* / 15 ”表示将每 15 分钟执行一次。您可以根据需要更改它
```

## 自动启动 cron 服务

在〜/ .bashrc 上添加以下行：

```bash
[ -z "$(ps -ef | grep cron | grep -v grep)" ] && sudo /etc/init.d/cron start &> /dev/null
```

## 允许启动 cron 服务而无需输入 root 密码，

在 WSL bash 上执行$ sudo visudo 并添加以下行：

```bash
%sudo ALL=NOPASSWD: /etc/init.d/cron start
```

## （可选） 硬限制最大内存

默认情况下，它限制为主机内存的 80％，如果要更改它，请在主机上创建一个具有以下内容的.wslconfig 文件%UserProfile%：

```ini
[wsl2]
memory=4GB
swap=8GB
localhostForwarding=true
```

## 最后，要确保所有更改都生效，请在 cmd.exe 上执行 `wsl --shutdown` 。

重新打开您的 WSL 终端，然后玩得开心:)

    您可以通过查看 `/root/drop_caches_last_run` 上次修改日期来检查 cron 作业是否正在相应地运行：

```bash
sudo stat -c '%y' /root/drop_caches_last_run
```
