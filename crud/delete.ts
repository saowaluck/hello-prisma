import { PrismaClient } from "@prisma/client"
import { log } from "console"
import { exit } from "process"

const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.delete({
            where: {
                email: 'bert@prisma.io',
            },
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