import { Tower } from "@/hanoi/tower";
import React from "react";

type Props = {
	tower: Tower;
	maxSizeDisc: number;
	discs: number;
	onClick: () => void;
	discSizeSelected: number;
};

const HanoiTower = (props: Props) => {
	const { tower } = props;
	const discs = tower;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "2px",
				minHeight: "240px",
				height: 24 * props.discs,
				justifyContent: "flex-end",
				padding: "10px",
				paddingBottom: 0,
				position: "relative",
				borderBottom: "2px solid yellow",
				width: props.maxSizeDisc ?? 120,
				//
				cursor: "pointer",
			}}
			onClick={props.onClick}
		>
			{/* Tower pole */}
			<div
				style={{ width: "4px", height: "150px", backgroundColor: "#333", position: "absolute", bottom: "0px" }}
			/>

			{/* Discs */}
			{discs
				.map((el) => el)
				.sort((a, b) => a.size - b.size)
				.map((disc, index) => (
					<div
						key={index}
						style={{
							width: `${disc.size * 20}px`,
							height: "20px",
							backgroundColor: `hsl(${(disc.size * 137.508) % 360}, 70%, 60%)`,
							// backgroundColor: `rgb(${(255 * disc.size) % 255},${(199 * disc.size) % 255},${
							// 	(625 * disc.size) % 255
							// })`,
							border: "1px solid #333",
							borderRadius: "4px",
							zIndex: 1,
							transition: props.discSizeSelected === disc.size ? "0.1s ease" : "none",
							transform: props.discSizeSelected === disc.size ? "translateY(-90px)" : "none",
						}}
					></div>
				))}
		</div>
	);
};

export default HanoiTower;
