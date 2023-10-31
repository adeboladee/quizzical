import Questions from "./Components/Questions";
import React from "react";
// import Confetti from "react-confetti";

export default function App() {
	const [game, setGame] = React.useState({
		hasStarted: false,
	});

	const [count, setCount] = React.useState(0);

	const [allQuestions, setAllQuestions] = React.useState([]);

	const [selectedAnswer, setSelectedAnswer] = React.useState({});

	const [quizEnded, setQuizEnded] = React.useState(false);

	const [result, setResult] = React.useState(0);

	function startGame() {
		setGame((prevGame) => ({ hasStarted: !prevGame.hasStarted }));
	}

	React.useEffect(() => {
		fetch(
			"https://opentdb.com/api.php?amount=5&category=21&difficulty=easy"
		)
			.then((res) => res.json())
			.then((data) => setAllQuestions(data.results));
	}, [count]);

	const clickHandleSelect = (qIndex, choice) => {
		setSelectedAnswer((prev) => ({
			...prev,
			[qIndex]: prev[qIndex] === choice ? "" : choice,
		}));
	};

	const question = allQuestions.map((item, i) => {
		return (
			<Questions
				key={i}
				questionIndex={i}
				item={item}
				handleSelect={(qIndex, choice) =>
					clickHandleSelect(qIndex, choice)
				}
				quizEnded={quizEnded}
				selected={selectedAnswer[i]}
			/>
		);
	});

	React.useEffect(() => {
		if (quizEnded === true) {
			let score = 0;

			allQuestions.map((question, index) => {
				score =
					question.correct_answer == selectedAnswer[index]
						? score + 1
						: score;
			});
			setResult(score);
		}
	}, [quizEnded]);

	const playAgain = () => {
		setCount((count) => count + 1);
		setQuizEnded(false);
	};

	return (
		<div>
			{/* {quizEnded && result == 5 && <Confetti />} */}
			{/* {JSON.stringify(selectedAnswer, null, 2)} */}
			{game.hasStarted ? (
				<section>
					{question}
					{quizEnded === true ? (
						<div className="result-wrapper">
							<span>You scored {result}/5 correct answers</span>
							<button className="new-game" onClick={playAgain}>
								Play Again
							</button>
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
