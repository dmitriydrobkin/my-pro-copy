export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-gray-400">Сторінка не знайдена / Страница не найдена</p>
      </div>
    </div>
  );
}