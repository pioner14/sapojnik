// src/utils/path.ts
// Утилита для работы с путями при деплое на GitHub Pages / Netlify

const base = import.meta.env.BASE_URL || '';

export function path(href: string): string {
  // Если путь уже содержит base или это внешний URL
  if (href.startsWith('http') || href.startsWith('data:') || href.startsWith('#')) {
    return href;
  }
  
  // Убираем ведущий слеш если есть
  const cleanHref = href.startsWith('/') ? href.slice(1) : href;
  
  // Добавляем base
  if (base) {
    return `${base}/${cleanHref}`;
  }
  
  return `/${cleanHref}`;
}

export default path;
