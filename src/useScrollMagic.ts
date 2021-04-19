import { useEffect, useRef } from 'react';
import { ScrollMagic } from 'scrollmagic';

type Options = { element?: HTMLElement | SVGElement | null };
type Callbacks = {
	onProgress?: (e: { target: ScrollMagic }) => void;
	onEnter?: (e: { target: ScrollMagic }) => void;
	onLeave?: (e: { target: ScrollMagic }) => void;
};
export const useScrollMagic = ({ element }: Options, { onProgress, onEnter, onLeave }: Callbacks = {}) => {
	const ref = useRef<any>(null);
	useEffect(() => {
		if (ref.current === null) {
			return;
		}
		const sm = new ScrollMagic({ element: ref.current });
		if (undefined !== onProgress) {
			sm.on('progress', onProgress);
		}
		if (undefined !== onEnter) {
			sm.on('enter', onEnter);
		}
		if (undefined !== onLeave) {
			sm.on('leave', onLeave);
		}

		return () => {
			sm.destroy();
		};
	}, [onProgress, onEnter, onLeave]);

	// useEffect(() => {
	// 	if (undefined === element) {
	// 		return;
	// 	}
	// 	ref.current = element;
	// }, [element]);

	return [ref];
};
