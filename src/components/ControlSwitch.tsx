import React from "react";
import { Switch, Text } from "@mantine/core";

export default function ControlSwitch(props: any) {
	const { id, mode, param, onValueChange, color } = props;

	return (
		<>
			<Text
				size={mode === "COMPACT" ? "0.65rem" : "xs"}
				fw={mode === "COMPACT" ? "400" : "500"}
				c={
					mode === "COMPACT"
						? "var(--mantine-color-dark-2)"
						: "var(--mantine-color-dark-3)"
				}
				pb={mode === "COMPACT" ? "0.50rem" : "0.50rem"}
			>
				{param.label}
			</Text>
			<Switch
				size="xs"
				checked={param.value}
				id={param.id}
				name={param.id}
				onChange={(event: any) => {
					onValueChange(event.currentTarget.checked, id);
				}}
			/>
		</>
	);
}
