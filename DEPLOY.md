# 部署到 GitHub Pages 指南

您的 MFactory AI 网站已开发完成，请按以下步骤部署到 GitHub Pages。

## 步骤 1：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - Repository name: `mfactory-ai`
   - Description: `AI-powered manufacturing investment analysis tool`
   - Public (公开)
   - 不要初始化 README、.gitignore 或 license
4. 点击 "Create repository"

## 步骤 2：上传代码到仓库

### 方法 A：使用 Git 命令行（推荐）
```bash
# 1. 下载代码
git clone https://github.com/heguoqing/mfactory-ai.git
cd mfactory-ai

# 2. 添加我们的代码（替换所有文件）
# 将本文件夹中的所有文件复制到仓库目录
# 或者直接使用以下命令初始化

# 3. 初始化并推送
git init
git add .
git commit -m "Initial commit: MFactory AI website"
git branch -M main
git remote add origin https://github.com/你的用户名/mfactory-ai.git
git push -u origin main
```

### 方法 B：使用 GitHub Web 界面
1. 在仓库页面点击 "Add file" → "Upload files"
2. 将本文件夹中的所有文件拖拽到上传区域
3. 点击 "Commit changes"

## 步骤 3：启用 GitHub Pages

1. 进入仓库 → Settings → Pages
2. 在 "Source" 部分选择：
   - Branch: `main`
   - Folder: `/` (根目录)
3. 点击 "Save"
4. 等待 1-2 分钟，您的网站将发布在：
   `https://[你的用户名].github.io/mfactory-ai`

## 步骤 4：自定义域名（可选）

1. 在 Pages 设置中点击 "Custom domain"
2. 输入您的域名（如 `mfactory-ai.com`）
3. 按照提示配置 DNS 记录

## 网站功能预览

访问您的 GitHub Pages URL 后，您将看到：

1. **首页**：输入股票代码体验 AI 分析
2. **功能展示**：三大核心功能说明
3. **定价页面**：三档定价方案
4. **响应式设计**：支持手机、平板、电脑

## 支持的股票代码示例

- 300124 (汇川技术)
- 002747 (埃斯顿)
- 600519 (贵州茅台)
- 00700 (腾讯控股)

## 后续开发建议

1. **连接真实数据**：集成股票 API（如 Alpha Vantage、新浪财经）
2. **AI 集成**：添加 DeepSeek API 生成真实分析
3. **用户系统**：实现注册、登录、报告历史
4. **支付集成**：接入 Stripe 或支付宝实现订阅

## 技术支持

如有问题，请提供：
- 您的 GitHub 用户名
- 部署过程中遇到的错误信息
- 期望的功能改进

---

**您的网站已准备好，只需 5 分钟即可上线！**