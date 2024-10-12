import React from "react";
import { DEFAULT_THEME } from "@mantine/core";
import ControlButton from "../ControlButton";
import ControlChipOptions from "../ControlChipOptions";
import ControlDropdownOptions from "../ControlDropdownOptions";
import ControlOptions from "../ControlOptions";
import ControlSlider from "../ControlSlider";
import ControlSwatches from "../ControlSwatches";
import ControlSwitch from "../ControlSwitch";
import ControlTextInput from "../ControlTextInput";
import ControlValue from "../ControlValue";

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

const selectControl = (p: any, inputHandler: Function, mode: string) => {
	let Control: any;
	switch (p.type) {
		case "SLIDER":
			Control = ControlSlider;
			break;
		case "VALUE":
			Control = ControlValue;
			break;
		case "OPTIONS":
			Control = ControlOptions;
			break;
		case "TEXT":
			Control = ControlTextInput;
			break;
		case "CHIPS":
			Control = ControlChipOptions;
			break;
		case "DROPDOWN":
			Control = ControlDropdownOptions;
			break;
		case "BUTTON":
			Control = ControlButton;
			break;
		case "SWATCHES":
			Control = ControlSwatches;
			break;
		case "SWITCH":
			Control = ControlSwitch;
			break;
		default:
			Control = ControlSlider;
	}
	return (
		<Control
			key={p.id}
			id={p.id}
			mode={mode}
			param={p}
			color={dark}
			onValueChange={inputHandler}
		/>
	);
};

// Returns an array structure that reflects the grouping structure. 
// 0 stands for non-grouped elements. Where 1, 2, ... stand for different groups.
const groupParams = (params: any[]): any[][] => {
	const groupedParams: any[][] = [];

	let group: any[] = [];
	let currGroupId: number = params[0].group;
	let prevGroupId: number = params[0].group;
	params.forEach((p, i, arr) => {
		currGroupId = p.group;
		if (currGroupId !== prevGroupId || currGroupId === 0) {
			groupedParams.push(group);
			group = [];
		} 

		group.push(p);

		if (i === arr.length -1 ) {
			groupedParams.push(group);
		} else {
			prevGroupId = currGroupId;
		}
	});

	return groupedParams;
};

const MixedInputConsole = (props: ConsoleProps) => {
	const { params, inputHandler, layout, mode } = props;

	function handleControlInput(value: number, id: string) {
		const paramsToUpdate = JSON.parse(JSON.stringify(params));

		const updatedParams = paramsToUpdate.map((item: any) => {
			if (item.id === id) {
				item.value = value;
			}
			return item;
		});

		inputHandler(updatedParams);
	}

	const paramGroups: any[][] = groupParams(params);
	
	const rowLayout: Style = {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: "0.50rem",
	};

	const colLayout: Style = {
		width: "100%",
		display: "flex",
		flexDirection: "column",
	};

	return (
		<div style={layout === "ROW" ? rowLayout : colLayout}>
			<div style={{ width: "100%" }}>
				{paramGroups.map((g) => (
					<div
						style={{
							display: "flex",
							flexDirection: g[0].group === 0 ? "column" : "row",
							gap: g[0].group === 0 ? "0.75rem" : "0.50rem",
							paddingBottom: "0.75rem",
						}}
					>
						{g.map((p, i, arr) => (
							<div 
								key={p.id}
								style={{width: p.group === 0 ? "100%" : `${100 / arr.length}%`}}
							>
								{selectControl(p, handleControlInput, "COMPACT")}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default MixedInputConsole;
