import  { useState } from 'react';
import { z } from "zod";
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from "../../../Components/Auth/AuthForm";
import loginImage from "../../../assets/login-removebg-preview.png";
import { loginapi } from "@/apis/users/login";
import { AxiosError } from 'axios';
import { useUser } from '@/context/UserContext';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i),
});

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useUser();

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(null);

    try {
      const response = await loginapi(values);

      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate('/');
      } else if (response.status === 400) {
        setError('Invalid Email or Password');
      }

    } catch (error: any) {
      setError(`${(error as AxiosError<{ message: string }>).response?.data?.message}. Please try again.`);
    }
  };

  return (
    <div className="h-screen p-4 flex text-start">
      <div className="flex-1 flex flex-col justify-center items-center mx-8">
        <div className="text-4xl mt-4 font-bold mb-4">
          Welcome Back
        </div>
        <div className="text-gray-600 mb-4">
          Don't have an account? <Link to="/register" className="underline text-black">Sign Up</Link>
        </div>
        <div className="w-full">
          <AuthForm
            schema={loginSchema}
            onSubmit={handleSubmit}
            fields={[
              { name: "email", label: "Email", placeholder: "Email", inputType: "email" },
              { name: "password", label: "Password", placeholder: "Password", inputType: "password" },
            ]}
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
      <div className="flex-1 bg-slate-200 flex items-center justify-center rounded-lg">
        <img src={loginImage} alt="login" />
      </div>
    </div>
  );
};
