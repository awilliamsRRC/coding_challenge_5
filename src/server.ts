import app from "./app";
import { Server } from "http";
import morgan from "morgan";


const PORT: string | number = process.env.PORT || 3000;
const NODE_ENV: string = process.env.NODE_ENV || "development";
const LOG_LEVEL: string = process.env.LOG_LEVEL || "dev";

console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);

// Set up Morgan logging middleware based on environment
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

const server: Server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default server;
