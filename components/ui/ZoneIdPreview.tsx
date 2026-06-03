'use client'

import { useAuth } from "@/shared/auth/AuthProvider"

export default function ZoneIdPreview() {
    const { user } = useAuth()
    console.log('zone id', user?.zoneId)

    return null
}