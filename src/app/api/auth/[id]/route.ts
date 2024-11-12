import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, {params}:{params: {id: string}}) {
    try {
        const {id} = await params
        const userProfile = await client.user.findUnique({
            where: {
                clerkid: id,
            },
            include: {
                studio: true,
                subscription: {
                    select: {
                        plan: true,
                    },
                },
            },
        })
        if(userProfile) return NextResponse.json({ status: 200, user: userProfile })
        const clerk = await clerkClient()
        const clerkUserInstance = await clerk.users.getUser(id)
    const createUser = await client.user.create({
        data: {
            clerkid: id,
            email: clerkUserInstance.emailAddresses[0].emailAddress,
            firstname: clerkUserInstance.firstName,
            lastname: clerkUserInstance.lastName,
            studio: {
                create:{},
            },
            workspace: {
                create: {
                    name: `${clerkUserInstance.firstName}'s Workspace`,
                    type: "PERSONAL",
                },
            },
            subscription: {
                create:{},
            },
        },
        include: {
            subscription: {
                select: {
                    plan: true,
                },
            },
        },
    })
    if(createUser) return NextResponse.json({ status: 201, user: createUser })
        return NextResponse.json({ status: 400, message: "Failed to create user" });
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Internal Server Error",error:error });
    }
}