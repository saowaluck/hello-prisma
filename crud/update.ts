import { PrismaClient } from "@prisma/client"
import { log } from "console"
import { exit } from "process"

const prisma = new PrismaClient()

// Create use .create function
async function main() {
    const user = await prisma.user.update({
        where: {
            email: "pop@odds.team"
        },
        data: {
            name: "saowaluck"
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