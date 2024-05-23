import AuthForm from "@/Components/Auth";
import loginanimation from "@/assets/loginanimation.json";
import Lottie from "lottie-react";

export const Login = () => {
  return (
    <div className="flex bg-primary h-screen items-center justify-center">
      <div className="flex bg-white shadow-lg rounded-lg m-32 w-full">
        <div className="flex-1 flex items-center justify-center p-16 h-full">
          <Lottie animationData={loginanimation} loop={true} className="h-[60vh]"/>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          
          <AuthForm
            onSubmit={function (data: { email: string; password: string; confirmPassword?: string | undefined }): void {
              console.log(data)
            }}
          />
        </div>
      </div>
    </div>
  );
};
