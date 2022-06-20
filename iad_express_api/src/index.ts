import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import 'dotenv/config'
import * as MySqlConnector from './db/mysql-connector'
import { Routes } from './routes'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(json())

app.use('/api', Routes);

app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError('Rout not found !');
})

app.use(errorHandler)

const start = () => {
    MySqlConnector.init();

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server runnig on port ${PORT} !!!`);
    })
}

start()