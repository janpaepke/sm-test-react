import { ScrollMagicHookOptions, useScrollMagic } from './useScrollMagic';

export interface ScrollMagicHocExternalProps extends ScrollMagicHookOptions {}

export interface ScrollMagicHocInternalProps {
	progress: number;
	elemRef: React.RefCallback<HTMLElement>;
}

const withScrollMagic =
	<P extends Record<string, any>>(
		WrappedComponent: React.ComponentType<P & ScrollMagicHocInternalProps>
	): React.FC<P & ScrollMagicHocExternalProps> =>
	({
		elementStart,
		elementEnd,
		triggerStart,
		triggerEnd,
		vertical,
		onEnter,
		onLeave,
		onProgress,
		plugins,
		...rest
	}) => {
		const [elemRef, progress] = useScrollMagic({
			elementStart,
			elementEnd,
			triggerStart,
			triggerEnd,
			vertical,
			onEnter,
			onLeave,
			onProgress,
			plugins,
		});

		return <WrappedComponent elemRef={elemRef} progress={progress} {...(rest as P)} />;
	};

export default withScrollMagic;
