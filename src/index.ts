import express from 'express';
import cors from 'cors';
import http from 'http';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Router Imports
import videogamesRouter from './resources/videogames/videogames.routes.js';
import developersRouter from './resources/developers/developers.routes.js';

const app = express();

// Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 60000 ms = 60 seconds
  max: 100, // Limit each IP to 100 requests per 60 seconds
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({}));
app.use(limiter);
app.use(morgan('dev'));

// Routes
app.use('/videogames', videogamesRouter);
app.use('/developers', developersRouter);
app.use('/ratings', developersRouter);

app.use('/', async (req, res) => {
  res.status(200).send({
    system: 'Videogames API',
    status: '🟢 System operational',
    version: '1.0.0',
  });
});

// Server
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log(`💻 API: Port ${port}`);
