import React from "react";
import { Chip, Group, Text } from "@mantine/core";
import { useState } from "react";
import { OnValueChange, NumberFormatValues } from "react-number-format";

const validateValue = (value: NumberFormatValues): boolean => {
	if (value.floatValue) {
		return true;
	} else {
		return false;
	}
};

const ControlChipOptions = (props: any) => {
	const { id, mode, param, onValueChange, color } = props;

	const [value, setValue] = useState(param.value);

	return (
		<>
			<Chip.Group
				multiple
				value={value}
				onChange={(value) => {
					setValue(value);
					onValueChange(value, param.id);
				}}
			>
				<Group justify="left" mt="md">
					{param.options.map(
						(option: { label: string; value: string }) => (
							<Chip
								key={option.value}
								value={option.value}
								size="md"
								color={color}
							>
								{option.label}
							</Chip>
						),
					)}
				</Group>
			</Chip.Group>
		</>
	);
};

export default ControlChipOptions;
