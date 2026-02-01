

# 落地页重构设计方案

## 变更概览

本次迭代包含五项主要修改：

1. **优化「获取方案」按钮样式** — 删除发光效果，使用鲜色填充，鼠标悬停时滑出箭头
2. **投影片式浏览体验** — 将滚轴式浏览改为全屏投影片式，滑动到底触发页面转换
3. **翻面词卡效果** — 将三幕叙事改为并列翻转卡片
4. **全局导航栏构建** — 创建 NavBar 组件及三个新页面
5. **路由系统扩展** — 新增关于我们、真实案例、联络方式页面

---

## 1. 优化「获取方案」按钮

### 当前状态
- 使用 `bg-accent` 背景色
- 带有 `shadow-accent-glow` 发光效果
- 悬停时仅改变透明度

### 优化后效果
- 移除发光投影 (`shadow-accent-glow`)
- 使用饱和的陶土橙色 (`#C4704F`) 作为纯色填充
- 鼠标悬停时右侧滑出箭头图标（使用 `lucide-react` 的 `ArrowRight`）
- 箭头从透明度0位移到可见，配合平滑过渡动画

### 技术实现

**修改文件**: `src/components/landing/HeroSection.tsx`

```text
变更:
- 移除 shadow-accent-glow 类
- 添加 group 类以支持子元素悬停状态
- 在按钮内添加 ArrowRight 图标
- 图标默认 opacity-0 translate-x-[-4px]
- 悬停时 group-hover:opacity-100 group-hover:translate-x-0
```

**同步修改**: `src/components/landing/ContactSection.tsx` (相同按钮样式)

---

## 2. 投影片式浏览 (Full-Page Sections)

### 设计概念
每个页面区块占据整个视窗高度 (`100vh`)，用户滚动到区块底部时自动滑动到下一区块，类似 Keynote/PowerPoint 投影片效果。

### 技术方案

**新建 Hook**: `src/hooks/useFullPageScroll.ts`

功能：
- 监听滚动事件
- 检测当前区块的滚动位置
- 当滚动到底部时，平滑滚动至下一区块
- 支持触摸设备的滑动手势
- 提供区块指示器状态

**核心实现逻辑**:
```text
1. 使用 IntersectionObserver 追踪当前可见区块
2. 监听 wheel 事件，判断滚动方向
3. 当检测到向下滚动且接近区块底部时，scrollIntoView 下一区块
4. 添加节流机制防止过快切换
5. CSS: scroll-snap-type: y mandatory (备用方案)
```

**页面结构变更**: `src/pages/Index.tsx`
- 每个 section 添加 `min-h-screen` 和 `snap-start`
- 外层容器添加 `snap-y snap-mandatory`

**视觉增强**:
- 添加页面指示器（右侧小圆点）
- 当前区块高亮显示
- 点击圆点可跳转到对应区块

---

## 3. 翻面词卡效果 (Flip Cards)

### 设计概念
将三幕叙事（困境 → 转折 → 愿景）改为三张并列卡片，每张卡片可以翻转显示正反两面：
- **正面**: 标题 + 图标 + 关键数据
- **背面**: 详细描述 + 行动号召

### 翻转交互方式
- **桌面端**: 鼠标悬停翻转
- **移动端**: 点击翻转
- 翻转动画使用 CSS 3D transform (`rotateY(180deg)`)

### 技术实现

**修改组件**: `src/components/landing/StorySection.tsx`

```text
结构变更:
┌─────────────────────────────────────────────────┐
│              Section Header                      │
├─────────┬─────────┬─────────────────────────────┤
│ Card 1  │ Card 2  │ Card 3                      │
│ (Flip)  │ (Flip)  │ (Flip)                      │
└─────────┴─────────┴─────────────────────────────┘

每张卡片结构:
<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">正面内容</div>
    <div class="flip-card-back">背面内容</div>
  </div>
</div>
```

**CSS 动画**: `src/index.css`
```text
.flip-card {
  perspective: 1000px;
}
.flip-card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.flip-card:hover .flip-card-inner,
.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  backface-visibility: hidden;
}
.flip-card-back {
  transform: rotateY(180deg);
}
```

---

## 4. 全局导航栏 (NavBar)

### 设计概念
顶部固定导航栏，玻璃态背景，包含：
- **左侧**: 伯乐 Logo（点击返回首页）
- **中间/右侧**: 导航链接
- **最右侧**: 「开始体验」CTA 按钮

### 导航项
| 名称 | 路由 |
|------|------|
| 关于我们 | /about |
| 真实案例 | /cases |
| 联络方式 | /contact |

### 响应式设计
- **桌面端**: 水平导航链接
- **移动端**: 汉堡菜单 → 侧边抽屉

### 技术实现

**新建组件**: `src/components/NavBar.tsx`

```text
功能:
- 固定定位 (fixed top-0)
- 玻璃态背景 (glass-card)
- 滚动时增加背景不透明度
- 响应式汉堡菜单
- 「开始体验」按钮链接到 /contact
- 当前页面高亮显示
```

**布局结构**:
```text
┌─────────────────────────────────────────────────┐
│ [Logo]          [About] [Cases] [Contact]  [CTA]│
└─────────────────────────────────────────────────┘
```

---

## 5. 新页面创建

### 5.1 关于我们页面 (`/about`)

**文件**: `src/pages/About.tsx`

内容结构:
- 伯乐团队介绍
- 公司使命与愿景
- 核心价值观
- 团队成员展示（可选）

### 5.2 真实案例页面 (`/cases`)

**文件**: `src/pages/Cases.tsx`

内容结构:
- 案例筛选器（按行业）
- 案例卡片网格
- 每个案例包含：客户背景、挑战、解决方案、成果数据

### 5.3 联络方式页面 (`/contact`)

**文件**: `src/pages/Contact.tsx`

内容结构:
- 复用 `ContactSection` 组件
- 添加公司地址、电话、邮箱等直接联系方式
- 地图嵌入（可选）

### 路由配置

**修改文件**: `src/App.tsx`

```text
新增路由:
<Route path="/about" element={<About />} />
<Route path="/cases" element={<Cases />} />
<Route path="/contact" element={<Contact />} />
```

---

## 文件变更清单

| 文件路径 | 操作 | 描述 |
|----------|------|------|
| `src/components/NavBar.tsx` | 新建 | 全局导航栏组件 |
| `src/hooks/useFullPageScroll.ts` | 新建 | 投影片式滚动 Hook |
| `src/pages/About.tsx` | 新建 | 关于我们页面 |
| `src/pages/Cases.tsx` | 新建 | 真实案例页面 |
| `src/pages/Contact.tsx` | 新建 | 联络方式页面 |
| `src/components/landing/HeroSection.tsx` | 修改 | 按钮样式优化 |
| `src/components/landing/ContactSection.tsx` | 修改 | 按钮样式同步 |
| `src/components/landing/StorySection.tsx` | 重构 | 翻面词卡实现 |
| `src/pages/Index.tsx` | 修改 | 投影片式布局 |
| `src/index.css` | 修改 | 翻转卡片 CSS |
| `src/App.tsx` | 修改 | 添加新路由和 NavBar |

---

## 实施顺序

1. **按钮样式优化** — 快速见效的视觉改进
2. **翻面词卡** — 重构 StorySection
3. **全局导航栏** — 创建 NavBar 组件
4. **新页面创建** — About / Cases / Contact
5. **路由配置** — 更新 App.tsx
6. **投影片式滚动** — 创建 Hook 并应用
7. **整体测试** — 确保所有页面和导航正常工作

