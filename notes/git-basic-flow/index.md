<p class="tag">Git · GitHub Pages · Workflow</p>

# Git 基础流程：克隆、修改和上传到 GitHub

这篇笔记记录我搭建个人网站时用到的 Git 基础命令。场景是：本地用 VS Code 修改网站文件，然后把修改上传到 GitHub，最后由 GitHub Pages 自动更新网站。

## 1. 第一次克隆仓库

克隆只需要做一次。比如我要把网站仓库放在 D 盘的 `code` 文件夹里：

```powershell
D:
cd D:\code
git clone https://github.com/user/project.git
cd project
code .
```

这里的含义是：

```text
D:                 切换到 D 盘
cd D:\code         进入代码文件夹
git clone ...      从 GitHub 下载仓库
cd project 进入项目文件夹
code .             用 VS Code 打开当前项目
```

克隆完成后，本地目录大概是：

```text
D:\code\project
```

## 2. 每次修改前先拉取最新版本

如果本地仓库已经存在，以后每次开始修改前，建议先执行：

```powershell
cd D:\code\project
git pull
```

`git pull` 的作用是从 GitHub 拉取最新代码，避免本地版本落后。

## 3. 用 VS Code 修改文件

个人网站常见需要修改的文件包括：

```text
index.html            首页
projects.html         项目页
notes.html            笔记页
cv.html               简历页
assets/css/style.css  样式文件
```

修改网页内容时，主要是在 VS Code 左侧文件栏中点开对应文件，然后直接编辑。

终端不是用来写网页内容的，终端主要用来执行 Git 命令。

## 4. 查看修改状态

改完文件后，先查看 Git 当前状态：

```powershell
git status
```

如果看到类似：

```text
modified: index.html
```

说明这个文件被修改过。

## 5. 添加修改

把所有修改加入暂存区：

```powershell
git add .
```

这里的 `.` 表示添加当前项目中的所有修改。

也可以只添加某一个文件，例如：

```powershell
git add index.html
```

## 6. 提交修改

提交修改，并写一句说明：

```powershell
git commit -m "update website"
```

更具体一点也可以写：

```powershell
git commit -m "update homepage content"
```

提交信息不用太复杂，但要能看出来这次改了什么。

## 7. 上传到 GitHub

提交完成后，把本地修改推送到 GitHub：

```powershell
git push
```

如果 push 成功，GitHub 仓库就会更新。对于 GitHub Pages 网站，稍等一会儿后，网站页面也会自动更新。

## 8. 日常完整流程

以后每次修改网站，完整流程就是：

```powershell
cd D:\code\project
git pull

# 用 VS Code 修改 index.html / projects.html / cv.html / notes.html 等文件

git status
git add .
git commit -m "update website"
git push
```

## 9. 查看当前分支

查看当前所在分支：

```powershell
git branch
```

如果显示：

```text
* main
```

说明当前在 `main` 分支。

个人 GitHub Pages 网站一般从 `main` 分支发布，所以平时在 `main` 分支修改和推送即可。

## 10. GitHub CLI 认证问题

如果 `git push` 时出现认证失败，例如：

```text
Invalid username or token. Password authentication is not supported for Git operations.
```

说明 GitHub 不再支持用账号密码直接 push，需要使用 GitHub CLI 或 token 认证。

如果 GitHub CLI 已安装，但 `gh` 命令不可用，可以使用完整路径：

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" auth login
& "C:\Program Files\GitHub CLI\gh.exe" auth setup-git
git push
```

登录成功后，一般以后就不需要重复认证。

## 11. 一句话总结

```text
clone 只做一次；以后都是 pull → 改文件 → add → commit → push。
```
