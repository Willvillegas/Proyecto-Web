import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectBD } from './utils/connectBD';
import movieRoute from './routes/movie.route';
import actorRoute from './routes/actor.route';

const app: Express = express();
const PORT: number = 3000;

dotenv.config();
const { BD_URL } = process.env;
connectBD(BD_URL || '').then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}).catch((e) => console.log(e));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.use(express.json());
app.disable('x-powered-by');
app.use('/api', movieRoute);
app.use('/api', actorRoute);

