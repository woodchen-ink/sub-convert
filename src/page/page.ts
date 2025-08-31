import { SubButton, SubCheckbox, SubForm, SubFormItem, SubInput, SubMessage, SubMultiSelect, SubSelect, SubTextarea } from './components';
import { getAdvancedConfig, getProtocolConfig, getTargetConfig } from './config';
import { theme } from './script/theme';
import { layout } from './style/layout';
import { style } from './style/style';

export function showPage(request: Request, env: Env): Response {
    const targetConfig = getTargetConfig();
    const advancedConfig = getAdvancedConfig();
    const protocolConfig = getProtocolConfig();

    const html = `  
    <!DOCTYPE html>
        <html lang="zh-CN" theme="dark">
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

                ${style()}
                ${layout()}

                <style>
                    .input-group {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .input-group input {
                        width: 100%;
                        padding: 4px 11px;
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius);
                        transition: var(--transition);
                        min-height: 32px;
                        box-sizing: border-box;
                        flex: 1;
                        background-color: var(--background);
                        color: var(--text-disabled);
                        cursor: not-allowed;
                    }

                    .input-group input:disabled {
                        border-color: var(--border-color);
                        background-color: var(--background-disabled);
                        color: var(--text-disabled);
                        opacity: 1;
                    }

                    .sub-form-item__actions {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 20px;
                        margin-top: 24px;
                        padding-right: 100px;
                    }

                    .header {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 0 0 20px 20px;
                        margin-bottom: 30px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    }

                    .header__title {
                        font-size: 28px;
                        font-weight: 700;
                        background: linear-gradient(45deg, #fff, #f0f0f0);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }

                    .main-content {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 0 20px;
                    }

                    .form-container {
                        background: var(--background);
                        border-radius: 16px;
                        padding: 30px;
                        box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                        border: 1px solid var(--border-color);
                    }

                    .form-title {
                        text-align: center;
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 30px;
                        color: var(--text-primary);
                    }

                    .form-description {
                        text-align: center;
                        color: var(--text-secondary);
                        margin-bottom: 30px;
                        line-height: 1.6;
                    }
                </style>
            </head>
            <body>
                ${theme()}

                <main class="main-content">
                    <header class="header">
                        <div style="text-align: center; padding: 40px 20px;">
                            <h1 class="header__title">🔗 订阅转换器</h1>
                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
                                专业的代理订阅格式转换工具
                            </p>
                        </div>
                    </header>

                    <section class="form-container">
                        <div class="form-title">订阅格式转换</div>
                        <div class="form-description">
                            支持多种订阅格式和客户端，快速转换您的代理订阅链接
                        </div>
                        
                        <sub-form id="sub-convert-form" label-width="120px">
                            <sub-form-item label="订阅链接">
                                <sub-textarea
                                    key="url"
                                    placeholder="支持yml/yaml订阅格式，base64订阅格式链接或单节点链接，多个链接每行一个或用 | 分隔"
                                    rows="4"
                                ></sub-textarea>
                            </sub-form-item>

                            <sub-form-item label="目标格式">
                                <sub-select key="target"></sub-select>
                            </sub-form-item>

                            <sub-form-item label="包含节点">
                                <sub-multi-select key="protocol" span="3"></sub-multi-select>
                            </sub-form-item>

                            <sub-form-item label="高级选项">
                                <sub-checkbox key="advanced" span="5"></sub-checkbox>
                            </sub-form-item>

                            <sub-form-item label="转换结果">
                                <div class="input-group">
                                    <input type="text" value="" disabled id="form-subscribe" />
                                    <sub-button type="default" onclick="sub.copySubUrl('form-subscribe')">
                                        <svg
                                            viewBox="64 64 896 896"
                                            focusable="false"
                                            data-icon="copy"
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
                                            ></path>
                                        </svg>
                                        复制
                                    </sub-button>
                                </div>
                            </sub-form-item>

                            <sub-form-item>
                                <div class="sub-form-item__actions">
                                    <sub-button disabled id="generate-sub-btn" type="default">生成订阅链接</sub-button>
                                </div>
                            </sub-form-item>
                        </sub-form>
                    </section>
                </main>

                ${SubInput()}
                ${SubTextarea()}
                ${SubSelect()}
                ${SubMultiSelect()}
                ${SubCheckbox()}
                ${SubFormItem()}
                ${SubForm()}
                ${SubButton()}
                ${SubMessage()}

                <script>
                    const formConfig = {
                        target: {
                            type: 'sub-select',
                            options: ${JSON.stringify(targetConfig)}
                        },
                        protocol: {
                            type: 'sub-multi-select',
                            options: ${JSON.stringify(protocolConfig)}
                        },
                        advanced: {
                            type: 'sub-checkbox',
                            options: ${JSON.stringify(advancedConfig)}
                        }
                    };

                    class Sub {
                        #model = {
                            target: '${targetConfig[0].value}',
                            protocol: '${JSON.stringify(protocolConfig.map(item => item.value))}',
                            advanced: ['emoji', 'new_name'],

                            subUrl: ''
                        };

                        #formSubscribe = this.#$('#form-subscribe');

                        #generateSubBtn = this.#$('#generate-sub-btn');

                        #form = this.#$('#sub-convert-form');
                        #formItems = this.#form.querySelectorAll('sub-form-item');

                        #headerIcon = this.#$('.header__icon');

                        constructor() {
                            this.#init();
                            this.#bindEvents();
                        }

                        #init() {
                            this.#formItems.forEach(item => {
                                const formItem = item.querySelector('[key]');
                                if (formItem) {
                                    const formItemKey = formItem.getAttribute('key');
                                    const type = formConfig[formItemKey]?.type;
                                    if (type && ['sub-select', 'sub-checkbox', 'sub-multi-select'].includes(type)) {
                                        formItem.setAttribute('options', JSON.stringify(formConfig[formItemKey].options));
                                    }

                                    if (formConfig[formItemKey]?.disabled) {
                                        formItem.setAttribute('disabled', '');
                                    }
                                }
                            });

                            this.#form.setAttribute('model', JSON.stringify(this.#model));
                        }

                        #bindEvents() {

                            this.#headerIcon.addEventListener('click', () => {
                                window.open('https://github.com/jwyGithub/sub-convert');
                            });


                            this.#form.addEventListener('form:change', e => {
                                this.#model[e.detail.key] = e.detail.value;
                                this.#form.setAttribute('model', JSON.stringify(this.#model));

                                if (this.#model.url) {
                                    this.#generateSubBtn.removeAttribute('disabled');
                                } else {
                                    this.#generateSubBtn.setAttribute('disabled', '');
                                }
                            });

                            this.#generateSubBtn.addEventListener('click', () => {
                                const url = new URL(window.location.origin + '/sub');
                                url.searchParams.set('target', this.#model.target);
                                url.searchParams.set('url', this.#model.url);
                                url.searchParams.set('insert', 'false');
                                url.searchParams.set('protocol', Array.isArray(this.#model.protocol) ? JSON.stringify(this.#model.protocol) : this.#model.protocol);
                                
                                const advancedOptions = this.#getAdvancedOptions(this.#model);

                                advancedOptions.forEach(option => {
                                    url.searchParams.set(option.label, option.value);
                                });

                                const subUrl = url.toString();
                                this.#formSubscribe.value = subUrl;
                                this.#model.subUrl = subUrl;
                            });
                        }

                        #getAdvancedOptions(model) {
                            return formConfig.advanced.options.map(option => {
                                return {
                                    label: option.value,
                                    value: model.advanced.includes(option.value)
                                };
                            });
                        }

                        /**
                         * 获取元素
                         * @param {string} selector
                         * @returns {HTMLElement}
                         */
                        #$(selector) {
                            return document.querySelector(selector);
                        }

                        async copySubUrl(dom) {
                            const text = this.#$(`#${dom}`).value;
                            if (!text) {
                                notification.error('复制内容不能为空');
                                return;
                            }

                            const success = await this.copyToClipboard(text);
                            if (success) {
                                notification.success('复制成功');
                            }
                        }

                        async copyToClipboard(text) {
                            try {
                                if (navigator.clipboard && window.isSecureContext) {
                                    // 优先使用 Clipboard API
                                    await navigator.clipboard.writeText(text);
                                    return true;
                                } else {
                                    // 降级使用 document.execCommand
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

                                    if (!success) {
                                        throw new Error('复制失败');
                                    }
                                    return true;
                                }
                            } catch (error) {
                                notification.error('复制失败: ' + (error.message || '未知错误'));
                                return false;
                            }
                        }
                    }

                    const sub = new Sub();

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

