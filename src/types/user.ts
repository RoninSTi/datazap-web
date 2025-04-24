import { z } from 'zod';

export const UserIdSchema = z.string().brand('UserId');

export type UserId = z.infer<typeof UserIdSchema>;

export const AuthRegisterRequestBodySchema = z.object({
  email: z.string().email(),
});

export type AuthRegisterRequestBody = z.infer<
  typeof AuthRegisterRequestBodySchema
>;

export const UserSchema = z.object({
  id: UserIdSchema,
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date(),
  image: z.string().url().nullable(),
});

export type User = z.infer<typeof UserSchema>;

// model User {
//   id            String    @id @default(cuid())
//   name          String?
//   email         String?   @unique
//   emailVerified DateTime?
//   image         String?
//   accounts      Account[]
//   sessions      Session[]
//   userDetails   UserDetails?
//   logs          Log[]
//   projects      Project[]
//   favoriteLogs  LogFavorite[]
//   favoriteProjects ProjectFavorite[]
// }

// enum Tier {
//   FREE
// }

// model UserDetails {
//   id                String  @id @default(cuid())
//   userId            String  @unique
//   backgroundImage   String?
//   username          String?  @unique
//   user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
//   logLimit          Int     @default(0)
//   projectLimit      Int     @default(0)
//   tier              Tier    @default(FREE)

//   @@index([userId])
// }
