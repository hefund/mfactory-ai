# MFactory AI - 智能制造投资分析助手（全栈版）

基于AI的制造业公司投资分析工具，5分钟内生成专业投资研究报告。本版本为全栈实现，包含后端API、AI集成、用户系统和生产部署配置。

## 功能特性

- **智能财报分析**：自动解析制造业公司财报，提取关键财务指标
- **AI投资观点**：基于行业数据、政策动向生成个性化投资建议
- **实时股票数据**：集成Alpha Vantage API获取真实市场数据
- **用户系统**：注册、登录、分析历史记录
- **响应式前端**：适配桌面和移动设备
- **生产就绪**：Docker容器化，一键部署

## 技术栈

### 后端
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: SQLite (可升级至PostgreSQL)
- **AI集成**: DeepSeek Chat API (OpenAI兼容)
- **数据源**: Alpha Vantage API (股票数据)

### 前端
- **HTML5 + TailwindCSS**：现代响应式界面
- **原生JavaScript**：轻量级交互
- **REST API**：与后端通信

### 部署
- **Docker**：容器化部署
- **Docker Compose**：多服务编排
- **GitHub Actions**：CI/CD流水线（可选）

## 项目结构

```
mfactory-ai/
├── backend/                 # 后端服务
│   ├── index.js            # 主服务器文件
│   ├── package.json        # 依赖配置
│   ├── Dockerfile          # 容器配置
│   ├── .env.example        # 环境变量模板
│   └── public/             # 静态前端文件
│       └── index.html      # 主界面
├── docker-compose.yml      # Docker编排配置
├── README.md               # 本文档
└── README-original.md      # 原始静态版本文档
```

## 快速开始

### 环境准备

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/mfactory-ai.git
   cd mfactory-ai
   ```

2. **配置环境变量**
   ```bash
   cd backend
   cp .env.example .env
   # 编辑 .env 文件，填入您的API密钥
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

### 本地开发

1. **启动后端服务器**
   ```bash
   cd backend
   npm start
   # 或使用开发模式（自动重启）
   npm run dev
   ```

2. **访问应用**
   - 打开浏览器访问：http://localhost:3001
   - 输入股票代码（如300124）体验AI分析

### 使用Docker运行

1. **使用Docker Compose（推荐）**
   ```bash
   # 在项目根目录
   docker-compose up -d
   ```

2. **访问应用**
   - http://localhost:3001

## 配置说明

### 必需API密钥

1. **DeepSeek API密钥**
   - 访问 https://platform.deepseek.com/api-keys 获取
   - 设置 `.env` 中的 `DEEPSEEK_API_KEY`

2. **Alpha Vantage API密钥**（可选）
   - 访问 https://www.alphavantage.co/support/#api-key 获取免费密钥
   - 设置 `.env` 中的 `ALPHA_VANTAGE_API_KEY`
   - 如未设置，将使用模拟数据

### 其他配置

- `PORT`：服务器端口（默认3001）
- `DATABASE_PATH`：数据库文件路径
- `JWT_SECRET`：JWT令牌密钥（用于用户认证）

## 生产部署

### 部署到云服务器

1. **使用Docker Compose**
   ```bash
   # 1. 复制项目到服务器
   scp -r mfactory-ai user@your-server:/opt/
   
   # 2. 登录服务器
   ssh user@your-server
   
   # 3. 启动服务
   cd /opt/mfactory-ai
   docker-compose up -d
   
   # 4. 配置Nginx反向代理（可选）
   # 见 deployment/nginx.example.conf
   ```

2. **使用PM2（非容器化）**
   ```bash
   npm install -g pm2
   pm2 start backend/index.js --name mfactory-ai
   pm2 save
   pm2 startup
   ```

### 部署到云平台

#### Railway
1. 连接GitHub仓库
2. 设置环境变量
3. 自动部署

#### Fly.io
```bash
fly launch
fly deploy
```

#### Heroku
```bash
heroku create
heroku config:set DEEPSEEK_API_KEY=your_key
git push heroku main
```

## API文档

### 主要端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/stock/:symbol` | 获取股票数据和分析 |
| POST | `/api/auth/register` | 用户注册 |
| POST | `/api/auth/login` | 用户登录 |
| POST | `/api/analysis/save` | 保存分析历史 |

### 示例请求

```bash
# 获取股票分析
curl http://localhost:3001/api/stock/300124

# 用户注册
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## 开发路线图

- [x] 基础后端API服务
- [x] DeepSeek AI集成
- [x] 股票数据API集成
- [x] 用户认证系统
- [x] Docker容器化
- [ ] 前端React重写
- [ ] 实时数据推送
- [ ] 高级图表可视化
- [ ] 移动应用（React Native）
- [ ] 多语言支持

## 安全说明

1. **API密钥安全**
   - 永远不要将API密钥提交到版本控制
   - 使用环境变量管理密钥
   - 定期轮换密钥

2. **用户数据**
   - 密码使用bcrypt哈希存储
   - 敏感数据传输使用HTTPS
   - 实施速率限制

3. **合规性**
   - 投资分析仅供参考
   - 明确免责声明
   - 遵守当地金融监管规定

## 故障排除

### 常见问题

1. **AI分析失败**
   - 检查DeepSeek API密钥是否正确
   - 确认账户有足够额度
   - 查看服务器日志

2. **股票数据不可用**
   - 检查Alpha Vantage API密钥
   - 确认股票代码格式正确
   - 免费API有调用频率限制

3. **数据库错误**
   - 确保数据库文件可写
   - 检查SQLite版本兼容性

### 查看日志

```bash
# Docker Compose
docker-compose logs -f backend

# PM2
pm2 logs mfactory-ai

# 直接运行
cd backend && npm start
```

## 许可证

MIT License

## 免责声明

本工具提供的信息仅供参考，不构成投资建议。投资有风险，决策需谨慎。使用本工具即表示您同意自行承担所有投资风险。

## 支持与贡献

如有问题或建议，请：
1. 查看现有Issues
2. 提交新的Issue
3. 提交Pull Request

欢迎贡献代码、文档或功能建议！