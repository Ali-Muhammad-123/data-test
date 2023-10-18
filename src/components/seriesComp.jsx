import React, { useState } from "react";

function SeriesComp(props) {
	const [counter, setCounter] = useState(1);
	const [previous, setPrev] = useState(0);
	// 0, 1, 1, 2, 3, 5, 8;
	function NextNumber() {
		let current = counter;
		let prev = previous;
		setPrev(current);
		current = current + prev;
		console.log(current);
		setCounter(current);
	}

	return (
		<div>
			<div>{previous}</div>
			<button onClick={() => NextNumber()}>Increment</button>
		</div>
	);
}

export default SeriesComp;
