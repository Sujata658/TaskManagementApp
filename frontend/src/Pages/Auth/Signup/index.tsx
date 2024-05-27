import { z } from "zod";
import AuthForm from "@/Components/Auth/AuthForm";
import { Link } from "react-router-dom";
import signUpImage from "@/assets/undraw_donut_love_kau1.svg";
import { useState } from "react";
import { signupapi } from "@/apis/users/signup";
import mail from "../../../assets/mail.svg";


const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(8)
});
z
export const Signup = () => {
  const [emailSent, setEmailSent] = useState(false);


  const handleSubmit = ({email,  username, password}: z.infer<typeof signUpSchema>) => {
    console.log("Sign Up Form Submitted", email, username, password);
    signupapi({email: email, name: username, password: password}).then((response) => {
      if (response.status === 200) {
        setEmailSent(true);
      }
    }).catch((error) => {
      console.error('Error during SignUp:', error);
    })
  };

  return (
    <div className="h-screen p-4 flex text-start">

      <div className="flex-1 bg-slate-200 flex items-center justify-center rounded-lg">
        <img src={signUpImage} alt="login" className="w-[70%]"/>
      </div>
      {
        !emailSent ? <div className="flex-1 flex flex-col justify-center items-center mx-8">
          <img src={mail} alt="mail" className="w-32 m-8"/>
          <div className="text-4xl mt-4 font-bold mb-4">
            Email Sent
          </div>
          <div className="text-gray-600 mb-4">
            Please check your email to verify your account.
          </div>
        </div>:<div className="flex-1 flex flex-col justify-center items-center mx-8">
        <div className="text-4xl mt-4 font-bold mb-4">
          Come Join Us
        </div>
        <div className="text-gray-600 mb-4">
          Already have an account? <Link to="/register" className="underline text-black">Login</Link>
        </div>
        <div className="w-full">
          <AuthForm
            schema={signUpSchema}
            onSubmit={handleSubmit}
            fields={[
              { name: "email", label: "Email", placeholder: "Email", inputType: "email" },
              { name: "username", label: "Username", placeholder: "Username" },
              { name: "password", label: "Password", placeholder: "Password", inputType: "password" }
            ]}
          />
        </div>
      </div>
      }
      
    </div>

  );
};
