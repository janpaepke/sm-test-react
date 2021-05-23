interface Bounds {
    readonly clientWidth: number;
    readonly clientHeight: number;
    readonly scrollWidth: number;
    readonly scrollHeight: number;
    readonly top: number;
    readonly left: number;
}
declare const getScrollContainerBounds: (element: Window | Element) => Bounds;
export default getScrollContainerBounds;
//# sourceMappingURL=getScrollContainerBounds.d.ts.map