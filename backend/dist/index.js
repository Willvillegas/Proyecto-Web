"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectBD_1 = require("./utils/connectBD");
const movie_route_1 = __importDefault(require("./routes/movie.route"));
const actor_route_1 = __importDefault(require("./routes/actor.route"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
const result = dotenv_1.default.config();
if (result.error) {
    throw result.error;
}
else
    console.log(result.parsed);
//const { BD_URL } = process.env;
(0, connectBD_1.connectBD)(`mongodb+srv://admin:admin12345@proyectoweb.v67qs.mongodb.net/ProyectoWeb`).then(() => {
    app.listen(PORT, () => {
        console.log(path_1.default.join(__dirname, "..", 'uploads'));
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((e) => console.log(e));
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, "..", 'uploads')));
app.use(express_1.default.json());
app.disable('x-powered-by');
app.use('/api', movie_route_1.default);
app.use('/api', actor_route_1.default);
app.use('/api', user_route_1.default);
