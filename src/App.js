// import Start from "./Components/Start";
import Questions from "./Components/Questions";
import React from "react";

export default function App() {
	const [game, setGame] = React.useState({
		hasStarted: false,
	});

	function startGame() {
		setGame((prevGame) => ({ hasStarted: !prevGame.hasStarted }));
	}

	const [allQuestions, setAllQuestions] = React.useState([]);

	// const [selected, setSelected] = React.useState(false);

	// const selectAnswer = () => {
	// 	setSelected((prevSelect) => !prevSelect);
	// };

	React.useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5")
			.then((res) => res.json())
			.then((data) => setAllQuestions(data.results));
	}, []);

	const [selectedAnswers, setSelectedAnswers] = React.useState([]);

	const [quizEnded, setQuizEnded] = React.useState(false);
	const [result, setResult] = React.useState(0);

	const clickHandleSelect = (selectedItem, choice) => {
		setSelectedAnswers((prev) => [
			...prev,
			selectedItem === choice ? "correct" : "incorrect",
		]);
		console.log(selectedItem, choice);
	};

	console.log(selectedAnswers);

	const question = allQuestions.map((item) => {
		return (
			<Questions
				item={item}
				handleSelect={(item, choice) => clickHandleSelect(item, choice)}
			/>
		);
	});

	// React.useEffect(() => {
	// 	if (quizEnded === true) {
	// 		let score = 0;

	// 		});
	// 		setResult(score);
	// 	}
	// }, [quizEnded]);

	// console.log(allQuestions);

	return (
		<div>
			{JSON.stringify(selectedAnswers, null, 2)}
			{game.hasStarted ? (
				<section>
					{question}
					{quizEnded === true ? (
						<div className="result-wrapper">
							<span>You scored {result}/5 correct answers</span>
							<button className="new-game">Play Again</button>
						</div>
					) : (
						<button
							className="check-answer-btn"
							onClick={() => setQuizEnded(true)}
						>
							Check answers
						</button>
					)}
				</section>
			) : (
				<div className="start-page">
					<h2 className="start-page-header">Quizzical</h2>
					<p className="start-page-description">
						Some description if needed
					</p>
					<button onClick={startGame} className="start-page-button">
						Start quiz
					</button>
				</div>
			)}
		</div>
	);
}
