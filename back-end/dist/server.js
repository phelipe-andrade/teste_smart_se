import "express-async-errors";
import express from 'express';
import routes from './routes/index.js';
import { AppError } from "./errors/AppError.js";
const app = express();
app.use(express.json());
app.use(routes);
app.use((err, request, response, next) => {
    if (err instanceof AppError)
        return response.status(err.statusCode).json({ status: "error", message: err.message });
    return response.status(500).json({ status: "error", message: `Internal server error - ${err.message}` });
});
app.listen(3333, () => console.log("Rodando na porta 3333"));
//# sourceMappingURL=server.js.map