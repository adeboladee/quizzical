export default function Questions(props) {
	const answersList = [
		...props.item.incorrect_answers,
		props.item.correct_answer,
	].sort((a, b) => (a > b ? 1 : -1));

	const handleOptions = answersList.map((item, i) => {
		let styles;
		if (props.quizEnded === false) {
			styles = props.selected === item ? "selected" : "question-btn";
		} else if (props.quizEnded === true) {
			styles =
				item === props.item.correct_answer ? "correct" : "question-btn";
			if (props.selected === item && props.item.correct_answer !== item) {
				styles = " wrong";
			}
		}

		return (
			<button
				className={styles}
				key={`${item}_${i}`}
				value={item}
				onClick={() => {
					props.handleSelect(props.questionIndex, item);
				}}
			>
				{item}
			</button>
		);
	});

	return (
		<main>
			<p className="question">{props.item.question}</p>
			<div className="question-btn-wrapper">{handleOptions}</div>
			<hr />
		</main>
	);
}
