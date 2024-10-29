"use server"

import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticatedUser = async () => {
    try {
        const user = await currentUser()
        if(!user) {
            return {status: 403}
        }

        // conset existingUser = await
    } catch (error) {
        
    }
}