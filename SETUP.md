# React 项目设置指南

## 快速开始

1. **安装依赖**
```bash
npm install
```

2. **启动开发服务器**
```bash
npm run dev
```

应用将在 http://localhost:3000 启动

## 项目结构说明

```
src/
├── components/          # React 组件
│   ├── pages/          # 页面组件
│   │   ├── HomePage.jsx
│   │   ├── StudentPage.jsx
│   │   ├── TaskPage.jsx
│   │   ├── PerformancePage.jsx
│   │   └── PlanPage.jsx
│   ├── drawers/        # 抽屉组件
│   │   └── StudentDrawer.jsx
│   ├── PCView.jsx      # PC端视图
│   ├── MobileView.jsx  # 移动端视图
│   ├── Sidebar.jsx     # 侧边栏
│   └── ViewSwitcher.jsx # 视图切换器
├── lite/               # 学员端应用
│   └── LiteApp.jsx    # 学员端主应用（从 lite.jsx 转换）
├── App.jsx            # 主应用组件
├── main.jsx           # 入口文件
└── index.css          # 全局样式（包含 styles.css）
```

## 注意事项

1. **静态资源**：请确保 `avatar.jpeg` 文件放在 `public/` 目录下（需要创建 public 目录）

2. **样式文件**：`styles.css` 已通过 `index.css` 导入，无需额外操作

3. **图标库**：
   - Font Awesome：通过 CDN 加载（在 index.html 中）
   - Lucide React：通过 npm 包安装

4. **待完善功能**：
   - TaskPage、PerformancePage、PlanPage 目前是占位组件，需要从 prototype-1.html 中提取完整内容
   - StudentDrawer 需要完善所有标签页内容
   - 其他抽屉组件（任务详情抽屉等）需要创建

## 下一步工作

1. 完善各个页面组件的完整功能
2. 提取并转换所有抽屉组件
3. 添加状态管理（如需要）
4. 优化组件结构
