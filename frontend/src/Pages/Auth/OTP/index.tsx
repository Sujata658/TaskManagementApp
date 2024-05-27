import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate, useParams } from "react-router-dom";

type OTPProps = {
  otp: string;
  email: string;
};

const OTP: React.FC = () => {
  const { otp } = useParams<OTPProps>();
  const navigate = useNavigate();

  const otpArray = otp ? otp.split('') : [];

  const handleClick = () => {
    navigate('/login')
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-12 rounded-lg max-w-[400px] shadow-lg" >
        <h2 className="text-3xl text-center font-bold">Enter OTP</h2>
        <p className="m-4 text-center">Please enter the 6-digit OTP sent to your email.</p>

        {otp && (
          <InputOTP maxLength={6} >
              <InputOTPGroup>
                {otpArray.slice(0, 3).map((value, index) => {
                  return <InputOTPSlot key={index} index={index} defaultValue={value} />;
                })}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {otpArray.slice(3, 6).map((value, index) => (
                  <InputOTPSlot key={index + 3} index={index + 3} defaultValue={value} />
                ))}
              </InputOTPGroup>
          </InputOTP>
        )}

        <Button className="w-full mt-4" onClick={handleClick}>Verify OTP</Button>
        <a href="#" className="text-center block mt-4">Resend OTP</a>
      </div>
    </div>


  );
};

export default OTP;
