import request from "supertest";
import { app } from "../../src/app.js";
import { prisma } from "../../src/db/prisma.js";

export async function resetDatabase(): Promise<void> {
  await prisma.attachment.deleteMany();
  await prisma.note.deleteMany();
  await prisma.notebook.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
}

export async function createAuthenticatedNote() {
  const agent = request.agent(app);
  const email = `learner-${Date.now()}@example.com`;

  const registerResponse = await agent
    .post("/auth/register")
    .send({ email, password: "Password12345!" });

  const userId = registerResponse.body.data.user.id as string;
  const csrfResponse = await agent.get("/auth/csrf");
  const csrfToken = csrfResponse.body.data.csrfToken as string;

  const notebook = await prisma.notebook.create({
    data: {
      ownerId: userId,
      name: "Upload Tests"
    }
  });

  const note = await prisma.note.create({
    data: {
      ownerId: userId,
      notebookId: notebook.id,
      title: "Attachment Test",
      body: "Attach files to this note."
    }
  });

  return { agent, userId, csrfToken, notebook, note };
}
