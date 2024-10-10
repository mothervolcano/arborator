import React from "react";
import { SegmentedControl, Text } from "@mantine/core";
import { useState } from "react";
import { OnValueChange, NumberFormatValues } from 'react-number-format';

const validateValue = (value: NumberFormatValues): boolean => {
	if (value.floatValue) {
		return true;
	} else {
		return false;
	}
}

const ControlOptions = (props: any) => {

	const {id, mode, param, onValueChange, color } = props;

	const [value, setValue] = useState(param.value);

	return (
		<>
			{param.label !== '' && <Text
				size={mode === "COMPACT" ? "0.65rem" : "xs"}
				fw={mode === "COMPACT" ? "400" : "500"}
				c={mode === "COMPACT" ? "var(--mantine-color-dark-2)" : "var(--mantine-color-dark-3)"}
				pb={mode === "COMPACT" ? "0.50rem" : "0.50rem"}
			>
				{param.label}
			</Text>}
			<SegmentedControl
				id={param.id}
				name={param.id}
				onChange={(value) => {
					onValueChange(value, id);
					setValue(value)
				}}
				data={param.options}
				value={value}
				size="xs"
				color={color}
				style={{margin: "0", padding: "0"}}
			/>
		</>
	);
};

export default ControlOptions;

