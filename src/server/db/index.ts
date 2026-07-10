import { drizzle } from 'drizzle-orm/d1';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from './schema';

let _db: any = null;

export const db = new Proxy({} as any, {
  get(target, prop) {
    // ⚡ САМОЕ ВАЖНОЕ: Запрещаем Next.js уходить в вечную загрузку
    if (prop === 'then') return undefined;

    if (!_db) {
      let d1Binding: any = undefined;

      try {
        const ctx = getRequestContext();
        if (ctx?.env?.DB) d1Binding = ctx.env.DB;
      } catch (e) {}

      if (!d1Binding && typeof process !== 'undefined') {
        d1Binding = process.env?.DB;
      }

      // Если базы нет (во время сборки), возвращаем заглушку
      if (!d1Binding) {
        // Проверяем, находимся ли мы в среде сборки Node.js (npm run build)
        const isBuildTime = typeof process !== 'undefined' && process.release?.name === 'node';
        
        if (isBuildTime) {
          // Отдаем заглушку ТОЛЬКО при сборке сайта
          const mockObj = {
            select: () => mockObj,
            from: () => mockObj,
            where: () => mockObj,
            orderBy: () => mockObj,
            limit: () => mockObj,
            offset: () => mockObj,
            all: () => [],
            get: () => null,
            insert: () => mockObj,
            values: () => mockObj,
            returning: () => mockObj,
            run: () => ({ success: true }),
            update: () => mockObj,
            set: () => mockObj,
            delete: () => mockObj,
          };
          return mockObj[prop as keyof typeof mockObj] || (() => mockObj);
        }
        
        // В реальном продакшене (Edge runtime) мы обязаны упасть с ошибкой, 
        // чтобы разработчик сразу увидел проблему, а не терял лиды!
        throw new Error('🔥 КРИТИЧЕСКАЯ ОШИБКА: База данных D1 не подключена! Проверьте Bindings в Cloudflare.');
      }

      _db = drizzle(d1Binding, { schema });
    }

    const value = _db[prop];
    return typeof value === 'function' ? value.bind(_db) : value;
  }
});