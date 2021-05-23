export declare const debounce: <F extends (...args: any) => ReturnType<F>>(func: F, wait: number) => ((...args: Parameters<F>) => ReturnType<F>) & {
    cancel: () => void;
};
//# sourceMappingURL=debounce.d.ts.map