import './App.css';

import { useState } from 'react';

import ScrollMagicElement from './ScrollMagicElement';

function App() {
	const [exampleProgress, setExampleProgress] = useState(0);
	// const [active, setActive] = useState(false);
	return (
		// <div className="App" onClick={() => setActive(!active)}>
		<div className="App">
			<div style={{ height: '120vh' }}></div>
			{/* example A */}
			<ScrollMagicElement render={({ progress }) => `A: ${progress.toFixed(3)}`} />
			<div style={{ height: '120vh' }}></div>
			{/* example B */}
			<ScrollMagicElement
				elementStart={50}
				elementEnd={50}
				onProgress={(e) => {
					setExampleProgress(e.target.progress);
				}}
			>
				B: {exampleProgress.toFixed(3)}
			</ScrollMagicElement>
			<div style={{ height: '120vh' }}></div>
		</div>
	);
}

export default App;
