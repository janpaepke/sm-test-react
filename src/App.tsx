import './App.css';

import { useMemo, useState } from 'react';

import { classToggle } from './ClassToggle';
import ScrollMagicElement from './ScrollMagicElement';
import { useScrollMagic } from './useScrollMagic';

function App() {
	// Example A: SM Element with render function
	const plugins = useMemo(() => [classToggle(`active`)], []);
	// Example B: SM Element with children and manual state management
	const [exampleBProgress, setExampleBProgress] = useState(0);
	// Example C: SM hook
	const [exampleCRef, exampleCProgress] = useScrollMagic();
	return (
		<div className="App">
			<div style={{ height: '120vh' }}></div>
			{/* example A */}
			<ScrollMagicElement render={({ progress }) => `A: ${progress.toFixed(3)}`} plugins={plugins} />
			<div style={{ height: '120vh' }}></div>
			{/* example B */}
			<ScrollMagicElement
				elementStart={50}
				elementEnd={50}
				onProgress={(e) => {
					setExampleBProgress(e.target.progress);
				}}
			>
				B: {exampleBProgress.toFixed(3)}
			</ScrollMagicElement>
			<div style={{ height: '120vh' }}></div>
			{/* example C */}
			<div ref={exampleCRef}>C: {exampleCProgress.toFixed(3)}</div>
			<div style={{ height: '120vh' }}></div>
		</div>
	);
}

export default App;
