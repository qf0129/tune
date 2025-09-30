// 获取两个日期间隔
export const GetDateInterval = (start: Date, end: Date): string => {
  const diff = Math.abs(end.getTime() - start.getTime());
  return FormatSeconds(diff / 1000);
}

// 格式化秒数显示
export const FormatSeconds = (seconds: number): string => {
  if (!Number.isFinite(seconds)) return '';
  const abs = Math.abs(seconds);

  const MIN = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const MONTH = 30 * DAY; // 按 30 天算

  if (abs < MIN) return `${Math.floor(abs)}秒`;
  if (abs < HOUR) {
    const m = Math.floor(abs / MIN);
    const s = Math.floor(abs % MIN);
    return s ? `${m}分${s}秒` : `${m}分`;
  }
  if (abs < DAY) {
    const h = Math.floor(abs / HOUR);
    const m = Math.floor((abs % HOUR) / MIN);
    return m ? `${h}小时${m}分` : `${h}小时`;
  }
  if (abs < MONTH) {
    const d = Math.floor(abs / DAY);
    const h = Math.floor((abs % DAY) / HOUR);
    return h ? `${d}天${h}小时` : `${d}天`;
  }
  const mo = Math.floor(abs / MONTH);
  return `${mo}个月+`;
}
