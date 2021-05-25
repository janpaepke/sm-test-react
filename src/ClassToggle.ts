import ScrollMagic, { ScrollMagicEvent, ScrollMagicPluginFactory } from 'scrollmagic';

type CssClass = string;

type ToggleInstanceElement = CssClass | CssClass[];
type ToggleCustomElements = Record<CssClass, Element | Element[]>;

export type ClassToggleOptions = ToggleInstanceElement | ToggleCustomElements;

const addClasses = (classNames: CssClass[], elem: Element) => elem.classList.add(...classNames);
const removeClasses = (classNames: CssClass[], elem: Element) => elem.classList.remove(...classNames);

const assignmentMapFactory = (options: ClassToggleOptions): ((instance: ScrollMagic) => Map<Element, CssClass[]>) => {
	// normalize to either a list of stings or assignment object
	const cleanOptions = typeof options === 'string' ? [options] : options;
	if (Array.isArray(cleanOptions)) {
		// list of classes to be attached to sm instance
		return (instance) => new Map([[instance.computedOptions.element, cleanOptions]]);
	}
	// object containing assignents (ignore instance)
	const assignents = Object.entries(cleanOptions).reduce((map, [className, target]) => {
		const elements = Array.isArray(target) ? target : [target];
		elements.forEach((element) => {
			const classList = map.get(element) ?? [];
			classList.push(className);
			map.set(element, classList);
		});
		return map;
	}, new Map());
	return () => assignents;
};

// todo: should I supply instance as this or explicit param?

// accepts either a single css classname or a list of classnames to be added to the scrollmagic instance element or a object maping classname(s) to element(s)
export const classToggle: ScrollMagicPluginFactory<ClassToggleOptions> = (options) => {
	const getAssignments = assignmentMapFactory(options);
	const onEnter = (e: ScrollMagicEvent) => getAssignments(e.target).forEach(addClasses);
	const onLeave = (e: ScrollMagicEvent) => getAssignments(e.target).forEach(removeClasses);

	return {
		// setup
		onAdd() {
			// check currently active, add classes if so
			if (0 < this.progress && this.progress < 1) {
				getAssignments(this).forEach(addClasses);
			}
			// add listeners
			this.on('enter', onEnter);
			this.on('leave', onLeave);
		},
		// cleanup
		onRemove() {
			// remove classes
			getAssignments(this).forEach(removeClasses);
			// remove listeners
			this.off('enter', onEnter);
			this.off('leave', onLeave);
		},
	};
};
