'use client'

import { login } from '@/app/data/services/authService';
import { getAccessToken, setAccessToken } from '@/app/data/services/localStorageService';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './Login.css';

export const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [redirect, setRedirect] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (redirect) {
            router.push('/todo', { scroll: false })
        }
    }, [redirect]);

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        const result = await login(username, password);

        setAccessToken(result!.result.token);

        setRedirect(true);
    }

    return (
        <div id="login-form" className='w-full'>
            <form onSubmit={async(event) => await handleSubmit(event)} className='w-32 md:w-32 lg:w-48'>
                <div className='w-32 md:w-32 lg:w-48 float-right'>
                    <label htmlFor="username">
                        UserName
                    </label>

                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="float-right" />
                </div>

                <br/>

                <div  className='w-32 md:w-32 lg:w-48 float-right'>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="float-right" />
                </div>

                <br/>
                
                <Button type="submit" color="default" outline>
                    Login
                </Button>
            </form>
        </div>
    )
};