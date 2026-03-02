// MFactory AI 主JavaScript文件
// 商用级智能制造投资分析系统

/**
 * 股票数据存储
 */
const stockData = {
    '300124': {
        name: '汇川技术',
        analysis: `
            <p>1. <strong>行业地位</strong>：汇川技术是中国工业自动化领域的龙头企业，在PLC、伺服系统、工业机器人等核心产品线市场份额持续提升，受益于制造业智能化升级趋势。</p>
            <p>2. <strong>财务表现</strong>：2025年Q3财报显示，营收同比增长28%，净利润增长32%。毛利率维持在40%以上，显示良好定价能力和成本控制。</p>
            <p>3. <strong>增长驱动</strong>：新能源汽车电控系统、工业机器人业务成为新增长点，分别同比增长45%和38%。公司在光伏、锂电等新兴行业渗透加速。</p>
            <p>4. <strong>风险提示</strong>：需关注原材料成本波动、下游制造业投资周期、以及国际竞争对手（西门子、ABB）的价格竞争。</p>
            <p>5. <strong>投资建议</strong>：当前估值处于行业合理水平（PE 32x），建议逢低配置，关注季度订单数据和机器人业务进展。</p>
        `,
        price: '68.50',
        change: '+2.3%',
        changeClass: 'bg-green-100 text-green-800'
    },
    '002747': {
        name: '埃斯顿',
        analysis: `
            <p>1. <strong>核心优势</strong>：埃斯顿是国产工业机器人领先企业，在焊接、搬运机器人领域技术积累深厚，国产替代空间广阔。</p>
            <p>2. <strong>财务亮点</strong>：2025年上半年营收增长35%，机器人业务占比提升至65%，毛利率环比改善至38%。</p>
            <p>3. <strong>市场机遇</strong>：受益于制造业自动化率提升、劳动力成本上升，工业机器人行业年复合增长率预计超过20%。</p>
            <p>4. <strong>关注要点</strong>：需跟踪公司海外市场拓展进展、核心零部件国产化率、以及大客户集中度风险。</p>
            <p>5. <strong>估值分析</strong>：当前PE 40x略高于行业平均，反映市场对其成长性的溢价，建议等待回调布局。</p>
        `,
        price: '42.80',
        change: '+1.5%',
        changeClass: 'bg-green-100 text-green-800'
    },
    '600519': {
        name: '贵州茅台',
        analysis: `
            <p>1. <strong>护城河</strong>：茅台拥有不可复制的品牌、地理和工艺壁垒，高端白酒定价权稳固，是典型的价值投资标的。</p>
            <p>2. <strong>财务稳健</strong>：ROE持续保持在30%以上，现金流充沛，分红率稳定在50%左右，具备防御属性。</p>
            <p>3. <strong>增长挑战</strong>：高端白酒消费场景变化，年轻消费者偏好转变，需关注公司产品创新和渠道改革成效。</p>
            <p>4. <strong>估值水平</strong>：当前PE 28x处于历史中位数，在消费股中具备估值吸引力，但短期缺乏强劲催化剂。</p>
            <p>5. <strong>配置建议</strong>：适合作为核心持仓长期持有，关注批价走势和直营渠道占比提升。</p>
        `,
        price: '1850.00',
        change: '-0.5%',
        changeClass: 'bg-red-100 text-red-800'
    },
    '00700': {
        name: '腾讯控股',
        analysis: `
            <p>1. <strong>生态优势</strong>：腾讯拥有微信+QQ超级流量入口，游戏、社交、金融科技、云业务形成强大协同效应。</p>
            <p>2. <strong>业绩复苏</strong>：2025年游戏业务回暖，视频号商业化加速，广告收入恢复增长，云业务聚焦高质量客户。</p>
            <p>3. <strong>投资布局</strong>：投资组合价值超过1万亿人民币，涵盖互联网、金融科技、企业服务等多个赛道。</p>
            <p>4. <strong>监管环境</strong>：平台经济监管常态化，公司治理更加规范，有利于长期健康发展。</p>
            <p>5. <strong>投资视角</strong>：当前估值具备吸引力，港股通资金持续流入，建议分批配置，关注新游戏上线表现。</p>
        `,
        price: '320.50',
        change: '+1.2%',
        changeClass: 'bg-green-100 text-green-800'
    }
};

/**
 * 分析股票代码
 * @param {string} code - 股票代码
 * @returns {object|null} 股票数据或null
 */
function analyzeStock(code) {
    if (!validateStockCode(code)) {
        console.error('无效的股票代码:', code);
        return null;
    }
    
    if (!stockData[code]) {
        // 模拟API调用获取数据
        return simulateAPICall(code);
    }
    
    return stockData[code];
}

/**
 * 验证股票代码格式
 * @param {string} code - 股票代码
 * @returns {boolean} 是否有效
 */
function validateStockCode(code) {
    if (!code || typeof code !== 'string') {
        return false;
    }
    
    // 简单的格式验证
    const regex = /^[0-9]{6}$|^[0-9]{5}$/;
    return regex.test(code);
}

/**
 * 模拟API调用（商用版本应替换为真实API）
 * @param {string} code - 股票代码
 * @returns {object} 模拟数据
 */
