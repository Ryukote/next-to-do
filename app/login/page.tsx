'use client'

import { useEffect } from "react";
import { LoginPage } from "../components/auth/login/Login";
import { useRouter } from 'next/navigation';
import { getAccessToken } from "../data/services/localStorageService";

const Login = () => {
    const router = useRouter();

    useEffect(() => {
        if (getAccessToken()) {
            router.push('/todo', { scroll: false })
        }
    }, []);

    return (
        <div className="w-full content-center  ml-20">
            <LoginPage />
        </div>
    )
}

export default Login;
