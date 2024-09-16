import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 *
 * @param relativePath
 */
export default function resolvePath(relativePath) {
	return path.resolve(__dirname, "../../" + relativePath);
}
