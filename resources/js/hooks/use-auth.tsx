import { TAuthProps } from "@/types/global"
import { usePage } from "@inertiajs/react"

export function useAuth() {
    const { auth } = usePage<TAuthProps>().props
    return auth
}
