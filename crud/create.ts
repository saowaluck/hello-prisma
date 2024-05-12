import { PrismaClient } from "@prisma/client"
import { log } from "console"
import { exit } from "process"

const prisma = new PrismaClient()

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

main()
    .then(async () => {
        await prisma.$disconnect
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect
        exit(1)
    })