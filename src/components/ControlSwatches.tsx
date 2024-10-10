import React from "react";
import { ColorPicker, Text } from "@mantine/core";
import { useState } from "react";



export default function ControlSwatches(props: any) {
	const { id, mode, param, onValueChange, color } = props;

	const [value, setValue] = useState(param.value);

	return (
		<>
			<Text
				size={mode === "COMPACT" ? "0.65rem" : "xs"}
				fw={mode === "COMPACT" ? "400" : "500"}
				c={mode === "COMPACT" ? "var(--mantine-color-dark-2)" : "var(--mantine-color-dark-3)"}
				pb={mode === "COMPACT" ? "0.25rem" : "0.25rem"}
			>
				{param.label}
			</Text>
			<ColorPicker 
				format="hex"
				value={value}
				onChange={(value) => {
					setValue(value);
					onValueChange(value, param.id);
				}}
				withPicker={false}
				fullWidth
				swatchesPerRow={10}
				swatches={param.options.map((option: {label: string; value: string}) => option.value)}
			/>
		</>
	)
}