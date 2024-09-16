import "./app.less";
import { Counter } from "./components/counter";

export const App: React.FC = () => {
	return (
		<div className="app">
			<h1>React + Typescript + Webpack = Love</h1>
			<Counter />
		</div>
	);
};
