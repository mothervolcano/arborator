import React from "react";
import { Slider, Text } from "@mantine/core";

const ControlSlider = (props: any) => {

	const {id, mode, param, onValueChange, color } = props;

	return (
		<>
			<Text
				size={mode === "COMPACT" ? "0.65rem" : "xs"}
				fw={mode === "COMPACT" ? "400" : "500"}
				c={mode === "COMPACT" ? "var(--mantine-color-dark-2)" : "var(--mantine-color-dark-3)"}
				pb={mode === "COMPACT" ? "0.75rem" : "0.75rem"}
			>
				{param.label}
			</Text>
			<Slider
				id={param.id}
				name={param.id}
				min={param.range[0]}
				max={param.range[1]}
				step={param.step}
				onChange={(value) => {
					onValueChange(value, id);
				}}
				value={param.value}
				size="1px"
				thumbSize="0.75rem"
				color={color}
				showLabelOnHover={false}
				pb={mode === "COMPACT" ? "0.50rem" : "0.75rem"}
				styles={{ thumb: { backgroundColor: color, borderWidth: 0 } }}
			/>
		</>
	);
};

export default ControlSlider;
