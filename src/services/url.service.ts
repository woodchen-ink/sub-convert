import { dump } from 'js-yaml';
import { Confuse } from '../core/confuse';
import { Restore } from '../core/restore';
import { ResponseUtil } from '../shared/response';

export class UrlService {
    async toSub(request: Request, env: Env, convertType: string): Promise<Response> {
        try {
            const confuse = new Confuse(env);
            await confuse.setSubUrls(request);

            const restore = new Restore(confuse);
            if (['clash', 'clashr'].includes(convertType)) {
                const originConfig = await restore.getClashConfig();
                return new Response(dump(originConfig, { indent: 2, lineWidth: 200 }), {
                    headers: new Headers({
                        'Content-Type': 'text/yaml; charset=UTF-8',
                        'Cache-Control': 'no-store'
                    })
                });
            }

            if (convertType === 'singbox') {
                const originConfig = await restore.getSingboxConfig();
                return new Response(JSON.stringify(originConfig), {
                    headers: new Headers({
                        'Content-Type': 'text/plain; charset=UTF-8',
                        'Cache-Control': 'no-store'
                    })
                });
            }

            if (convertType === 'v2ray') {
                const originConfig = await restore.getV2RayConfig();
                return new Response(originConfig, {
                    headers: new Headers({
                        'Content-Type': 'text/plain; charset=UTF-8',
                        'Cache-Control': 'no-store'
                    })
                });
            }

            return ResponseUtil.error('Unsupported client type, support list: clash, singbox, v2ray');
        } catch (error: any) {
            throw new Error(error.message || 'Invalid request');
        }
    }
}

