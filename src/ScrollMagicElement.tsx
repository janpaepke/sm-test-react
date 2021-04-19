import { useScrollMagic } from './useScrollMagic';

interface Props {
	offset: number;
}

const ScrollMagicElement: React.FC<Props> = ({ offset }) => {
	const [elemRef] = useScrollMagic({}, { onProgress: (e) => console.log(e.target.progress) });
	return <div ref={elemRef}>x</div>;
};

export default ScrollMagicElement;
