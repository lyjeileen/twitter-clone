import prisma from 'lib/prisma';
import { Prisma } from '@prisma/client';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log(session);
  if (!session) return res.end();
  if (req.method === 'POST') {
    try {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { name: req.body.name },
      });
      res.end();
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          res.status(403).json({ message: 'Username already exists.' });
        }
      }
    }
  }
}
