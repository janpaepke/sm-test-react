import { DispatchableEvent } from './EventDispatcher';
export declare type ScrollParent = HTMLElement | Window;
declare type ScrollDelta = {
    deltaX: number;
    deltaY: number;
};
declare enum EventType {
    Scroll = "scroll",
    Resize = "resize"
}
export declare class ContainerEvent implements DispatchableEvent {
    readonly target: Container;
    readonly type: `${EventType}`;
    readonly scrollDelta: ScrollDelta;
    constructor(target: Container, type: `${EventType}`, scrollDelta?: ScrollDelta);
}
export declare class Container {
    readonly scrollParent: ScrollParent;
    private dimensions;
    private scrollPos;
    private positionCache;
    private dispatcher;
    private cleanups;
    constructor(scrollParent: ScrollParent);
    private updateScrollPos;
    private updateDimensions;
    private updatePosition;
    private subscribeResize;
    private subscribeScroll;
    private subscribeMove;
    subscribe(type: `${EventType}`, cb: (e: ContainerEvent) => void): () => void;
    get size(): Container['dimensions'];
    get position(): Container['positionCache'];
    destroy(): void;
}
export {};
//# sourceMappingURL=Container.d.ts.map