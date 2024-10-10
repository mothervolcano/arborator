import React from "react";
import { Button } from "@mantine/core";

const ControlButton = (props: any) => {

	const {id, mode, param, onValueChange, color } = props;

	return (
		<>
			<Button
				id={param.id}
				name={param.id}
				onClick={() => {
					onValueChange(null, id);
				}}
				value={param.value}
				size="1px"
				color={color}
				pb={mode === "COMPACT" ? "0.50rem" : "0.75rem"}
			>
				{param.label}
			</Button>
		</>
	);
};

export default ControlButton;
