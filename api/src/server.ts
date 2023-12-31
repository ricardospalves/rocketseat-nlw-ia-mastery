import './dotenvConfig'
import { fastify } from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAICompletionRoute } from './routes/generate-ai-completion'

const PORT = 3333
const MEGABYTE = 1_048_576
const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: MEGABYTE * 25, // 25mb
  },
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAICompletionRoute)

app
  .listen({ port: PORT })
  .then(() => {
    console.log(`🚀 server running on http://localhost:${PORT}`)
  })
  .catch((error) => {
    console.error({
      message: 'Something went wrong!',
      error,
    })
  })
