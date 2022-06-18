/**
 * 防抖
 * @param fn
 * @param wait
 */
declare function debounce(fn: any, wait: number): () => void;
/**
 * 节流
 * @param callback
 * @param duration
 */
declare function throttle(callback: any, duration: number): () => void;
export { debounce, throttle };
