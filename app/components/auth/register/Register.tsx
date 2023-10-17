'use client'

import { register } from '@/app/data/services/authService';
import { RegisterDTO } from '@/app/data/types/auth/registerDTO';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './Register.css';

export const RegisterPage = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [redirect, setRedirect] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (redirect) {
            router.push('/login', { scroll: false })
        }
    }, [redirect]);

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        const registerData: RegisterDTO = {
            'UserName': username,
            'Password': password,
            'Name': name,
            'Email': email
        }

        await register(registerData);

        setRedirect(true);
    }

    return (
        <div id="login-form" className='w-full'>
            <form onSubmit={async(event) => await handleSubmit(event)} className='w-32 md:w-32 lg:w-48'>
                <div className='w-32 md:w-32 lg:w-48 float-right'>
                    <label htmlFor="username">
                        Username
                    </label>

                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="float-right" />
                </div>

                <br/>

                <div className='w-32 md:w-32 lg:w-48 float-right'>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="float-right" />
                </div>

                <br/>

                <div  className='w-32 md:w-32 lg:w-48 float-right'>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="float-right" />
                </div>

                <br/>

                <div  className='w-32 md:w-32 lg:w-48 float-right'>
                    <label htmlFor="name">
                        Name
                    </label>

                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="float-right" />
                </div>

                <br/>
                
                <Button type="submit" color="default" outline>
                    Register
                </Button>
            </form>
        </div>
    )
};