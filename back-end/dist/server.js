import "express-async-errors";
import express from 'express';
import routes from './routes/index.js';
import { AppError } from "./errors/AppError.js";
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).end();
    }
    else
        return next();
});
app.use(routes);
app.use((err, request, response, next) => {
    if (err instanceof AppError)
        return response.status(err.statusCode).json({ status: "error", message: err.message });
    return response.status(500).json({ status: "error", message: `Internal server error - ${err.message}` });
});
app.listen(3333, () => console.log("Rodando na porta 3333"));
//# sourceMappingURL=server.js.map