import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
    username: string;
    password: string;
    email?: string;
}

export default function Forms() {
    const {register, handleSubmit} = useForm<LoginForm>();
    const onValid = (data: LoginForm) => {
        console.log("valid");
    };
    const onInValid = () => {
        console.log("invalid");
    };
    return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
        <input 
            {...register("username", {
                required: true,
            })}
            type="text" 
            placeholder="Username" 
        />
        <input 
            {...register("email", {
                required: true,
            })}
            type="email" 
            placeholder="Email" 
        />
        <input 
            {...register("password", {
                required: true,
            })}
            type="password" 
            placeholder="Password" 
        />
        <input type="submit" value="Create Account" />
    </form>
    )
}