import HanoiTower from "@/components/HanoiTower";
import { HanoiGame } from "@/hanoi/game";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = unknown;

const Index = (props: Props) => {
	const [towers, setTowers] = useState<number>(3);
	const [disks, setDisks] = useState<number>(5);
	const [currentGame, setCurrentGame] = useState<{ current: HanoiGame }>({ current: new HanoiGame(towers, disks) });
	const [steps, setSteps] = useState(0);
	const [newGamePanelOpen, setNewGamePanelOpen] = useState(false);
	const [showError, setShowError] = useState(false);
	const [showWinMessage, setShowWinMessage] = useState(false);
	const game = currentGame.current;

	useEffect(() => {
		if (showError) {
			const timer = setTimeout(() => {
				setShowError(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [showError]);

	const setGame = (newGame: HanoiGame) => {
		setCurrentGame({ current: newGame });
		setSteps(steps + 1);
		if (newGame.towers[newGame.towers.length - 1].length === disks) {
			setShowWinMessage(true);
		}
	};

	const resetGame = (towers: number, discs: number) => {
		setTowers(towers);
		setDisks(discs);
		setCurrentGame({ current: new HanoiGame(towers, discs) });
		setSteps(0);
		setSelectedTower(null);
	};

	const onTowerClicked = (index: number) => {
		if (showWinMessage) {
			resetGame(towers, disks);
			setShowWinMessage(false);
			return;
		}
		if (selectedTower === null) {
			if (game.towers[index].length === 0) return;
			setSelectedTower(index);
			return;
		}
		if (index === selectedTower) {
			setSelectedTower(null);
			return;
		} else {
			if (game.canMove(selectedTower, index)) {
				setGame(game.move(selectedTower, index));
				setSelectedTower(null);
				return;
			}
			setShowError(true);
			return;
		}
	};

	const [selectedTower, setSelectedTower] = useState<number | null>(null);

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{showWinMessage && (
					<div
						style={{
							position: "fixed",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
							color: "white",
							padding: "40px 60px",
							borderRadius: "20px",
							boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
							zIndex: 1000,
							animation: "popIn 0.5s ease-out",
							textAlign: "center",
							fontSize: "24px",
							fontWeight: "bold",
							width: "75vw",
						}}
						onClick={() => {
							resetGame(towers, disks);
							setShowWinMessage(false);
						}}
						onBlur={() => {
							resetGame(towers, disks);
							setShowWinMessage(false);
						}}
					>
						<div style={{ marginBottom: "20px" }}>🎉 ניצחון! 🎉</div>
						<div style={{ fontSize: "18px", marginBottom: "10px" }}>השלמת את המשחק ב-{steps} צעדים!</div>
						<div style={{ fontSize: "14px", opacity: 0.9 }}>לחץ כדי להתחיל מחדש</div>
					</div>
				)}
				<style jsx>{`
					@keyframes popIn {
						0% {
							transform: translate(-50%, -50%) scale(0);
							opacity: 0;
						}
						50% {
							transform: translate(-50%, -50%) scale(1.1);
						}
						100% {
							transform: translate(-50%, -50%) scale(1);
							opacity: 1;
						}
					}
					@keyframes shake {
						0%,
						100% {
							transform: translateX(0);
						}
						25% {
							transform: translateX(-10px);
						}
						75% {
							transform: translateX(10px);
						}
					}
				`}</style>
				צעדים: {steps} | ניתן לפתירה במינימום : {Math.pow(2, disks) - 1} צעדים
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						padding: "20px",
						paddingBottom: 0,
						boxShadow: "inset 10px rgba(0, 0, 0, 0.3)",
						border: showError ? "1px solid red" : "1px solid transparent",
						animation: showError ? "shake 0.5s" : "none",
					}}
				>
					{game.towers.map((tower, index) => (
						<HanoiTower
							key={index}
							tower={tower}
							discs={game?.getDiscsCount() ?? 1}
							maxSizeDisc={(game?.getDiscsCount() ?? 5) * 20}
							onClick={() => onTowerClicked(index)}
							discSizeSelected={selectedTower !== null ? game.topDiscAt(selectedTower)?.size ?? 0 : 0}
						/>
					))}
				</div>
				<br />
				<br />
				<br />
				<Button
					sx={{
						background: "linear-gradient(45deg, #f36a88ff 30%, #f38950ff 90%)",
						border: 0,
						borderRadius: 3,
						boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
						color: "white",
						height: 48,
						padding: "0 30px",
					}}
					variant="contained"
					onClick={() => resetGame(towers, disks)}
				>
					איפוס
				</Button>
				<div style={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Button
						variant="contained"
						sx={{
							background: "linear-gradient(45deg, #1864a1ff 30%, #17839bff 90%)",
						}}
						onClick={() => setNewGamePanelOpen(!newGamePanelOpen)}
					>
						{!newGamePanelOpen ? "הצג +" : "הסתר -"}
					</Button>
					<br />
					<br />
					<div
						style={{
							gap: "10px",
							flexDirection: "column",
							padding: "20px",
							boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
							display: newGamePanelOpen ? "flex" : "none",
						}}
					>
						<TextField
							label="דיסקים"
							type="number"
							value={disks}
							onChange={(e) => setDisks(Number(e.target.value))}
						/>
						<TextField
							label="מגדלים"
							type="number"
							value={towers}
							onChange={(e) => setTowers(Number(e.target.value))}
						/>
						<Button
							variant="contained"
							sx={{
								background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
								borderRadius: 2,
								boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
							}}
							onClick={() => resetGame(towers, disks)}
						>
							משחק חדש
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
