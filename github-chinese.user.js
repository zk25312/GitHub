// ==UserScript==
// @name         GitHub汉化
// @namespace    https://github.com/
// @version      1.2.1
// @description  GitHub深度汉化脚本。
// @author       byzk
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @noframes
// @license MIT
// ==/UserScript==
(function () {
  "use strict";
  /* =============================================================
   * 0. 开关控制
   * ============================================================= */
  let isEnabled = GM_getValue("github_zh_enabled", true);
  GM_registerMenuCommand(
    isEnabled ? "🟢 汉化状态：已开启 (点击切换)" : "⚪ 汉化状态：已关闭 (点击切换)",
    () => {
      GM_setValue("github_zh_enabled", !isEnabled);
      location.reload();
    }
  );
  if (!isEnabled) return;
  /* =============================================================
   * 1. 词库
   * ============================================================= */
  // 1.1 精确短语映射（整段文本完全匹配时替换）
  const EXACT_MAP = {
  
  // ---------------- Projects 项目看板 ----------------
  "Recently viewed": "最近查看",
  "Created by me": "我创建的项目",
  "Create your first GitHub project": "创建您的第一个 GitHub 项目看板",
  
  // ---------------- 我的代码仓库与贡献 ----------------
  "My contributions": "我的贡献",
  "My repositories": "我的代码仓库",
  "My forks": "我的派生仓库",
  "Admin access": "管理员权限",
  "Views": "视图",
  "No saved views": "暂无保存的视图",
  "Relevance": "相关度",
  "No repositories matched your search.": "没有与您的搜索匹配的代码仓库。",
  "Try a different search query.": "请尝试其他搜索条件。",
  "ProTip!": "实用小提示！",
  
  // ---------------- Pull Requests 收件箱 (Inbox) ----------------
  "Inbox": "收件箱",
  "Authored by me": "我发起的 PR",
  "Assigned to me": "指派给我的 PR",
  "Involves me": "与我相关的 PR",
  "Review requests": "审查请求",
  "Needs your review": "需要您审查",
  "Needs your teams' review": "需要您所在团队审查",
  "Your drafts": "您的草稿",
  "Waiting for review or checks": "等待审查或自动化检查",
  "Needs action": "需要处理",
  "Ready to merge": "可以合并",
  "Select repositories": "选择代码仓库",
  "Updated: Last month": "更新于：上个月",
  "Customize your view": "自定义您的视图",
  
  // ---------------- Issues 列表与搜索 ----------------
  "Mentioning me": "提及我的",
  "No results matched your search": "没有与您的搜索匹配的结果",
  
  // ---------------- Copilot Chat 对话工作台 ----------------
  "New chat": "新建对话",
  "Agents": "智能体",
  "Spaces": "知识空间",
  "Ask": "提问",
  "Debug": "调试分析",
  "Agent": "智能体",
  "Create issue": "创建议题",
  "Write code": "编写代码",
  "The GitHub Copilot app": "GitHub Copilot 桌面客户端",
  "New": "新品",
  "Download for Windows": "下载 Windows 版",
  
  // ---------------- Codespaces 云端环境与快速模板 ----------------
  "All": "全部",
  "Templates": "模板库",
  "Your instant dev environment": "您的即时云端开发环境",
  "Go from code to commit faster on any project.": "在任何项目中，从编写代码到提交都更加迅速。",
  "Go to docs": "查看开发文档",
  "Explore quick start templates": "探索快速入门模板",
  "See all": "查看全部",
  "Use this template": "使用此模板",
  "Blank": "空白模板",
  "Getting started with GitHub Codespaces": "GitHub Codespaces 入门指南",
  "Learn core concepts": "学习核心概念",
  "Configure and manage": "配置与管理",
  "Develop locally": "本地开发体验",
  
  // ---------------- Explore 探索与 Trending 趋势榜 ----------------
  "Topics": "热门话题",
  "Trending": "趋势榜",
  "Collections": "精选题集",
  "Events": "社区活动",
  "GitHub Sponsors": "GitHub 赞助者",
  "Trending repositories": "热门趋势仓库",
  "The Download": "下载动态 / 快讯",
  
  // ---------------- Marketplace 应用与扩展商店 ----------------
  "Featured": "精选推荐",
  "Apps": "应用",
  "Create extension": "创建扩展",
  "Enhance your workflow with extensions": "使用扩展增强您的开发工作流",
  "Recommended": "官方推荐",
  "Recently added": "最近上架",
  
  // ---------------- MCP (Model Context Protocol) 注册表与目录 ----------------
  "Connect models to the real world": "将 AI 模型连接到现实世界",
  "All MCP servers": "全部 MCP 服务器",
  "Install": "安装",
  
  // ---------------- 右上角用户主菜单与状态弹窗 ----------------
  "Set status": "设置状态",
  "Profile": "个人主页",
  "Gists": "代码片段 (Gist)",
  "Sponsors": "赞助管理",
  "Copilot settings": "Copilot 设置",
  "Try Enterprise": "试用企业版",
  "Free": "免费版",
  "Edit status": "编辑个人状态",
  "What's happening": "分享近况",
  "Working from home": "居家办公",
  "Out sick": "生病请假",
  "On vacation": "度假中",
  "Focusing": "专注工作中",
  "Busy": "忙碌状态",
  "Expiration": "过期时间",
  "Never": "永不过期",
  "Visible to": "可见范围",
  "Everyone": "所有人可见",
  "Clear status": "清除状态",
  "Create list": "创建收藏列表",
  "Name ascending (A-Z)": "名称升序 (A-Z)",
  "Name descending (Z-A)": "名称降序 (Z-A)",
  "Last updated": "最近更新",
  "Recently starred": "最近标星",
  
  // ---------------- 全局搜索与筛选 ----------------
  "Filter by": "按条件筛选",
  "AI resources": "AI 资源库",
  "More": "更多",
  "Languages": "编程语言",
  "Sort by": "排序方式",
  "Sort by:": "排序方式：",
  "Sort:": "排序：",
  "Best match": "最佳匹配",
  "Most stars": "最多标星",
  "Fewest stars": "最少标星",
  "Most forks": "最多派生",
  "Fewest forks": "最少派生",
  "Recently active": "最近活跃",
  "Least recently active": "最久未活跃",
  "Recently updated": "最近更新",
  "Least recently updated": "最久未更新",
  "Search syntax tips": "搜索语法提示",
  "Give feedback": "提供反馈",
  "Advanced search": "高级检索",
  "All GitHub": "全站搜索",
  "In this repository": "在当前仓库搜索",
  "In this organization": "在当前组织搜索",
  
  // ---------------- 顶部全局导航 ----------------
  "Home": "主页",
  "Feed": "动态关注流",
  "All issues": "全部议题",
  "All pull requests": "全部合并请求",
  "All repositories": "全部代码仓库",
  "MCP registry": "MCP 工具注册表",
  "Top repositories": "常用代码库",
  "Dashboard": "仪表盘",
  "Pull requests": "合并请求",
  "Issues": "议题",
  "Codespaces": "云端开发环境",
  "Marketplace": "应用市场",
  "Explore": "探索发现",
  "Notifications": "通知中心",
  "New repository": "新建代码仓库",
  "Import repository": "导入外部代码库",
  "New codespace": "新建 Codespace",
  "New gist": "新建代码片段",
  "New organization": "新建组织",
  "New project": "新建项目看板",
  "Your profile": "个人主页",
  "Your repositories": "我的代码库",
  "Your projects": "我的项目看板",
  "Your stars": "我的标星收藏",
  "Your gists": "我的 Gist 片段",
  "Your sponsors": "赞助与支持",
  "Your organizations": "我的组织",
  "Your enterprises": "我的企业",
  "Feature preview": "新功能预览",
  "Settings": "账号与系统设置",
  "Sign in": "登录",
  "Sign up": "注册账号",
  "Sign out": "退出登录",
  
  // ---------------- Settings 个人设置页与侧边栏 ----------------
  "Public profile": "公开个人资料",
  "Account": "账户设置",
  "Appearance": "外观偏好",
  "Accessibility": "无障碍访问",
  "Access": "访问权限",
  "Billing and licensing": "账单与许可证",
  "Emails": "电子邮箱",
  "Password and authentication": "密码与身份验证",
  "Sessions": "当前会话",
  "SSH and GPG keys": "SSH 与 GPG 密钥",
  "Credentials": "凭据管理",
  "Organizations": "组织管理",
  "Enterprises": "企业设置",
  "Moderation": "内容审核与管理",
  "Blocked users": "已屏蔽用户",
  "Interaction limits": "互动频率限制",
  "Code, planning, and automation": "代码、规划与自动化",
  "Repositories": "代码仓库",
  "Packages": "依赖包",
  "Copilot": "Copilot 智能副驾",
  "Pages": "Pages 静态网站",
  "Saved replies": "快捷回复",
  "Integrations": "集成与扩展",
  "Applications": "授权应用",
  "Scheduled reminders": "定时提醒",
  "Security": "安全设置",
  "Code security and analysis": "代码安全与漏洞分析",
  "Archive": "数据归档",
  "Name": "姓名 / 昵称",
  "Public email": "公开邮箱",
  "Select a verified email to display": "选择一个已验证的邮箱进行展示",
  "email settings": "邮箱设置",
  "Bio": "个人简介",
  "Tell us a little bit about yourself": "简要介绍一下您自己",
  "Pronouns": "人称代词",
  "Don't specify": "不指定",
  "Custom": "自定义",
  "URL": "个人主页 / 网站链接",
  "Social accounts": "社交媒体账号",
  "Company": "就职公司 / 机构",
  "Location": "所在地 / 城市",
  "Display current local time": "在个人主页显示我当前的本地时间",
  "Update profile": "更新个人资料",
  "Profile picture": "个人头像",
  "Edit picture": "修改头像",
  "Upload a photo...": "上传照片...",
  "Contributions & Activity": "贡献与动态设置",
  "Make profile private and hide activity": "将个人资料设为私有并隐藏动态",
  "Include private contributions on my profile": "在个人主页统计中包含私有仓库的贡献",
  
  // ---------------- 仓库核心选项卡与状态 ----------------
  "Code": "代码",
  "Actions": "自动化流水线",
  "Projects": "项目规划",
  "Wiki": "知识库",
  "Insights": "数据洞察",
  "Discussions": "社区讨论",
  "Public": "公开",
  "Private": "私有",
  "Fork": "派生",
  "Forks": "派生分支",
  "Star": "标星",
  "Starred": "已标星",
  "Watch": "关注",
  "Unwatch": "取消关注",
  "Pin": "置顶",
  "Unpin": "取消置顶",
  "Compare": "对比差异",
  "Commits": "提交记录",
  "commit": "次提交",
  "branch": "个分支",
  "branches": "个分支",
  "tag": "个标签",
  "tags": "个标签",
  "releases": "个发行版",
  "release": "个发行版",
  "environment": "个环境",
  "environments": "个环境",
  "contributors": "位贡献者",
  "contributor": "位贡献者",
  "Deployments": "部署记录",
  "Latest": "最新版本",
  
  // ---------------- 代码文件操作 ----------------
  "Go to file": "快速查搜文件",
  "Add file": "添加文件",
  "Create new file": "创建新文件",
  "Upload files": "上传已有文件",
  "Clone": "克隆代码",
  "Download ZIP": "下载 ZIP 压缩包",
  "Open with GitHub Desktop": "使用 GitHub Desktop 打开",
  "Open in Codespaces": "在 Codespaces 中打开",
  "View code": "查看源码",
  "History": "历史记录",
  "Blame": "溯源 (Blame)",
  "Raw": "原始数据",
  "Copy raw contents": "复制原始代码",
  "Download raw file": "下载源文件",
  "Edit this file": "在线编辑该文件",
  "Delete this file": "删除该文件",
  "Commit changes...": "提交修改...",
  "Commit changes": "提交修改",
  "Cancel changes": "放弃修改",
  
  // ---------------- Issue / PR 工作流 ----------------
  "New issue": "提出新议题",
  "New pull request": "发起合并请求",
  "Open": "开启中",
  "Closed": "已关闭",
  "Merged": "已合并",
  "Draft": "草稿态",
  "Conversation": "对话交流",
  "Checks": "CI 自动化检查",
  "Files changed": "代码变动详情",
  "Reviewers": "代码审查员",
  "Assignees": "经办/负责人",
  "Labels": "标签分类",
  "Milestone": "里程碑目标",
  "No milestone": "无里程碑",
  "Development": "关联开发任务",
  "Close issue": "关闭议题",
  "Reopen issue": "重新开启",
  "Close pull request": "关闭合并请求",
  "Reopen pull request": "重新开启 PR",
  "Merge pull request": "合并代码请求",
  "Squash and merge": "压缩并合并",
  "Rebase and merge": "变基并合并",
  "Confirm merge": "确认合并",
  "Leave a comment": "填写回复内容",
  "Comment": "发表评论",
  "Preview": "效果预览",
  "Write": "编辑编写",
  
  // ---------------- 常用通用按钮与词汇 ----------------
  "Filters": "筛选条件",
  "Sort": "排序规则",
  "Author": "创建者/作者",
  "Label": "按标签筛选",
  "Milestones": "按里程碑筛选",
  "Assignee": "按经办人筛选",
  "Newest": "最新发布",
  "Oldest": "最早发布",
  "Most commented": "讨论最多",
  "Least commented": "讨论最少",
  "Save changes": "保存更改",
  "Save": "保存",
  "Cancel": "取消",
  "Delete": "删除",
  "Edit": "编辑",
  "Update": "更新",
  "Submit": "提交",
  "Copy": "复制",
  "Copied!": "已复制！",
  "Search": "搜索",
  "Filter": "筛选",
  "Clear": "清空",
  "Loading...": "加载中...",
  "Overview": "概览",
  "Stars": "收藏标星",
  "Follow": "关注作者",
  "Unfollow": "取消关注",
  "Edit profile": "修改个人资料",
  "Achievements": "成就勋章",
  "Contribution activity": "贡献动态",
  "Popular repositories": "热门代码库",
  "Pinned": "精选置顶",
  // ---------------- 扩展词库 ----------------
    "Contributors": "贡献者",
    "Languages": "语言构成",
    "License": "许可证",
    "About": "关于",
    "Readme": "自述文件",
    "Releases": "版本发布",
    "Latest": "最新版本",
    "Create a new release": "创建新版本",
    "No releases published": "尚未发布版本",
    "Report repository": "举报仓库",
    "Deployments": "部署记录",
    "Edit Pins": "编辑置顶",
    "Pin": "置顶",
    "Unpin": "取消置顶",
    "Unstar": "取消标星",
    "Packages": "软件包",
    "Publish your first package": "发布您的第一个软件包",
  "General": "常规",
  "Collaborators": "协作者",
  "Rulesets": "规则集",
  "Webhooks": "Webhook",
  "Planning": "规划",
  "Advanced Security": "高级安全",
  "Deploy keys": "部署密钥",
  "Secrets and variables": "密钥与变量",
  "GitHub Apps": "GitHub 应用",
  "Security and quality": "安全与质量",
  "Rename": "重命名",
  "Description": "描述",
  "Repository name": "仓库名称",
  "Owner": "所有者",
  "Default branch": "默认分支",
  "Social preview": "社交预览",
  "Template repository": "模板仓库",
  "Template repositories let users generate new repositories with the same directory structure and files.": "模板仓库允许用户以相同的目录结构和文件生成新仓库。",
  "Learn more about template repositories.": "了解更多关于模板仓库的信息。",
  "The default branch is considered the \"base\" branch in your repository, against which all pull requests and code commits are automatically made, unless you specify a different branch.": "默认分支被视为仓库中的“基础”分支，除非您另行指定，所有拉取请求和代码提交都会自动面向它进行。",
  "Upload an image to customize your repository's social media preview.": "上传图片以自定义仓库的社交媒体预览图。",
  "Images should be at least 640×320px (1280×640px for best display).": "图片尺寸至少为 640×320px（最佳显示为 1280×640px）。",
  "Download template": "下载模板",
  "Features": "功能特性",
  "Create a new repository": "创建新仓库",
  "Create repository": "创建仓库",
  "Repositories contain a project's files and version history. Have a project elsewhere?": "仓库包含项目的文件与版本历史。已有现成项目？",
  "Import a repository.": "导入仓库。",
  "Required fields are marked with an asterisk (*).": "必填项已用星号 (*) 标注。",
  "Great repository names are short and memorable. How about": "好的仓库名称简短好记。试试",
  "Choose visibility": "选择可见性",
  "Choose who can see and commit to this repository": "选择谁可以查看和提交此仓库",
  "Add README": "添加 README",
  "READMes can be used as longer descriptions.": "README 可用作更详细的项目说明。",
  "About READMEs": "关于 README",
  "Off": "关",
  "Add .gitignore": "添加 .gitignore",
  ".gitignore tells git which files not to track.": ".gitignore 告诉 git 哪些文件不需要跟踪。",
  "About ignoring files": "关于忽略文件",
  "No .gitignore": "不添加 .gitignore",
  "Add license": "添加许可证",
  "Licenses explain how others can use your code.": "许可证说明了他人可以如何使用您的代码。",
  "About licenses": "关于许可证",
  "No license": "不添加许可证",
  "Create project": "创建项目",
  "Project templates": "项目模板",
  "Start from scratch": "从零开始",
  "Table": "表格",
  "Board": "看板",
  "Roadmap": "路线图",
  "Search templates": "搜索模板",
  "Team planning": "团队规划",
  "Kanban": "看板",
  "Feature release": "功能发布",
  "Bug tracker": "缺陷跟踪",
  "Manage your team's work items, plan upcoming cycles, and understand team capacity": "管理团队工作项、规划即将到来的迭代周期，并了解团队产能",
  "Visualize the status of your project and limit work in progress": "可视化项目状态并限制进行中的工作",
  "Track and triage your bugs": "跟踪并分类您的缺陷",
  "New view": "新建视图",
  "Filter by keyword or by field": "按关键字或字段筛选",
  "Add status update": "添加状态更新",
  "Workflows": "工作流",
  "Title": "标题",
  "Got it": "知道了",
  "Dismiss": "忽略",
  "New timestamp fields available": "新的时间戳字段可用",
  "You can now add Created, Closed, and Updated timestamp fields to your project to track when issues and pull requests were created, closed, or last updated.": "您现在可以为项目添加创建、关闭和更新时间戳字段，以跟踪议题和拉取请求的创建、关闭或最后更新时间。",
  "You can use Control + Space to add an item": "您可以使用 Control + Space 添加条目",
  "untitled project": "未命名项目",
  "Start coding with Codespaces": "使用 Codespaces 开始编码",
  "Add a README file and start coding in a secure, configurable, and dedicated development environment.": "添加 README 文件，在安全、可配置的专属开发环境中开始编码。",
  "Create a codespace": "创建 codespace",
  "Add collaborators to this repository": "为此仓库添加协作者",
  "Search for people using their GitHub username or email address.": "使用 GitHub 用户名或邮箱搜索用户。",
  "Invite collaborators": "邀请协作者",
  "Quick setup — if you've done this kind of thing before": "快速设置 — 如果您以前做过这类操作",
  "Set up in GitHub Desktop": "在 GitHub Desktop 中设置",
  "or": "或",
  "Get started by creating a new file or uploading an existing file. We recommend every repository include a README, LICENSE and .gitignore.": "创建新文件或上传现有文件即可开始。建议每个仓库都包含 README、LICENSE 和 .gitignore。",
  "...or create a new repository on the command line": "…或者在命令行上创建新仓库",
  "...or push an existing repository from the command line": "…或者从命令行推送现有仓库",
  "Enable release immutability": "启用发布不可变性",
  "Disallow assets and tags from being modified once a release is published.": "发布版本一经发布，禁止修改其资产与标签。",
  "Content moderation and management": "内容审核与管理",
  "Code, planning & automation": "代码、规划与自动化",
  "Integrations & extensions": "集成与扩展",
  "Danger Zone": "危险区域",
  "Change repository visibility": "更改仓库可见性",
  "Change visibility": "更改可见性",
  "Transfer ownership": "转移所有权",
  "Transfer": "转移",
  "Archive this repository": "归档此仓库",
  "Archive repository": "归档仓库",
  "Delete this repository": "删除此仓库",
  "Delete repository": "删除仓库",
  "This action cannot be undone.": "此操作无法撤销。",
  "Please type the name of the repository to confirm.": "请输入仓库名称以确认。",
  "I understand the consequences, delete this repository": "我已了解后果，删除此仓库",
  "Update repository": "更新仓库",
  "Remove": "移除",
  "Add": "添加",
  "Add people": "添加成员",
  "Manage access": "管理访问权限",
  "Direct access": "直接访问",
  "Organization access": "组织访问",
  "Base role": "基础角色",
  "Read": "读取",
  "Admin": "管理员",
  "Maintain": "维护",
  "Triage": "分类",
  "Role": "角色",
  "Team": "团队",
  "People": "成员",
  "Invite teams or people": "邀请团队或成员",
  "Search by username, full name, or email": "按用户名、全名或邮箱搜索",
  "New ruleset": "新建规则集",
  "Ruleset name": "规则集名称",
  "Enforcement status": "执行状态",
  "Active": "已启用",
  "Disabled": "已禁用",
  "Evaluate": "评估",
  "Target branches": "目标分支",
  "Target tags": "目标标签",
  "Add target": "添加目标",
  "Bypass list": "绕过列表",
  "Branch name pattern": "分支名称模式",
  "Tag name pattern": "标签名称模式",
  "Protect matching branches": "保护匹配的分支",
  "Require a pull request before merging": "合并前需要拉取请求",
  "Require status checks to pass before merging": "合并前需要通过状态检查",
  "Require conversation resolution before merging": "合并前需要解决所有对话",
  "Require signed commits": "要求签名提交",
  "Require linear history": "要求线性历史",
  "Include administrators": "包含管理员",
  "Allow force pushes": "允许强制推送",
  "Allow deletions": "允许删除",
  "Lock branch": "锁定分支",
  "Do not allow bypassing the above settings": "不允许绕过以上设置",
  "Restrict who can push to matching branches": "限制可推送到匹配分支的人员",
  "Rules applied to everyone including administrators": "规则适用于所有人（包括管理员）",
  "Default branch name": "默认分支名称",
  "Protected tags": "受保护的标签",
  "Add webhook": "添加 Webhook",
  "Payload URL": "负载 URL",
  "Content type": "内容类型",
  "Secret": "密钥",
  "SSL verification": "SSL 验证",
  "Enable SSL verification": "启用 SSL 验证",
  "Which events would you like to trigger this webhook?": "您希望此 Webhook 触发哪些事件？",
  "Just the push event.": "仅推送事件。",
  "Send me everything.": "发送所有事件。",
  "Let me select individual events.": "让我选择单个事件。",
  "Active deliveries": "活跃的投递",
  "Recent deliveries": "最近的投递",
  "Redeliver": "重新投递",
  "Edit webhook": "编辑 Webhook",
  "Delete webhook": "删除 Webhook",
  "New environment": "新建环境",
  "Environment name": "环境名称",
  "Deployment branches and tags": "部署分支与标签",
  "Required reviewers": "必需的审核者",
  "Wait timer": "等待计时器",
  "Deployment protection rules": "部署保护规则",
  "Environment secrets": "环境密钥",
  "Environment variables": "环境变量",
  "New secret": "新建密钥",
  "New variable": "新建变量",
  "Value": "值",
  "Updated": "已更新",
  "Actions secrets and variables": "Actions 密钥与变量",
  "Repository secrets": "仓库密钥",
  "Organization secrets": "组织密钥",
  "Environment secrets and variables": "环境密钥与变量",
  "Dependabot secrets": "Dependabot 密钥",
  "Codespaces secrets": "Codespaces 密钥",
  "Add secret": "添加密钥",
  "Add variable": "添加变量",
  "Deploy key": "部署密钥",
  "Add deploy key": "添加部署密钥",
  "Title for this key": "此密钥的标题",
  "Key": "密钥内容",
  "Allow write access": "允许写入权限",
  "Read-only": "只读",
  "Read and write": "读写",
  "GitHub App": "GitHub 应用",
  "Installed GitHub Apps": "已安装的 GitHub 应用",
  "Configure": "配置",
  "Uninstall": "卸载",
  "Permissions": "权限",
  "Repository access": "仓库访问权限",
  "Only select repositories": "仅选定仓库",
  "Security advisories": "安全公告",
  "Dependabot alerts": "Dependabot 警报",
  "Code scanning": "代码扫描",
  "Secret scanning": "密钥扫描",
  "CodeQL analysis": "CodeQL 分析",
  "Private vulnerability reporting": "私有漏洞报告",
  "Dependency graph": "依赖关系图",
  "Enable": "启用",
  "Disable": "禁用",
  "Enabled": "已启用",
  "Setup": "设置",
  "Configure security": "配置安全",
  "Security policy": "安全策略",
  "Set up a security policy": "设置安全策略",
  "View security policy": "查看安全策略",
  "Start setup": "开始设置",
  "Learn more": "了解更多",
  "Learn more.": "了解更多。",
  "Show more": "显示更多",
  "Show less": "显示更少",
  "Loading": "加载中",
  "Apply": "应用",
  "Confirm": "确认",
  "Close": "关闭",
  "Back": "返回",
  "Next": "下一步",
  "Previous": "上一步",
  "Done": "完成",
  "Download": "下载",
  "Upload": "上传",
  "Choose a file": "选择文件",
  "Select": "选择",
  "Required": "必填",
  "Optional": "可选",
  "Internal": "内部",
  "Visibility": "可见性",
  "Repository settings": "仓库设置",
  "Organization settings": "组织设置",
  "Account settings": "账户设置",
  "Billing and plans": "账单与套餐",
  "Security log": "安全日志",
  "Developer settings": "开发者设置",
  "Configure security and analysis features": "配置安全与分析功能",
  "Feature": "功能",
  "Status": "状态",
  "Last event": "最近事件",
  "Total alerts": "警报总数",
  "Dependabot security updates": "Dependabot 安全更新",
  "Push protection": "推送保护",
  "Not enabled": "未启用",
  "No policy defined": "未定义策略",
  "Automatically detect vulnerable dependencies in your repository's dependencies.": "自动检测仓库依赖中的易受攻击依赖。",
  "Automatically open pull requests to update vulnerable dependencies.": "自动创建拉取请求以更新易受攻击的依赖。",
  "Scan code for security vulnerabilities and coding errors.": "扫描代码中的安全漏洞与编码错误。",
  "Allow anyone to privately report security vulnerabilities.": "允许任何人以私密方式报告安全漏洞。",
  "Scan repository for secrets.": "扫描仓库中的密钥泄露。",
  "Prevent commits containing secrets from being pushed.": "阻止包含密钥的提交被推送。",
  "Define how to report security vulnerabilities.": "定义报告安全漏洞的方式。",
  "Create and manage security advisories.": "创建并管理安全公告。",
  "Enable Dependabot alerts": "启用 Dependabot 警报",
  "Enable Dependabot security updates": "启用 Dependabot 安全更新",
  "Enable private vulnerability reporting": "启用私有漏洞报告",
  "Enable secret scanning": "启用密钥扫描",
  "Enable push protection": "启用推送保护",
  "View code scanning alerts": "查看代码扫描警报",
  "View secret scanning alerts": "查看密钥扫描警报",
  "View Dependabot alerts": "查看 Dependabot 警报",
  "View alerts": "查看警报",
  "Dismissed alerts": "已忽略的警报",
  "Default setup": "默认设置",
  "Advanced setup": "高级设置",
  "Configure code scanning": "配置代码扫描",
  "Security overview": "安全概览",
  "Vulnerability report": "漏洞报告",
  "Coverage": "覆盖情况",
  "Open alerts": "未处理的警报",
  "Closed alerts": "已关闭的警报",
  "Risk": "风险",
  "Critical": "严重",
  "High": "高",
  "Medium": "中",
  "Low": "低",
  "Tool": "工具",
  "Type": "类型",
  "Severity": "严重程度",
  "Package": "软件包",
  "Manifest": "清单文件",
  "Scope": "范围",
  "runtime": "运行时",
  "Alert": "警报",
  "Alerts": "警报",
  "Dismiss alert": "忽略警报",
  "Reopen alert": "重新打开警报",
  "Dismissed": "已忽略",
  "Fixed": "已修复",
  "Reopened": "已重新打开",
  "Auto-dismissed": "自动忽略",
  "Reason": "原因",
  "Fix in progress": "修复中",
  "No alerts": "没有警报",
  "No alerts found": "未找到警报",
  "There aren't any open alerts for this repository": "此仓库当前没有未处理的警报",
  "Dependabot": "Dependabot",
  "Dependabot version updates": "Dependabot 版本更新",
  "Keep your dependencies up to date with automated pull requests.": "通过自动拉取请求保持依赖为最新版本。",
  "config.yml": "config.yml 配置文件",
  "Create config file": "创建配置文件",
  "Last scanned": "最近扫描",
  "Scanning": "扫描中",
  "Analysis": "分析",
  "Analysis results": "分析结果",
  "View history": "查看历史",
  "Manage alert": "管理警报",
  "This repository is currently protected by secret scanning and push protection.": "此仓库当前受密钥扫描与推送保护。",
  "Partner detection": "合作伙伴检测",
  "Validity checks": "有效性检查",
  "Non-provider patterns": "非提供商模式",
  "Generic secrets": "通用密钥",
  "User alerts": "用户警报",
  "Email notifications": "邮件通知",
  "Webhook notifications": "Webhook 通知",
  "Watching": "正在关注",
  "Automatically watch repositories": "自动关注仓库",
  "System": "系统",
  "Ignore": "忽略",
  "Participating": "参与的",
  "All activity": "所有动态",
  "Only participating and @mentioned": "仅参与的与 @提及的",
  "Send notifications for": "发送通知的条件",
  "Notification delivery method": "通知送达方式",
  "Custom routing": "自定义路由",
  "Subscriptions": "订阅",
  "You're receiving notifications because you're watching this repository.": "您正在关注此仓库，因此会收到通知。",
  "Stop watching this repository": "停止关注此仓库",
  "No packages published": "尚未发布软件包",
  "Publish your first package": "发布您的第一个软件包",
  "Readme": "自述文件",
  "License": "许可证",
  "About": "关于",
  "Releases ": "版本发布 ",
  "No releases published": "尚未发布版本",
  "Create a new release": "创建新版本",
  "Edit Pins": "编辑置顶",
  "Unstar": "取消标星",
  "Report repository": "举报仓库"
  };
  // 1.2 长句子与段落映射（支持包含匹配）
  const SENTENCE_MAP = [
    // Projects 空状态
    {
      en: "Projects are a customizable, flexible tool for planning and tracking your work.",
      zh: "项目看板是一个可自定义、灵活强大的工具，用于规划和跟踪您的开发工作。"
    },
    // 仓库搜索提示
    {
      en: "Using a comma within certain filters will aggregate the results. For example: language:Go,Ruby will show all repositories that have either Go or Ruby as their primary language.",
      zh: "在特定筛选条件中使用逗号可以聚合结果。例如：language:Go,Ruby 将显示以 Go 或 Ruby 为主要语言的所有代码仓库。"
    },
    // PR 收件箱自定义视图
    {
      en: "Tailor your Inbox to fit your workflow, or pick a different view to open by default at github.com/pulls",
      zh: "定制您的收件箱以契合团队工作流，或选择其他视图作为访问 github.com/pulls 时的默认页面。"
    },
    // Issue 文档
    {
      en: "Learn more about searching and filtering issues and pull requests.",
      zh: "深入了解如何检索和筛选议题与合并请求。"
    },
    // Copilot 状态与桌面端介绍
    {
      en: "Cleared for takeoff soon—your Copilot license is on its way. Please check back in a few minutes.",
      zh: "即将就绪——您的 Copilot 许可证正在开通中，请几分钟后再回来查看。"
    },
    {
      en: "An agent-driven desktop experience built natively on GitHub.",
      zh: "基于 GitHub 原生构建的智能体驱动桌面端体验。"
    },
    // Codespaces 模板与入门
    {
      en: "Start with a blank canvas or import any packages you need.",
      zh: "从空白画布开始，或随时导入您需要的任何开发依赖包。"
    },
    {
      en: "A popular JavaScript library for building user interfaces based on UI components.",
      zh: "一个广受欢迎的 JavaScript 界面库，用于基于 UI 组件构建用户前端。"
    },
    {
      en: "New to Codespaces? Start here. Learn the core concepts and how to get started.",
      zh: "刚接触 Codespaces？从这里开始，轻松掌握核心概念与上手流程。"
    },
    {
      en: "Learn more about features like secret management and port forwarding.",
      zh: "深入了解机密管理和网络端口转发等高级功能。"
    },
    {
      en: "Access codespaces from within Visual Studio Code.",
      zh: "直接在本地 Visual Studio Code 中无缝连接和开发云端环境。"
    },
    // Explore 推荐语
    {
      en: "Here's what we found based on your interests...",
      zh: "根据您的开发技术与兴趣偏好，精选推荐如下内容："
    },
    // Marketplace 介绍
    {
      en: "Tools from the community and partners to simplify tasks and automate processes",
      zh: "来自全球社区与官方伙伴的高效工具，助您化繁为简并实现流程自动化。"
    },
    // MCP 服务器介绍
    {
      en: "Servers and tools from the community that connect models to files, APIs, databases, and more.",
      zh: "来自开源社区的 MCP 服务与工具，将 AI 大模型连接到本地文件、API 接口和数据库等现实环境。"
    },
    // 状态弹窗
    {
      en: "When others mention you, assign you, or request your review, GitHub will let them know that you have limited availability.",
      zh: "当他人提及您、指派任务或请求您审查代码时，GitHub 将提示对方您当前可用时间有限。"
    },
    {
      en: "Your status will be cleared after the selected time.",
      zh: "您的状态将在到达所选时间后自动清除。"
    },
    {
      en: "Limit status visibility to a single organization.",
      zh: "将状态可见范围限制为单个组织。"
    },
    // 设置页长提示
    {
      en: "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.",
      zh: "您的姓名可能会出现在您参与贡献或被提及的 GitHub 页面中。您可以随时删除它。"
    },
    {
      en: "You can manage verified email addresses in your email settings",
      zh: "您可以在 邮箱设置 中管理已验证的邮箱地址"
    },
    {
      en: "You can @mention other users and organizations to link to them.",
      zh: "您可以使用 @提及 其他用户或组织以建立链接。"
    },
    {
      en: "All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our privacy statement for more information.",
      zh: "本页上的所有字段均为可选项且可随时删除。填写即代表您同意我们在展示您个人主页的地方共享这些数据。详情请参阅我们的隐私声明。"
    },
    {
      en: "Display current local time",
      zh: "在个人主页显示当前本地时间"
    },
    {
      en: "Other users will see the time formatted as",
      zh: "其他用户看到的时间格式将为"
    }
  ];
  // 1.3 正则动态规则 + 属性翻译字典
  const REGEX_RULES = [
    // 搜索结果：如 "903 results (220 ms)" 或 "903 results"
    { reg: /^([\d,]+)\s+results?(?:\s+\((\d+)\s*ms\))?$/i, rep: (m, p1, p2) => p2 ? `${p1} 条结果 (耗时 ${p2} 毫秒)` : `${p1} 条结果` },
    // 搜索结果排序按钮文本："Sort by: Best match" 等
    { reg: /^Sort\s+by:\s+(.+)$/i, rep: (m, p1) => `排序方式：${EXACT_MAP[p1.trim()] || p1}` },
    // 更新时间前缀："Updated on 2月16日" -> "更新于 2月16日"
    { reg: /^Updated\s+on\s+/i, rep: "更新于 " },
    // 相对时间
    { reg: /^(\d+)\s+days?\s+ago$/i, rep: "$1 天前" },
    { reg: /^(\d+)\s+hours?\s+ago$/i, rep: "$1 小时前" },
    { reg: /^(\d+)\s+minutes?\s+ago$/i, rep: "$1 分钟前" },
    { reg: /^(\d+)\s+seconds?\s+ago$/i, rep: "$1 秒前" },
    { reg: /^just\s+now$/i, rep: "刚刚" },
    { reg: /^yesterday$/i, rep: "昨天" },
    { reg: /^(\d+)\s+months?\s+ago$/i, rep: "$1 个月前" },
    { reg: /^(\d+)\s+years?\s+ago$/i, rep: "$1 年前" },
    { reg: /^(\d+)\s+weeks?\s+ago$/i, rep: "$1 周前" },
    { reg: /^last\s+year$/i, rep: "去年" },
    { reg: /^last\s+week$/i, rep: "上周" },
    { reg: /^last\s+month$/i, rep: "上个月" },
    { reg: /^today$/i, rep: "今天" },
    { reg: /^a\s+few\s+seconds?\s+ago$/i, rep: "几秒前" },
    // 数量与统计
    { reg: /^(\d+)\s+repositories$/i, rep: "$1 个代码仓库" },
    { reg: /^(\d+)\s+starred\s+topics$/i, rep: "$1 个收藏的话题" },
    { reg: /^(\d+)\s+starred\s+repositories$/i, rep: "$1 个收藏的仓库" },
    { reg: /^(\d+)\s+commits?$/i, rep: "$1 次提交" },
    { reg: /^(\d+)\s+branches?$/i, rep: "$1 个分支" },
    { reg: /^(\d+)\s+tags?$/i, rep: "$1 个标签" },
    { reg: /^(\d+)\s+open$/i, rep: "$1 个开启中" },
    { reg: /^(\d+)\s+closed$/i, rep: "$1 个已关闭" },
    { reg: /^(\d+)\s+watching$/i, rep: "$1 人关注" },
    { reg: /^(\d+)\s+forks?$/i, rep: "$1 次派生" },
    { reg: /^(\d+)\s+stars?$/i, rep: "$1 颗星" },
    // 设置页社交占位符
    { reg: /^Link\s+to\s+social\s+profile\s+(\d+)$/i, rep: "社交平台主页链接 $1" }
  ];
  // ---------------- 属性翻译字典 ----------------
  const ATTR_MAP = {
    "Search or jump to...": "搜索代码、仓库、Issue 或跳转...",
    "Type to search": "输入关键字搜索",
    "Type / to search": "输入 / 快速搜索",
    "Search this repository": "在当前仓库中检索",
    "Filter by name": "按名称筛选",
    "Find a file": "查找文件",
    "Add a description": "添加项目简介与说明",
    "Leave a comment": "填写您的评论内容...",
    "Copy URL to clipboard": "复制链接到剪贴板",
    "Copy path": "复制相对文件路径",
    "Copy permalink": "复制永久哈希链接",
    "Switch branches or tags": "切换分支或标签版本",
    "Tell us a little bit about yourself": "简要介绍一下您自己",
    "Set a status...": "设置一条状态...",
    "Ask anything or type @ to add context": "提问任何问题，或输入 @ 添加上下文...",
    "Search for apps and actions": "搜索应用和 Actions...",
    "Search MCPs": "搜索 MCP 服务器...",
    "Sort by": "排序方式",
    "Filter by": "按条件筛选"
  };
  /* =============================================================
   * 2. 安全过滤器：绝不误伤代码区、提交正文与用户评论
   * ============================================================= */
  const IGNORE_TAGS = new Set([
    "SCRIPT", "STYLE", "PRE", "CODE", "TEXTAREA", "SVG", "PATH", "KBD"
  ]);
  function isProtectedNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    if (IGNORE_TAGS.has(node.tagName)) return true;
    if (node.closest(
      'pre, code, .blob-wrapper, .blob-code, .blob-code-inner, .highlight, ' +
      '.markdown-body, .comment-body, .commit-title, .commit-desc, ' +
      '.diff-table, .react-code-lines, .react-code-text, [contenteditable="true"]'
    )) {
      return true;
    }
    return false;
  }
  function isProtectedNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    if (IGNORE_TAGS.has(node.tagName)) return true;
    if (node.closest(
      'pre, code, .blob-wrapper, .blob-code, .blob-code-inner, .highlight, ' +
      '.markdown-body, .comment-body, .commit-title, .commit-desc, ' +
      '.diff-table, .react-code-lines, .react-code-text, [contenteditable="true"]'
    )) {
      return true;
    }
    return false;
  }
  /* =============================================================
   * 3. 翻译引擎
   * ============================================================= */
  function normalizeSpaces(str) {
    return str.replace(/\s+/g, " ").trim();
  }
  function translateText(text) {
    if (!text) return text;
    const trimmed = normalizeSpaces(text);
    if (!trimmed) return text;
    // 1. 精确短语匹配
    if (EXACT_MAP[trimmed]) {
      return text.replace(trimmed, EXACT_MAP[trimmed]);
    }
    // 2. 长句子匹配
    for (const item of SENTENCE_MAP) {
      if (trimmed === normalizeSpaces(item.en) || trimmed.indexOf(item.en) !== -1) {
        return text.replace(item.en, item.zh);
      }
    }
    // 3. 动态正则规则
    for (const rule of REGEX_RULES) {
      if (rule.reg.test(trimmed)) {
        if (typeof rule.rep === "function") {
          return text.replace(trimmed, trimmed.replace(rule.reg, rule.rep));
        } else {
          return text.replace(trimmed, trimmed.replace(rule.reg, rule.rep));
        }
      }
    }
    // 4. 复合前缀匹配 (如 "Updated on xxx")
    if (/^Updated\s+on\s+/i.test(trimmed)) {
      return text.replace(/^(\s*)Updated\s+on\s+/i, "$1更新于 ");
    }
    return text;
  }
  function translateAttributes(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;
    for (const attr of ["placeholder", "aria-label", "title"]) {
      const val = el.getAttribute(attr);
      if (val) {
        const norm = normalizeSpaces(val);
        if (ATTR_MAP[norm]) {
          el.setAttribute(attr, ATTR_MAP[norm]);
        } else if (EXACT_MAP[norm]) {
          el.setAttribute(attr, EXACT_MAP[norm]);
        } else {
          for (const rule of REGEX_RULES) {
            if (rule.reg.test(norm)) {
              if (typeof rule.rep === "function") {
                el.setAttribute(attr, norm.replace(rule.reg, rule.rep));
              } else {
                el.setAttribute(attr, norm.replace(rule.reg, rule.rep));
              }
              break;
            }
          }
        }
      }
    }
    // <input type="submit"> / <input type="button">
    if (el.tagName === "INPUT" && (el.type === "submit" || el.type === "button")) {
      const val = el.value ? normalizeSpaces(el.value) : "";
      if (val && EXACT_MAP[val]) {
        el.value = EXACT_MAP[val];
      }
    }
    // <select> 中的 <option>
    if (el.tagName === "OPTION" && el.text) {
      const norm = normalizeSpaces(el.text);
      if (EXACT_MAP[norm]) {
        el.text = EXACT_MAP[norm];
      }
    }
  }
  /* =============================================================
   * 4. 相对时间汉化
   * ============================================================= */
  const TIME_STYLE_ID = "github-zh-time-style";
  const timeCache = new WeakMap(); // el -> 已写入的中文
  // 把 datetime 换算成中文相对时间
  function formatRelativeZh(isoStr) {
    if (!isoStr) return "";
    const t = Date.parse(isoStr);
    if (isNaN(t)) return "";
    const diff = Date.now() - t;
    const sec = Math.floor(diff / 1000);
    if (sec < 0) return "刚刚";
    if (sec < 45) return "刚刚";
    const min = Math.floor(sec / 60);
    if (min < 60) return min <= 1 ? "1 分钟前" : min + " 分钟前";
    const hour = Math.floor(min / 60);
    if (hour < 24) return hour <= 1 ? "1 小时前" : hour + " 小时前";
    const day = Math.floor(hour / 24);
    if (day < 7) return day <= 1 ? "1 天前" : day + " 天前";
    const week = Math.floor(day / 7);
    if (day < 30) return week <= 1 ? "1 周前" : week + " 周前";
    const month = Math.floor(day / 30);
    if (day < 365) return month <= 1 ? "1 个月前" : month + " 个月前";
    const year = Math.floor(day / 365);
    return year <= 1 ? "1 年前" : year + " 年前";
  }
  // 注入样式：隐藏原文本，用 ::after 显示中文
  function ensureTimeStyle() {
    if (document.getElementById(TIME_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = TIME_STYLE_ID;
    style.textContent = `
      relative-time[data-zh-time] {
        font-size: 0 !important;
        line-height: 0 !important;
      }
      relative-time[data-zh-time]::after {
        content: attr(data-zh-time);
        font-size: 12px;
        line-height: normal;
        color: inherit;
        white-space: nowrap;
      }
      time[data-zh-time] {
        font-size: 0 !important;
      }
      time[data-zh-time]::after {
        content: attr(data-zh-time);
        font-size: 12px;
        color: inherit;
        white-space: nowrap;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }
  // 处理单个时间元素
  function applyZhTime(el) {
    if (!el || !el.getAttribute) return;
    const dt = el.getAttribute("datetime");
    let zh = formatRelativeZh(dt);
    // 兜底：没有 datetime 属性时，用元素现有英文文本走正则翻译
    if (!zh) {
      const raw = (el.textContent || "").trim();
      if (raw && /[A-Za-z]/.test(raw)) {
        const t = translateText(raw);
        if (t !== raw) zh = t;
      }
    }
    if (!zh) return;
    if (timeCache.get(el) === zh && el.getAttribute("data-zh-time") === zh) return;
    el.setAttribute("data-zh-time", zh);
    timeCache.set(el, zh);
    // 悬浮提示（完整日期）也顺手翻译
    const title = el.getAttribute("title");
    if (title && /[A-Za-z]/.test(title)) {
      const nv = translateText(title);
      if (nv !== title) el.setAttribute("title", nv);
    }
  }
  // 扫描并处理时间元素
  function scanTimes(root) {
    if (!root) return;
    ensureTimeStyle();
    const scope = (root.nodeType === Node.ELEMENT_NODE) ? root : document.body;
    if (!scope || !scope.querySelectorAll) return;
    const TIME_SEL = "relative-time, time, .js-relative-time, [data-view-component] relative-time";
    if (scope.matches && scope.matches(TIME_SEL)) applyZhTime(scope);
    const list = scope.querySelectorAll(TIME_SEL);
    for (let i = 0; i < list.length; i++) applyZhTime(list[i]);
  }
  // 启动：首扫 + 定时补扫（应对组件刷新与动态加载）
  function startTimeKeeper() {
    const tick = () => { try { scanTimes(document.body); } catch (e) {} };
    tick();
    setInterval(tick, 3000);
    window.addEventListener("load", tick);
    document.addEventListener("turbo:load", tick);
    document.addEventListener("pjax:end", tick);
  }
  startTimeKeeper();
  /* =============================================================
   * 5. DOM 遍历翻译
   * ============================================================= */
  function walkAndTranslate(rootNode) {
    if (!rootNode) return;
    if (rootNode.nodeType === Node.ELEMENT_NODE && isProtectedNode(rootNode)) return;
    // 同步处理时间元素（CSS 覆盖方案，不会被组件刷新覆盖）
    try { scanTimes(rootNode); } catch (e) {}
    // 翻译属性与子表单元素
    if (rootNode.nodeType === Node.ELEMENT_NODE) {
      translateAttributes(rootNode);
      const subInputs = rootNode.querySelectorAll ? rootNode.querySelectorAll("input, option, button, textarea, [aria-label]") : [];
      for (let i = 0; i < subInputs.length; i++) {
        translateAttributes(subInputs[i]);
      }
    }
    // 使用高效 TreeWalker
    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent || isProtectedNode(parent)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    let textNode;
    while ((textNode = walker.nextNode())) {
      const original = textNode.nodeValue;
      const translated = translateText(original);
      if (translated !== original) {
        textNode.nodeValue = translated;
      }
    }
  }
  /* =============================================================
   * 6. 动态监听（MutationObserver + 节流 + Turbo/PJAX）
   * ============================================================= */
  let pendingNodes = [];
  let rafId = null;
  function scheduleBatchTranslate() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const batch = pendingNodes;
      pendingNodes = [];
      rafId = null;
      for (const node of batch) {
        if (node && node.isConnected) {
          walkAndTranslate(node);
        }
      }
    });
  }
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        for (const added of mutation.addedNodes) {
          if (added.nodeType === Node.ELEMENT_NODE && !isProtectedNode(added)) {
            pendingNodes.push(added);
          }
        }
      } else if (mutation.type === "characterData") {
        const parent = mutation.target.parentElement;
        if (parent && !isProtectedNode(parent)) {
          pendingNodes.push(mutation.target);
        }
      }
    }
    if (pendingNodes.length > 0) {
      scheduleBatchTranslate();
    }
  });
  function startObserver() {
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
  // 监听 GitHub 各种单页与 Turbo 渲染事件
  ["turbo:load", "turbo:render", "pjax:end", "popstate"].forEach((evt) => {
    window.addEventListener(evt, () => {
      walkAndTranslate(document.body);
    });
  });
  /* =============================================================
   * 7. 启动引导
   * ============================================================= */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      walkAndTranslate(document.body);
      startObserver();
    });
  } else {
    walkAndTranslate(document.body);
    startObserver();
  }
})();
