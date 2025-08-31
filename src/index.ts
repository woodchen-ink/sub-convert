import { UrlController } from './controllers/url.controller';
import { Router } from './core/router';
import { showPage } from './page/page';
import { UrlService } from './services/url.service';
import { ResponseUtil } from './shared/response';

const router = new Router();

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        try {
            if (request.method === 'OPTIONS') {
                return ResponseUtil.cors(new Response(null, { status: 200 }));
            }

            const service = new UrlService();
            const controller = new UrlController(service);

            router
                .get('/', req => showPage(req, env))
                .get('/favicon.ico', () => new Response(null, { status: 200 }))
                .get('/sub', req => controller.toSub(req, env));

            const response = await router.handle(request, env);
            return ResponseUtil.cors(response);
        } catch (error: any) {
            return ResponseUtil.error(error.message || error);
        }
    }
} satisfies ExportedHandler<Env>;

