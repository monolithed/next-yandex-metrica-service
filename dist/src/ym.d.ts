import type { YandexMetricaEventParameters } from '@/events';
declare function ym<T extends YandexMetricaEventParameters>(tagID: number, ...params: T): void;
export { ym };
