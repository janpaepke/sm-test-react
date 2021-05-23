export declare const throttleRaf: <F extends (...a: any) => any>(func: F) => ((this: ThisParameterType<F>, ...args: Parameters<F>) => void) & {
    cancel: () => void;
};
//# sourceMappingURL=throttleRaf.d.ts.map