import React from "react";
import { NumberInput, Text } from "@mantine/core";
import { OnValueChange, NumberFormatValues } from "react-number-format";

const validateValue = (value: NumberFormatValues): boolean => {
	if (value.floatValue) {
		return true;
	} else {
		return false;
	}
};

const ControlValue = (props: any) => {
	const { id, mode, param, onValueChange, color } = props;

	return (
		<>
			{param.label !== "" && (
				<Text
					size={mode === "COMPACT" ? "0.65rem" : "xs"}
					fw={mode === "COMPACT" ? "400" : "500"}
					c={
						mode === "COMPACT"
							? "var(--mantine-color-dark-2)"
							: "var(--mantine-color-dark-3)"
					}
					pb={mode === "COMPACT" ? "0.50rem" : "0.75rem"}
				>
					{param.label}
				</Text>
			)}
			<NumberInput
				id={param.id}
				name={param.id}
				min={param.range[0]}
				max={param.range[1]}
				step={param.step}
				onChange={(value) => {
					onValueChange(value, id);
				}}
				value={param.value}
				size="xs"
				color={color}
				pb={mode === "COMPACT" ? "0.25rem" : "0.25rem"}
			/>
		</>
	);
};

export default ControlValue;