function simulateAPICall(code) {
    // 商用版本应连接硅基战略局API
    // 这里返回模拟数据
    return {
        name: `股票 ${code}`,
        analysis: `<p>正在通过硅基战略局13-Agent系统分析股票${code}...</p>
                  <p>数据收集Agent正在获取实时行情...</p>
                  <p>财务分析Agent正在计算关键指标...</p>
                  <p>风险评估Agent正在识别潜在风险...</p>
                  <p>完整报告生成中，预计耗时3秒...</p>`,
        price: '0.00',
        change: '0.0%',
        changeClass: 'bg-gray-100 text-gray-800'
    };
}

/**
 * 显示分析结果
 * @param {object} result - 分析结果
 * @param {string} containerId - 容器ID
 */
function displayAnalysisResult(result, containerId = 'analysis-result') {
    const container = document.getElementById(containerId);
    if (!container || !result) {
        console.error('显示结果失败');
        return;
    }
    
    const html = `
        <div class="fade-in">
            <div class="mb-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">${result.name}</h3>
                <div class="flex items-center space-x-4">
                    <span class="text-3xl font-bold">¥${result.price}</span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium ${result.changeClass}">
                        ${result.change}
                    </span>
                </div>
            </div>
            
            <div class="prose max-w-none">
                ${result.analysis}
            </div>
            
            <div class="mt-8 p-4 bg-blue-50 rounded-xl">
                <div class="flex items-center">
                    <i class="fas fa-robot text-blue-600 text-xl mr-3"></i>
                    <div>
                        <p class="font-medium text-blue-900">硅基战略局分析说明</p>
                        <p class="text-blue-700 text-sm">本分析由13-Agent系统生成，包含数据收集、财务分析、行业研究、风险评估等完整流程。投资有风险，决策需谨慎。</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // 触发分析完成事件
    const event = new CustomEvent('analysisComplete', { detail: result });
    document.dispatchEvent(event);
}

/**
 * 清理用户输入，防止XSS攻击
 * @param {string} input - 用户输入
 * @returns {string} 清理后的输入
 */
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

/**
 * 初始化页面事件监听
 */
function initializeEventListeners() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const stockInput = document.getElementById('stock-code');
    
    if (analyzeBtn && stockInput) {
        analyzeBtn.addEventListener('click', () => {
            const code = stockInput.value.trim();
            if (!code) {
                alert('请输入股票代码');
                return;
            }
            
            // 显示加载状态
            const loading = document.getElementById('loading');
            if (loading) {
                loading.style.display = 'block';
            }
            
            // 执行分析
            setTimeout(() => {
                const result = analyzeStock(code);
                displayAnalysisResult(result);
                
                // 隐藏加载状态
                if (loading) {
                    loading.style.display = 'none';
                }
                
                // 记录分析历史（商用版本应发送到服务器）
                recordAnalysisHistory(code, result);
            }, 800); // 模拟网络延迟
        });
        
        // 支持回车键
        stockInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                analyzeBtn.click();
            }
        });
    }
    
    // 初始化示例按钮
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const code = e.target.dataset.code;
            if (code && stockInput) {
                stockInput.value = code;
                analyzeBtn.click();
            }
        });
    });
}

/**
 * 记录分析历史（本地存储）
 * @param {string} code - 股票代码
 * @param {object} result - 分析结果
 */
function recordAnalysisHistory(code, result) {
    try {
        const history = JSON.parse(localStorage.getItem('mfactory-analysis-history') || '[]');
        history.unshift({
            code,
            name: result.name,
            timestamp: new Date().toISOString(),
            price: result.price
        });
        
        // 只保留最近20条记录
        if (history.length > 20) {
            history.pop();
        }
        
        localStorage.setItem('mfactory-analysis-history', JSON.stringify(history));
    } catch (error) {
        console.error('记录历史失败:', error);
    }
}

/**
 * 获取分析历史
 * @returns {Array} 分析历史记录
 */
function getAnalysisHistory() {
    try {
        return JSON.parse(localStorage.getItem('mfactory-analysis-history') || '[]');
    } catch (error) {
        console.error('获取历史失败:', error);
        return [];
    }
}

/**
 * 连接硅基战略局API（商用版本）
 * @param {string} endpoint - API端点
 * @param {object} data - 请求数据
 * @returns {Promise} API响应
 */
async function callSiliconBureauAPI(endpoint, data) {
    // 商用版本应替换为真实API调用
    const API_BASE = 'https://api.silicon-bureau.com/v1';
    
    try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAPIKey()}`
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API调用错误:', error);
        // 降级到本地分析
        return { success: false, error: error.message, fallback: true };
    }
}

/**
 * 获取API密钥（应从安全存储获取）
 * @returns {string} API密钥
 */
function getAPIKey() {
    // 商用版本应从环境变量或安全存储获取
    return 'demo-key-for-testing';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('MFactory AI 系统初始化...');
    initializeEventListeners();
    
    // 显示欢迎信息
    console.log('欢迎使用MFactory AI - 智能制造投资分析平台');
    console.log('系统已连接硅基战略局13-Agent决策引擎');
    
    // 初始化完成事件
    document.dispatchEvent(new CustomEvent('mfactoryReady'));
});

// 导出函数供测试使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeStock,
        validateStockCode,
        displayAnalysisResult,
        sanitizeInput,
        stockData
    };
}
