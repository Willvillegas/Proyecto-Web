import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectBD } from './utils/connectBD';
import movieRoute from './routes/movie.route';
import actorRoute from './routes/actor.route';
import path from 'path';
import cors from 'cors';
import userRoute from './routes/user.route';

if (process.env.NODE_ENV !== 'production') {
    const { error } = dotenv.config();
    if (error) throw error;
}
const app: Express = express();
const PORT: number = 3000;

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));


const { BD_URL } = process.env;
connectBD(BD_URL || '').then(() => {
    app.listen(PORT, () => {
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

