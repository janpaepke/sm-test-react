import React, { useCallback, useEffect, useRef, useState } from 'react';
import ScrollMagic, { ScrollMagicEvent, ScrollMagicOptions, ScrollMagicPlugin } from 'scrollmagic';

// import {ScrollMagicTween} from 'scrollmagic-tween'

// const MySM = ScrollMagic.extend([ScrollMagicTween]);

// element is set via ref
// todo: scrollParent not supported yet. Maybe also via ref? or maybe using contexts?
type Options = Pick<ScrollMagicOptions, 'elementStart' | 'elementEnd' | 'triggerStart' | 'triggerEnd' | 'vertical'>;

interface Callbacks {
	onProgress?: (e: ScrollMagicEvent) => void;
	onEnter?: (e: ScrollMagicEvent) => void;
	onLeave?: (e: ScrollMagicEvent) => void;
}

export interface ScrollMagicHookOptions extends Options, Callbacks {
	plugins?: ScrollMagicPlugin[];
}

const stripUndefined = (obj: { [key: string]: any }) =>
	Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

export const useScrollMagic = ({
	elementStart,
	elementEnd,
	triggerStart,
	triggerEnd,
	vertical,
	onProgress,
	onEnter,
	onLeave,
	plugins = [],
}: ScrollMagicHookOptions = {}): [elementRef: React.RefCallback<HTMLElement>, progress: number] => {
	const sm = useRef<ScrollMagic | null>(null);
	const smOptions = useRef<ScrollMagicOptions>({}); // set in useEffect below
	const callbacks = useRef<Callbacks>({});
	callbacks.current = { onProgress, onEnter, onLeave };
	const [progress, setProgress] = useState(0);

	const setOptions = useCallback((changes: ScrollMagicOptions) => {
		smOptions.current = { ...smOptions.current, ...changes };
		sm.current?.modify(smOptions.current);
	}, []);

	// set hook options initally (no sm instance yet, so no side effect) and then update, when they change
	useEffect(
		() => setOptions(stripUndefined({ elementStart, elementEnd, triggerStart, triggerEnd, vertical })),
		[elementStart, elementEnd, triggerStart, triggerEnd, vertical, setOptions]
	);

	// create / destroy sm on mount / unmount
	useEffect(() => {
		const instance = new ScrollMagic(smOptions.current)
			.on('progress', (e) => {
				setProgress(e.target.progress);
				callbacks.current.onProgress?.(e);
			})
			.on('enter', (e) => callbacks.current.onEnter?.(e))
			.on('leave', (e) => callbacks.current.onLeave?.(e));

		sm.current = instance;
		return () => {
			instance.destroy();
			sm.current = null;
		};
	}, []);

	useEffect(() => {
		// compare old list of plugins to new one, to see what changed (and then process differences)
		const next = new Set(plugins);
		// check every known plugin against the next list
		sm.current?.pluginList.forEach((knownPlugin) => {
			if (next.delete(knownPlugin)) {
				// intersection, remove from next, so that only those missing from known list will remain
				return;
			}
			// old plugin, remove
			sm.current?.removePlugin(knownPlugin);
		});
		// next now only contains elements missing from current list
		next.forEach((newPlugin) => {
			// new plugin, add
			sm.current?.addPlugin(newPlugin);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, plugins);

	// create triggerElement ref callback
	const elementRef: React.RefCallback<HTMLElement> = useCallback((element) => setOptions({ element }), [setOptions]);

	return [elementRef, progress];
};
