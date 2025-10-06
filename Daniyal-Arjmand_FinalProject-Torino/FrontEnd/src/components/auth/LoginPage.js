import { useState } from "react";
import EnterMobileForm from "@/components/auth/EnterMobileForm";
import EnterOtpForm from "@/components/auth/EnterOtpForm";

function LoginPage({ onClose }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  const handleMobileSubmit = (submittedMobile) => {
    console.log(`ارسال OTP به شماره: ${submittedMobile}`);
    setMobile(submittedMobile);
    setStep(2);
  };

  const handleOtpSubmit = (submittedOtp) => {
    console.log(`بررسی کد OTP: ${submittedOtp} برای شماره ${mobile}`);
    alert("شما با موفقیت وارد شدید!");
    onClose();
  };

  const handleGoBack = () => {
    setStep(1);
  };

  return (
    <div onClick={onClose}>
      <div>
        {step === 1 ? (
          <EnterMobileForm
            onMobileSubmit={handleMobileSubmit}
            onClose={onClose}
          />
        ) : (
          <EnterOtpForm
            mobileNumber={mobile}
            onOtpSubmit={handleOtpSubmit}
            onBack={handleGoBack}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
