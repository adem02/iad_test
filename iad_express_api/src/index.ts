import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import 'dotenv/config'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(json())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT} !!!`);
})