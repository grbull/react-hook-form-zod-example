import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const loginRequestSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(6, 'Username must be between 6 and 12 characters long')
    .max(12, 'Username must be between 6 and 12 characters long'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be between 6 and 12 characters long')
    .max(12, 'Password must be between 6 and 12 characters long'),
  rememberMe: z.boolean().default(false),
});

type LoginRequest = z.infer<typeof loginRequestSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
  });

  const onSubmit: SubmitHandler<LoginRequest> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      <div>
        {errors.username && <p> {errors.username?.message}</p>}

        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register('username')} />
      </div>

      <div>
        {errors.password && <p> {errors.password?.message}</p>}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
      </div>

      <div>
        {errors.rememberMe && <p> {errors.rememberMe?.message}</p>}

        <label htmlFor="rememberMe">Remember me</label>
        <input type="checkbox" id="rememberMe" {...register('rememberMe')} />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};
