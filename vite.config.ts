import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { defineConfig, type Plugin } from 'vite';

const resumePdfUrl = '/assets/Twarit_Waikar_Resume.pdf';

function resumePdfPlugin(): Plugin {
  const pathnameOf = (url?: string) => url?.split('?')[0];

  const middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const pathname = pathnameOf(req.url);
    if (pathname === '/resume' || pathname === '/resume/') {
      res.statusCode = 302;
      res.setHeader('Location', resumePdfUrl);
      res.end();
      return;
    }
    next();
  };

  return {
    name: 'resume-pdf',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), resumePdfPlugin()],
});
