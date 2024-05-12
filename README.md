# Prisma 101

**About prisma**

- Prima เป็น ORM  (Open source) ตัวหนึ่ง ทำหน้าที่ให้การสร้าง table หรือ Query ของเป็น เรื่องง่าย

---

**Prisma Feature**

- Manage migration file (make migration, migrate)
- ORM with JS-TS (get, insert, update, upsert, delete)
- Prisma client tools

---

**How to install & connect database**

1. Install package prisma

```bash
npm install prisma --save-dev
```

1. Connect with database `"postgresql", "mysql", "sqlite", "sqlserver", "mongodb" or "cockroachdb".`

```bash
npx prisma init --datasource-provider postgresql
```

1. หลังจาก run command เราจะได้ **`schema.prisma` ที่จะเอาไว้ config ส่วนที่เป็น database**

**`prisma/schema.prisma`**

```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

โดยเราจะแก้ URL ที่อยู่ใน `.env` file

```bash
version: '3.9'

services:
  postgres:
    image: postgres:14-alpine
    ports:
      - 5432:5432
    volumes:
      - ~/apps/postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_USER=root
      - POSTGRES_DB=mydb
```

```bash
DATABASE_URL="postgresql://root:password@localhost:5432/mydb"
```

1. เท่านี้ เราก็สามารถ connect database ได้ละ 🎉

---

**Manage migration file (make migration, migrate)**

1. Create model structure in file

**`prisma/schema.prisma`**

| Int, String, Boolean | static data type |
| --- | --- |
| ? | เป็น optional field |
| @id | ใช้กับ primary key  |
| autoincrement | เป็นการให้มัน generate key ใหม่มาเสมอ |
| @default | เป็นการทำ default field ต่างๆ |
| author  User  @relation(fields: [authorId], references: [id])
authorId  Int | เป็นการทำ forign key ไปยังอีก  table หนึ่ง โดยจะอ้างอิง จาก field
authorId ที่ จะลิ้งไปยัง User model |
| posts Post[] | เป็น array objects เพื่อเก็บว่า user แต่ละคนมี post ไรบ้าง |

```bash
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

1. run make migration file + migrate with command (Apply SQL file to DB)

```bash
npx prisma migrate dev --name init
```

โดยหลังจาก run มันจะ  generate file migration + apply และ genrate file ทิ้งไว้ให้ใน folder

```bash
**migrations/
  └─ 20240512063432_init/
    └─ migration.sql**
```

```prolog
> npx prisma migrate dev --name init

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "mydb", schema "public" at "localhost:5432"

**Applying migration `20240512063432_init`**

The following migration(s) have been created and applied from new schema changes:

**migrations/
  └─ 20240512063432_init/
    └─ migration.sql**

Your database is now in sync with your schema.
```

---

**Explore how to send queries to your database with Prisma Client**

[CRUD (Reference) | Prisma Documentation](https://www.prisma.io/docs/orm/prisma-client/queries/crud#read)

- Insert / Create

```prolog
async function main() {
    const user = await prisma.user.create({
        data: {
            name: "pop",
            email: "popsoften@gmail.com"
        }
    })
    log("user :", user)
    return user
}
```

- Update

```prolog
async function main() {
    const user = await prisma.user.update({
        where: {
            email: "popsoften@gmail.com"
        },
        data: {
            name: "saowaluck"
        }

    })
    log("user :", user)
    return user
}
```

- Upsert

```prolog
async function main() {
    const user = await prisma.user.upsert({
        where: {
            email: "popsoften@gmail.com"
        },
        create: {
            name: "pop insert",
            email: "pop@odds.team"
        },
        update: {
            name: "pop update"
        }
    })
    log("user :", user)
    return user
}
```

- Read

| https://www.prisma.io/docs/orm/reference/prisma-client-reference#findunique | get by id or unique |
| --- | --- |
| findFirst | get 1st |
| findMany | get all |

```prolog
async function findUnique() {
    const user = await prisma.user.findUnique({
        where: {
            email: 'popsoften@gmail.com',
        },
    })
    log("user :", user)
    return user
}
```

```prolog
async function findById() {
    const user = await prisma.user.findUnique({
        where: {
            id: 1
        },
    })
    log("user :", user)
    return user
}
```

```prolog
async function findFirst() {
    const user = await prisma.user.findFirst({
        where: {
            id: 1
        },
        orderBy: {
            id: 'desc',
        },
    })
    log("user :", user)
    return user
}
```

```prolog
async function findMany() {
    const user = await prisma.user.findMany({
        where: {
            email: {
                endsWith: 'prisma.io',
            },
        },
    })
    log("user :", user)
    return user
}
```

- Delete

```prolog
async function main() {
    const user = await prisma.user.delete({
        where: {
            email: 'bert@prisma.io',
        },
    })
    log("user :", user)
    return user
}
```

---

# **Prisma Studio**

Start prima dashboard with command

```prolog
npx prisma studio
```

It will show web portal on `localhost:5555`