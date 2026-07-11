import type { DemoUser, SafeUser } from "../../shared/types/auth";

const demoUsers: ReadonlyArray<DemoUser> = [
  {
    id: "u-100",
    email: "learner@example.com",
    name: "Learner User",
    role: "user",
    password: "learn-nuxt-13",
  },
  {
    id: "u-900",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    password: "admin-nuxt-13",
  },
];

export function toSafeUser(user: DemoUser): SafeUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export function findDemoUser(
  email: string,
  password: string,
): SafeUser | null {
  const user = demoUsers.find(
    (candidate) => candidate.email === email && candidate.password === password,
  );

  return user ? toSafeUser(user) : null;
}
