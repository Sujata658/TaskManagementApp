// src/components/AuthForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaEnvelope, FaLock } from 'react-icons/fa';

// Validation schema
const schema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
  confirmPassword: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

type AuthFormProps = {
  isSignup?: boolean;
  onSubmit: (data: FormData) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ isSignup = false, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Email"
              className="pl-10 pr-3 py-3 border-b-2 border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-primary"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Password"
              className="pl-10 pr-3 py-3 border-b-2 border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-primary"
            />
          </div>
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>
        {isSignup && (
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm Password"
                className="pl-10 pr-3 py-3 border-b-2 border-gray-300 w-full text-gray-700 leading-tight focus:outline-none focus:border-primary"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 mt-8 hover:bg-blue-700 text-white font-bold py-3 w-full rounded focus:outline-none focus:shadow-outline"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
