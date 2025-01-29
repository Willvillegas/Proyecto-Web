import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectBD } from './utils/connectBD';
import movieRoute from './routes/movie.route';
import actorRoute from './routes/actor.route';
import path from 'path';
import cors from 'cors';
import userRoute from './routes/user.route';

const app: Express = express();
const PORT: number = 3000;

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));

//const result = dotenv.config();
//if (result.error) {
 //   throw result.error;
//} else
 //   console.log(result.parsed);
//const { BD_URL } = process.env;
connectBD(`mongodb+srv://admin:admin12345@proyectoweb.v67qs.mongodb.net/ProyectoWeb`).then(() => {
    app.listen(PORT, () => {
        console.log(path.join(__dirname, "..", 'uploads'));
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((e) => console.log(e));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});
app.use('/uploads', express.static(path.join(__dirname, "..", 'uploads')));
app.use(express.json());
app.disable('x-powered-by');
app.use('/api', movieRoute);
app.use('/api', actorRoute);
app.use('/api', userRoute);

