import { express } from 'express'
import { cors } from 'cors'
const app = express()

app.use(cors)

let notes = [
  '...'
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/notes', (req, res) => {
  res.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})