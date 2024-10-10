import React from "react";
import { DEFAULT_THEME } from "@mantine/core";
import ControlSlider from "../ControlSlider";

const dark = DEFAULT_THEME.colors.dark[5];

interface ConsoleProps {
	params: any[];
	inputHandler: Function;
	layout: string;
	mode: string;
}

interface Style {
	width: string;
	display: string;
	flexDirection: React.CSSProperties["flexDirection"];
	justifyContent?: React.CSSProperties["justifyContent"];
	gap?: string;
}

const DefaultConsole = (props: ConsoleProps) => {
	const { params, inputHandler, layout, mode } = props;

	function handleSliderInput(value: number, id: string) {
		const paramsToUpdate = JSON.parse(JSON.stringify(params));

		const updatedParams = paramsToUpdate.map((item: any) => {
			if (item.id === id) {
				item.value = value;
			}
			return item;
		});

		inputHandler(updatedParams);
	}

	const rowLayout: Style = {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: "1rem",
	};

	const colLayout: Style = {
		width: "100%",
		display: "flex",
		flexDirection: "column",
	};


	const gap = mode === "COMPACT" ? "0.90rem" : "1.50rem";
	const criteria = layout === "ROW" ? (p: any) => p.rank === 1 : (p: any) => p; // spit the sliders in 2 columns according to their rank value

	return (
		<div style={layout === "ROW" ? rowLayout : colLayout}>
			<div style={{ width: "100%" }}>
				{params
					.filter(criteria)
					.map((p: any) => (
						<div
							key={p.id}
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<div style={{ width: "100%", paddingBottom: gap }}>
								<ControlSlider key={p.id} id={p.id} mode={mode} param={p} color={dark} onValueChange={handleSliderInput} />
							</div>
						</div>
					))}
			</div>
			{layout === "ROW" && <div style={{ width: "100%" }}>
				{params
					.filter((p: any) => p.rank === 2)
					.map((p: any) => (
						<div
							key={p.id}
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<div style={{ width: "100%", paddingBottom: gap }}>
								<ControlSlider key={p.id} id={p.id} mode={mode} param={p} color={dark} onValueChange={handleSliderInput} />
							</div>
						</div>
					))}
			</div>}
			
		</div>
	);
};

export default DefaultConsole;
