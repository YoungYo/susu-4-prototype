# 考研二讲工作台

React 版本的管理后台和学员端应用。

## 安装依赖

```bash
npm install
```

## 开发

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

## 构建

```bash
npm run build
```

## 预览构建结果

```bash
npm run preview
```

## 项目结构

```
src/
  ├── components/          # React 组件
  │   ├── pages/          # 页面组件
  │   ├── drawers/        # 抽屉组件
  │   ├── PCView.jsx      # PC端视图
  │   ├── MobileView.jsx  # 移动端视图
  │   ├── Sidebar.jsx     # 侧边栏
  │   └── ViewSwitcher.jsx # 视图切换器
  ├── lite/               # 学员端应用
  │   └── LiteApp.jsx    # 学员端主应用
  ├── App.jsx            # 主应用组件
  ├── main.jsx           # 入口文件
  └── index.css          # 全局样式
```

## 技术栈

- React 18
- Vite
- Tailwind CSS
- Lucide React (图标)
- Font Awesome (图标)
