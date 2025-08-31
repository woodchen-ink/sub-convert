import type { UrlService } from '../services/url.service';
import { getTargetConfig } from '../page/config/targetConfig';
import { ResponseUtil } from '../shared/response';

export class UrlController {
    constructor(private service: UrlService) {}

    async toSub(request: Request, env: Env): Promise<Response> {
        try {
            const convertType = new URL(request.url).searchParams.get('target');
            if (!convertType) {
                return ResponseUtil.error('Unsupported client type');
            }

            const targetConfig = getTargetConfig();
            const supportList = targetConfig.map(item => item.value);

            if (!supportList.includes(convertType)) {
                return ResponseUtil.error(`Unsupported client type, support list: ${supportList.join(', ')}`);
            }

            const subConfig = await this.service.toSub(request, env, convertType);
            return ResponseUtil.cors(subConfig);
        } catch (error: any) {
            return ResponseUtil.error(error.message || 'Invalid request');
        }
    }
}

