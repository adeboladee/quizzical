import { useState } from "react";

export default function Questions(props) {
	const answersList = [
		...props.item.incorrect_answers,
		props.item.correct_answer,
	].sort((a, b) => (a > b ? 1 : -1));

	const [selectedIndex, setSelectedIndex] = useState(-1);

	// const styles = {
	// 	backgroundColor: item ? "#59E391" : "white",
	// };

	console.log(props.item.correct_answer);

	const handleOptions = answersList.map((item, i) => (
		<button
			className={selectedIndex === i ? "selected" : "question-btn"}
			// style={styles}
			key={`${item}_${i}`}
			onClick={() => {
				props.handleSelect(item, props.item.correct_answer);
				setSelectedIndex(i);
				// console.log(i);
			}}
		>
			{item}
		</button>
	));

	// const handleSelect = () => {
	// 	console.log(item);
	// };
	return (
		<main>
			<p className="question">{props.item.question}</p>
			<div className="question-btn-wrapper">{handleOptions}</div>
			<hr />
		</main>
	);
}
