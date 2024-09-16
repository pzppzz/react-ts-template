import React from "react";
import classNames from "classnames";
import "./index.less";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	type?: "primary" | "secondary" | "plain";
	size?: "small" | "medium" | "large";
}

function getButtonType(type: ButtonProps["type"]) {
	if (["primary", "secondary", "plain"].includes(type)) {
		return type;
	}
	return "primary";
}

function getButtonSize(size: ButtonProps["size"]) {
	if (["small", "medium", "large"].includes(size)) {
		return size;
	}
	return "medium";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { className, type, size, children, ...rest } = props;

	const classes = classNames(
		className,
		"ui-button",
		`ui-button-${getButtonType(type)}`,
		`ui-button-${getButtonSize(size)}`,
	);

	return (
		<button ref={ref} className={classes} {...rest}>
			{children}
		</button>
	);
});

Button.displayName = "Button";
