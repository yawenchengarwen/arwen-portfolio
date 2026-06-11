# Arwen 个人作品集网站

## 技术栈
- React 19 + TypeScript
- Vite 6（开发/构建工具）
- Tailwind CSS 3（样式）
- GSAP（动画）
- Lucide React（图标）

## 项目结构
```
src/
├── App.tsx              # 主应用
├── main.tsx             # 入口
├── index.css            # 全局样式
├── components/          # 通用组件
│   ├── Navbar.tsx
│   ├── PortfolioCard.tsx
│   ├── SectionWrapper.tsx
│   ├── SkillTag.tsx
│   ├── SmartVideoPlayer.tsx
│   ├── TimelineItem.tsx
│   └── canvas/          # 画布动画
│       ├── FloatingCloudsCanvas.tsx
│       ├── SkyLanternsCanvas.tsx
│       └── StarfieldCanvas.tsx
├── sections/            # 页面区块
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ExperienceSection.tsx
│   ├── PortfolioSection.tsx
│   └── ContactSection.tsx
├── hooks/               # 自定义 hook
│   └── useReducedMotion.ts
└── lib/                 # 工具函数
    └── utils.ts
public/
├── images/              # 图片资源
└── videos/              # 视频资源（不提交到 Git）
```

## 常用命令
```bash
npm install              # 安装依赖
npm run dev              # 启动开发服务器 (localhost:3000)
npm run build            # 构建到 dist/
```

## 开发流程
1. `npm run dev` 启动开发服务器
2. 修改代码，浏览器热更新
3. `git add . && git commit -m "描述" && git push` 推送
4. Cloudflare Pages 自动重新部署

## 部署
- Cloudflare Pages：连接 GitHub 仓库 `yawenchengarwen/arwen-portfolio`
- 构建命令：`npm run build`，输出目录：`dist`
- 域名：`https://arwen-portfolio.pages.dev`
- 每次 push 到 main 分支自动触发部署

## 注意事项
- `public/videos/` 不在 Git 中（文件太大），通过 .gitignore 排除
- 修改视频/图片后不要提交到 Git，用外部存储链接
- `node_modules/` 和 `dist/` 已在 .gitignore 中排除
