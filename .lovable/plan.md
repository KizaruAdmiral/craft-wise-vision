

# 落地页迭代设计方案

## 变更概览

本次迭代包含四项修改：

1. 用 3D 渲染组件替换 AI 能力诊断雷达图
2. 优化中文字体搭配
3. 将「已服务行业领先企业」改为自动滚动横幅
4. 简化 Footer 结构

---

## 1. 3D 渲染组件替换雷达图

### 设计概念
创建一个基于 React Three Fiber 的 3D 玻璃态场景，展示悬浮的几何形状（球体、立方体、环形），配合玻璃质感材质和柔和的光影效果，呼应整体 Glassmorphism 风格。

### 视觉效果
- 多个半透明玻璃质感几何体（Torus、Icosahedron、Octahedron）
- 自动缓慢旋转和上下浮动动画
- 环境光与点光源营造柔和光影
- 玻璃折射/反射效果传达科技感与高端感

### 技术实现

**安装依赖**：
```text
@react-three/fiber@^8.18
@react-three/drei@^9.122.0
three@^0.160.0
```

**新建组件**：`src/components/landing/Scene3D.tsx`
- 使用 `Canvas` 创建 3D 场景
- 使用 `Float` 组件实现悬浮动画
- 使用 `MeshTransmissionMaterial` 或 `meshPhysicalMaterial` 实现玻璃质感
- 添加 `OrbitControls`（可选，启用轻度用户交互）

**修改文件**：`src/components/landing/HeroSection.tsx`
- 移除 `RadarChart` 导入和渲染
- 替换为新的 `Scene3D` 组件
- 更新标题文案（移除「AI 能力诊断预览」）

---

## 2. 优化中文字体搭配

### 当前问题
目前使用思源宋体 (Noto Serif SC) + Playfair Display 的组合，但根据设计方向可进一步强化中英文字体的视觉张力。

### 优化方案
调整字体层级，增强衬线体的表现力：

| 元素 | 当前字体 | 优化后字体 |
|------|----------|------------|
| 中文标题 | Noto Serif SC | **LXGW WenKai** (霞鹜文楷) 或 **Ma Shan Zheng** (马善政楷体) |
| 英文标题 | Playfair Display | Playfair Display (保持) |
| 中文正文 | Noto Serif SC | Noto Serif SC (保持) |
| 英文正文 | Source Serif Pro | Source Serif Pro (保持) |
| 技术元素 | JetBrains Mono | JetBrains Mono (保持) |

### 备选方案
如果用户希望保持宋体风格但增加独特性：
- 中文标题改用 **思源宋体加粗** + 字间距调整
- 或使用 **Zhi Mang Xing**（站酷仓耳渔阳体）增添书法感

### 技术实现
**修改文件**：
- `index.html`：添加 Google Fonts 链接
- `src/index.css`：更新字体声明
- `tailwind.config.ts`：更新 fontFamily 配置

---

## 3. 已服务行业领先企业 — 自动滚动横幅

### 设计效果
- 无限循环的从左到右滚动动画
- 使用 CSS animation 实现流畅滚动
- 复制一份企业列表实现无缝衔接
- 鼠标悬停时暂停滚动
- 玻璃态卡片样式保持不变

### 技术实现

**修改文件**：`src/components/landing/HeroSection.tsx`

将静态的 `flex-wrap` 布局改为滚动容器：

```text
结构:
<外层容器 overflow-hidden>
  <滚动轨道 animate-scroll>
    <企业卡片 x N> + <企业卡片 x N (复制)>
  </滚动轨道>
</外层容器>
```

**添加 CSS 动画**：`src/index.css`

```text
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll-left 20s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}
```

---

## 4. 简化 Footer 结构

### 当前结构
```text
┌─────────────────────────────────────────────┐
│  Logo + 描述 + 订阅  │  解决方案  │  关于我们  │
├─────────────────────────────────────────────┤
│  版权信息                    社交媒体图标    │
└─────────────────────────────────────────────┘
```

### 优化后结构
```text
┌─────────────────────────────────────────────┐
│            Logo + 描述 + 订阅                │
├─────────────────────────────────────────────┤
│  版权信息                    社交媒体图标    │
└─────────────────────────────────────────────┘
```

### 技术实现
**修改文件**：`src/components/landing/Footer.tsx`

- 移除「解决方案」链接列表 (lines 48-57)
- 移除「关于我们」链接列表 (lines 59-67)
- 调整 grid 布局：从 `lg:grid-cols-4` 改为单列布局
- 居中展示 Logo、描述和订阅表单

---

## 文件变更清单

| 文件路径 | 操作 |
|----------|------|
| `package.json` | 添加 three.js 和 R3F 依赖 |
| `src/components/landing/Scene3D.tsx` | **新建** — 3D 玻璃态场景组件 |
| `src/components/landing/HeroSection.tsx` | **修改** — 替换雷达图、添加滚动横幅 |
| `src/index.css` | **修改** — 添加滚动动画、更新字体 |
| `index.html` | **修改** — 添加新字体链接 |
| `tailwind.config.ts` | **修改** — 更新字体配置 |
| `src/components/landing/Footer.tsx` | **修改** — 移除两个链接列表 |
| `src/components/landing/RadarChart.tsx` | 保留（不删除，以备后用） |

---

## 实施顺序

1. **安装依赖**：添加 React Three Fiber 相关包
2. **创建 3D 组件**：开发 Scene3D.tsx
3. **更新 HeroSection**：替换雷达图 + 滚动横幅
4. **更新样式**：字体和动画
5. **简化 Footer**：移除链接列表
6. **测试验证**：确保 3D 场景正常渲染、滚动流畅

