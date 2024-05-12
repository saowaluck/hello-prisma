import { PrismaClient } from "@prisma/client"
import { log } from "console"
import { exit } from "process"

const prisma = new PrismaClient()

async function findUnique() {
    const user = await prisma.user.findUnique({
        where: {
            email: 'popsoften@gmail.com',
        },
    })
    log("user :", user)
    return user
}

async function findById() {
    const user = await prisma.user.findUnique({
        where: {
            id: 1
        },
    })
    log("user :", user)
    return user
}

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


async function main() {
    findUnique()
    findById()
    findFirst()
    findMany()
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