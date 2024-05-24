import AuthForm from "@/Components/Auth";
import login from "../../assets/login-removebg-preview.png";

export const Login = () => {
  return (
    <div className="h-screen p-4 flex">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="text-4xl mt-4 font-bold mb-4">
          Welcome Back
        </div>
        <div className="text-gray-600 mb-4">
          Don't have an account? <a href="/register" className="underline text-black">Sign Up</a>
        </div>
        <AuthForm onSubmit={function (data: { email: string; password: string; confirmPassword?: string | undefined; }): void {
          throw new Error("Function not implemented.");
        }} />
      </div>
      <div className="flex-1 bg-slate-200 flex items-center justify-center rounded-lg">
        <img src={login} alt="login"/>
      </div>
    </div>
  );
};
