import { useState } from "react";
import EnterMobileForm from "@/components/auth/EnterMobileForm";
import EnterOtpForm from "@/components/auth/EnterOtpForm";
import { sendOtp, checkOtp } from "@/lib/api/config";

function LoginPage({ onClose }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMobileSubmit = async (submittedMobile) => {
    setIsLoading(true);
    setError("");
    try {
      await sendOtp(submittedMobile);
      setMobile(submittedMobile);
      setStep(2);
    } catch (err) {
      setError("خطا در ارسال کد. لطفاً دوباره تلاش کنید.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (submittedOtp) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await checkOtp(mobile, submittedOtp);

      const { accessToken, refreshToken } = response.data;

      Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });

      alert("شما با موفقیت وارد شدید!");
      onClose();
    } catch (err) {
      setError("کد وارد شده صحیح نیست.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <EnterOtpForm
            mobileNumber={mobile}
            onOtpSubmit={handleOtpSubmit}
            onBack={handleGoBack}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
