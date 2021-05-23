declare type SameProperties<T extends {
    [K in keyof T]: unknown;
}, R extends {
    [K in keyof T]: unknown;
}> = R;
declare type ExtendProperty<T extends {
    [K in keyof T]: unknown;
}, K extends keyof T, E> = Omit<T, K> & {
    [X in K]: T[X] | E;
};
declare type ModifyProperty<T extends {
    [K in keyof T]: unknown;
}, K extends keyof T, E> = Omit<T, K> & {
    [X in K]: E;
};
declare type UnitString = `${number}px` | `${number}%`;
declare type CenterShorthand = 'center';
declare type CssSelector = string;
export declare type PixelConverter = (size: number) => number;
export declare type Public = {
    element?: Element | CssSelector | null;
    scrollParent?: Window | Document | Element | CssSelector;
    vertical?: boolean;
    triggerStart?: number | UnitString | CenterShorthand | PixelConverter | null;
    triggerEnd?: number | UnitString | CenterShorthand | PixelConverter | null;
    elementStart?: number | UnitString | CenterShorthand | PixelConverter;
    elementEnd?: number | UnitString | CenterShorthand | PixelConverter;
};
export declare type Private = SameProperties<Public, {
    element: HTMLElement | SVGElement;
    scrollParent: Window | HTMLElement;
    vertical: boolean;
    triggerStart: PixelConverter;
    triggerEnd: PixelConverter;
    elementStart: PixelConverter;
    elementEnd: PixelConverter;
}>;
export declare type PrivateUninferred = ExtendProperty<Private, 'triggerStart' | 'triggerEnd' | 'element', null>;
export declare type PrivateComputed = ModifyProperty<Private, 'triggerStart' | 'triggerEnd' | 'elementStart' | 'elementEnd', number>;
export declare const defaults: Required<Public>;
export declare const inferredTriggers: Record<string, PixelConverter>;
export {};
//# sourceMappingURL=Options.d.ts.map