import fastify from 'fastify'
import {z} from 'zod'
import {PrismaClient} from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

app.post('/polls', async (request, reply) => {
    console.log(request.body)

    // Validate the request body
    // I want an object with a title property that is a string
    const createPollBody = z.object({
        title: z.string()
    })

    const { title } = createPollBody.parse(request.body)

    const poll = await prisma.poll.create({
        data: {
            title
        }
    })

    console.log(poll)
    return reply.status(201).send({ pollId: poll.id })
})

app.listen({ port: 3333 }).then(() => {
    console.log('http server running')
})
