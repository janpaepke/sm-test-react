import { useEffect } from 'react';

import withScrollMagic, { ScrollMagicHocExternalProps } from './withScrollMagic';

export interface ScrollMagicElementProps extends ScrollMagicHocExternalProps {
	component?: keyof JSX.IntrinsicElements;
	render?: (renderProps: { progress: number }) => React.ReactNode;
}

const ScrollMagicElement: React.FC<ScrollMagicElementProps> = withScrollMagic(
	({ children, render, elemRef, progress, component: Component = 'div' }) => {
		// TODO: allow user to select wrapping component?
		useEffect(() => {
			if (null != children && undefined !== render) {
				console.warn(
					'ScrollMagicElement Error: Both children and the render prop are defined - children will always override the render function. Please use one or the other.'
				);
			}
		}, [children, render]);
		const output = children ?? render?.({ progress });
		return <div ref={elemRef}>{output}</div>;
	}
);

export default ScrollMagicElement;
