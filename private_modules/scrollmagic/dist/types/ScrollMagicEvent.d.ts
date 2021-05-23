import { DispatchableEvent } from './EventDispatcher';
import { ScrollMagic } from './ScrollMagic';
export declare enum EventType {
    Enter = "enter",
    Leave = "leave",
    Progress = "progress"
}
export declare enum EventLocation {
    Start = "start",
    Inside = "inside",
    End = "end"
}
export declare enum ScrollDirection {
    Forward = "forward",
    Reverse = "reverse"
}
declare type EnumToLiteral<T extends string> = `${T}`;
declare type ScrollMagicEventType = EnumToLiteral<EventType>;
declare type ScrollMagicEventLocation = EnumToLiteral<EventLocation>;
declare type ScrollMagicEventScrollDirection = EnumToLiteral<ScrollDirection>;
export declare class ScrollMagicEvent implements DispatchableEvent {
    readonly target: ScrollMagic;
    readonly type: ScrollMagicEventType;
    readonly location: ScrollMagicEventLocation;
    readonly direction: ScrollMagicEventScrollDirection;
    constructor(target: ScrollMagic, type: ScrollMagicEventType, movingForward: boolean);
}
export {};
//# sourceMappingURL=ScrollMagicEvent.d.ts.map