const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;

export function formatDate(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < MINUTE) return 'только что';
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} мин. назад`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)} ч. назад`;
  if (diff < DAY * 30) return `${Math.floor(diff / DAY)} дн. назад`;
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}
