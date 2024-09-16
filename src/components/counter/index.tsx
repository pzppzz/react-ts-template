import { useCounter } from "@/hooks/useCouter";
import { Button } from "@/ui";
import styles from "./index.module.less";

export const Counter: React.FC = () => {
	const { count, increment } = useCounter();

	return (
		<div className={styles.counter}>
			<h2>count is {count}</h2>
			<Button onClick={increment}>increment</Button>
		</div>
	);
};
