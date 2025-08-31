import { getAdvancedConfig, getProtocolConfig, getTargetConfig } from './config';

export function showPage(request: Request, env: Env): Response {
    const targetConfig = getTargetConfig();
    const advancedConfig = getAdvancedConfig();
    const protocolConfig = getProtocolConfig();

    const html = `  
    <!DOCTYPE html>
        <html lang="zh-CN" theme="light">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>订阅转换器 - 专业的代理订阅格式转换工具</title>
                <meta name="description" content="专业的代理订阅格式转换工具，支持Clash、sing-box、v2ray等多种格式，支持Base64、YAML、JSON等编码格式，快速转换您的订阅链接。" />
                <meta name="keywords" content="订阅转换,代理订阅,Clash配置,sing-box,v2ray,订阅格式转换" />
                <meta name="author" content="Sub Converter" />
                <meta property="og:title" content="订阅转换器 - 专业的代理订阅格式转换工具" />
                <meta property="og:description" content="专业的代理订阅格式转换工具，支持多种格式和编码" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="${new URL(request.url).origin}" />
                <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔗</text></svg>" />

                <style>
                    :root {
                        --primary-bg: #F8F7F6;
                        --accent-color: #C08259;
                        --accent-hover: #B0734A;
                        --text-primary: #1D1D1F;
                        --text-secondary: #86868B;
                        --text-tertiary: #A1A1A6;
                        --border-color: #E5E5E7;
                        --border-hover: #D2D2D7;
                        --background: #FFFFFF;
                        --background-secondary: #F5F5F7;
                        --shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                        --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.08);
                        --radius: 12px;
                        --radius-large: 20px;
                        --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    }

                    body {
                        background: var(--primary-bg);
                        color: var(--text-primary);
                        font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans SC', system-ui, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        line-height: 1.5;
                        margin: 0;
                        padding: 0;
                    }

                    .container {
                        max-width: 900px;
                        margin: 0 auto;
                        padding: 24px;
                    }

                    .main-content {
                        background: var(--background);
                        border-radius: var(--radius-large);
                        padding: 40px;
                        box-shadow: var(--shadow);
                        border: 1px solid var(--border-color);
                        margin-bottom: 48px;
                    }

                    .section-title {
                        font-size: 36px;
                        font-weight: 600;
                        color: var(--text-primary);
                        margin: 0 0 8px 0;
                        text-align: center;
                    }

                    .section-description {
                        font-size: 16px;
                        color: var(--text-secondary);
                        text-align: center;
                        margin: 0 0 40px 0;
                        line-height: 1.6;
                    }

                    .form-grid {
                        display: grid;
                        gap: 32px;
                    }

                    .form-item {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }

                    .form-label {
                        font-size: 16px;
                        font-weight: 500;
                        color: var(--text-primary);
                    }

                    .form-input {
                        padding: 16px;
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius);
                        font-size: 16px;
                        background: var(--background);
                        color: var(--text-primary);
                        transition: var(--transition);
                        font-family: inherit;
                    }

                    .form-input:focus {
                        outline: none;
                        border-color: var(--accent-color);
                        box-shadow: 0 0 0 3px rgba(192, 130, 89, 0.1);
                    }

                    .form-input::placeholder {
                        color: var(--text-tertiary);
                    }

                    .form-select {
                        padding: 16px;
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius);
                        font-size: 16px;
                        background: var(--background);
                        color: var(--text-primary);
                        transition: var(--transition);
                        font-family: inherit;
                        cursor: pointer;
                    }

                    .form-select:focus {
                        outline: none;
                        border-color: var(--accent-color);
                        box-shadow: 0 0 0 3px rgba(192, 130, 89, 0.1);
                    }

                    .form-checkbox {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 12px 0;
                    }

                    .form-checkbox input[type="checkbox"] {
                        width: 20px;
                        height: 20px;
                        accent-color: var(--accent-color);
                        cursor: pointer;
                    }

                    .form-checkbox label {
                        font-size: 16px;
                        color: var(--text-primary);
                        cursor: pointer;
                    }

                    .result-section {
                        background: var(--background-secondary);
                        border-radius: var(--radius);
                        padding: 24px;
                        border: 1px solid var(--border-color);
                    }

                    .result-input {
                        width: 100%;
                        padding: 16px;
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius);
                        font-size: 16px;
                        background: var(--background);
                        color: var(--text-primary);
                        font-family: inherit;
                        box-sizing: border-box;
                    }

                    .button-group {
                        display: flex;
                        gap: 16px;
                        justify-content: center;
                        margin-top: 32px;
                    }

                    .btn {
                        padding: 16px 32px;
                        border: none;
                        border-radius: var(--radius);
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: var(--transition);
                        font-family: inherit;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .btn-primary {
                        background: var(--accent-color);
                        color: white;
                    }

                    .btn-primary:hover {
                        background: var(--accent-hover);
                        transform: translateY(-1px);
                        box-shadow: var(--shadow-hover);
                    }

                    .btn-primary:disabled {
                        background: var(--text-tertiary);
                        cursor: not-allowed;
                        transform: none;
                        box-shadow: none;
                    }

                    .btn-secondary {
                        background: var(--background);
                        color: var(--accent-color);
                        border: 1px solid var(--accent-color);
                    }

                    .btn-secondary:hover {
                        background: var(--accent-color);
                        color: white;
                        transform: translateY(-1px);
                        box-shadow: var(--shadow-hover);
                    }

                    .copy-icon {
                        width: 16px;
                        height: 16px;
                    }

                    .protocol-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 16px;
                    }

                    .advanced-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 16px;
                    }

                    @media (max-width: 768px) {
                        .container {
                            padding: 16px;
                        }
                        
                        .main-content {
                            padding: 32px 24px;
                        }
                        
                        .section-title {
                            font-size: 28px;
                        }
                        
                        .section-description {
                            font-size: 14px;
                        }
                        
                        .button-group {
                            flex-direction: column;
                        }
                        
                        .btn {
                            width: 100%;
                            justify-content: center;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <main class="main-content">
                        <h1 class="section-title">🔗 订阅转换器</h1>
                        <p class="section-description">
                            专业的代理订阅格式转换工具，支持多种订阅格式和客户端，快速转换您的代理订阅链接
                        </p>
                        
                        <form id="sub-convert-form" class="form-grid">
                            <div class="form-item">
                                <label class="form-label">订阅链接</label>
                                <textarea 
                                    class="form-input" 
                                    id="url-input"
                                    placeholder="支持yml/yaml订阅格式，base64订阅格式链接或单节点链接，多个链接每行一个或用 | 分隔"
                                    rows="4"
                                ></textarea>
                            </div>

                            <div class="form-item">
                                <label class="form-label">目标格式</label>
                                <select class="form-select" id="target-select">
                                    ${targetConfig.map(item => `<option value="${item.value}">${item.label}</option>`).join('')}
                                </select>
                            </div>

                            <div class="form-item">
                                <label class="form-label">包含节点</label>
                                <div class="protocol-grid">
                                    ${protocolConfig.map(item => `
                                        <div class="form-checkbox">
                                            <input type="checkbox" id="protocol-${item.value}" value="${item.value}" checked>
                                            <label for="protocol-${item.value}">${item.label}</label>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="form-item">
                                <label class="form-label">高级选项</label>
                                <div class="advanced-grid">
                                    ${advancedConfig.map(item => `
                                        <div class="form-checkbox">
                                            <input type="checkbox" id="advanced-${item.value}" value="${item.value}">
                                            <label for="advanced-${item.value}">${item.label}</label>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="form-item">
                                <label class="form-label">转换结果</label>
                                <div class="result-section">
                                    <input type="text" class="result-input" id="result-input" readonly placeholder="点击生成按钮获取转换结果">
                                </div>
                            </div>

                            <div class="button-group">
                                <button type="button" class="btn btn-primary" id="generate-btn" disabled>
                                    <span>生成订阅链接</span>
                                </button>
                                <button type="button" class="btn btn-secondary" id="copy-btn" disabled>
                                    <svg class="copy-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                                    </svg>
                                    <span>复制结果</span>
                                </button>
                            </div>
                        </form>
                    </main>
                </div>

                <script>
                    class SubConverter {
                        constructor() {
                            this.urlInput = document.getElementById('url-input');
                            this.targetSelect = document.getElementById('target-select');
                            this.generateBtn = document.getElementById('generate-btn');
                            this.copyBtn = document.getElementById('copy-btn');
                            this.resultInput = document.getElementById('result-input');
                            
                            this.init();
                        }

                        init() {
                            this.bindEvents();
                            this.updateGenerateButton();
                        }

                        bindEvents() {
                            this.urlInput.addEventListener('input', () => this.updateGenerateButton());
                            this.generateBtn.addEventListener('click', () => this.generateSub());
                            this.copyBtn.addEventListener('click', () => this.copyResult());
                        }

                        updateGenerateButton() {
                            const hasUrl = this.urlInput.value.trim().length > 0;
                            this.generateBtn.disabled = !hasUrl;
                        }

                        getSelectedProtocols() {
                            const checkboxes = document.querySelectorAll('input[id^="protocol-"]:checked');
                            return Array.from(checkboxes).map(cb => cb.value);
                        }

                        getSelectedAdvanced() {
                            const checkboxes = document.querySelectorAll('input[id^="advanced-"]:checked');
                            return Array.from(checkboxes).map(cb => cb.value);
                        }

                        async generateSub() {
                            const url = this.urlInput.value.trim();
                            const target = this.targetSelect.value;
                            const protocols = this.getSelectedProtocols();
                            const advanced = this.getSelectedAdvanced();

                            if (!url) {
                                this.showNotification('请输入订阅链接', 'error');
                                return;
                            }

                            try {
                                const apiUrl = new URL(window.location.origin + '/sub');
                                apiUrl.searchParams.set('target', target);
                                apiUrl.searchParams.set('url', url);
                                apiUrl.searchParams.set('insert', 'false');
                                apiUrl.searchParams.set('protocol', JSON.stringify(protocols));
                                
                                advanced.forEach(option => {
                                    apiUrl.searchParams.set(option, 'true');
                                });

                                this.resultInput.value = apiUrl.toString();
                                this.copyBtn.disabled = false;
                                this.showNotification('订阅链接生成成功', 'success');
                            } catch (error) {
                                this.showNotification('生成失败: ' + error.message, 'error');
                            }
                        }

                        async copyResult() {
                            const text = this.resultInput.value;
                            if (!text) {
                                this.showNotification('没有可复制的内容', 'error');
                                return;
                            }

                            try {
                                if (navigator.clipboard && window.isSecureContext) {
                                    await navigator.clipboard.writeText(text);
                                    this.showNotification('复制成功', 'success');
                                } else {
                                    const textArea = document.createElement('textarea');
                                    textArea.value = text;
                                    textArea.style.position = 'fixed';
                                    textArea.style.left = '-999999px';
                                    textArea.style.top = '-999999px';
                                    document.body.appendChild(textArea);
                                    textArea.focus();
                                    textArea.select();

                                    const success = document.execCommand('copy');
                                    textArea.remove();

                                    if (success) {
                                        this.showNotification('复制成功', 'success');
                                    } else {
                                        throw new Error('复制失败');
                                    }
                                }
                            } catch (error) {
                                this.showNotification('复制失败: ' + error.message, 'error');
                            }
                        }

                        showNotification(message, type = 'info') {
                            // 简单的通知显示
                            const notification = document.createElement('div');
                            
                            // 根据类型设置背景色
                            let bgColor = '#007AFF'; // 默认蓝色
                            if (type === 'success') bgColor = '#34C759';
                            else if (type === 'error') bgColor = '#FF3B30';
                            
                            notification.style.cssText = 'position: fixed; top: 20px; right: 20px; padding: 16px 24px; border-radius: var(--radius); color: white; font-weight: 500; z-index: 1000; transform: translateX(100%); transition: transform 0.3s ease; background: ' + bgColor + ';';
                            notification.textContent = message;
                            
                            document.body.appendChild(notification);
                            
                            setTimeout(() => {
                                notification.style.transform = 'translateX(0)';
                            }, 100);
                            
                            setTimeout(() => {
                                notification.style.transform = 'translateX(100%)';
                                setTimeout(() => {
                                    document.body.removeChild(notification);
                                }, 300);
                            }, 3000);
                        }
                    }

                    // 初始化应用
                    document.addEventListener('DOMContentLoaded', () => {
                        new SubConverter();
                    });
                </script>
            </body>
        </html>
    `;

    return new Response(html, {
        headers: new Headers({
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-store, no-cache, must-revalidate'
        })
    });
}

