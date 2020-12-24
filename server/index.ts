import express, { Response, Request } from 'express';
import {createServer} from 'http';

const app = express();
const httpServer = createServer(app);


app.get('/', (_:Request, res: Response) => {
    res.send('<h1>Hello world</h1>');
});

httpServer.listen(5000, () => {
    console.log('Listening on port 5000');
});