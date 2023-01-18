import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth/next'
import { buildNextAuthOption } from '../auth/[...nextauth].api'
import { prisma } from '../../../lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(400).end()
  }

  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOption(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return res.status(204).end()
}
