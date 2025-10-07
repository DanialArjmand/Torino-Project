import { useState } from "react";
import EnterMobileForm from "@/components/auth/EnterMobileForm";
import EnterOtpForm from "@/components/auth/EnterOtpForm";
import { sendOtp, checkOtp } from "@/lib/api/config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function LoginPage({ onClose }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleMobileSubmit = async (submittedMobile) => {
    setIsLoading(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await sendOtp(submittedMobile);

      setFeedback({
        type: "success",
        message: response.data.message || "کد با موفقیت ارسال شد.",
      });

      setMobile(submittedMobile);
      setStep(2);

      setTimeout(() => {
        setFeedback({ type: "", message: "" });
      }, 4000);
    } catch (err) {
      setFeedback({
        type: "error",
        message: "خطا در ارسال کد. لطفاً دوباره تلاش کنید.",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (submittedOtp) => {
    setIsLoading(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await checkOtp(mobile, submittedOtp);

      const { accessToken, refreshToken } = response.data;

      Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true });

      alert("شما با موفقیت وارد شدید!");
      onClose();
      router.push("/");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "کد وارد شده صحیح نیست.";
      setFeedback({ type: "error", message: errorMessage });
      console.error("خطا در بررسی کد OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await sendOtp(mobile);
      setFeedback({
        type: "success",
        message: response.data.message || "کد مجدداً ارسال شد.",
      });

      setTimeout(() => {
        setFeedback({ type: "", message: "" });
      }, 4000);
      
    } catch (err) {
      setFeedback({
        type: "error",
        message: "خطا در ارسال مجدد کد.",
      });
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
            feedback={feedback}
          />
        ) : (
          <EnterOtpForm
            mobileNumber={mobile}
            onOtpSubmit={handleOtpSubmit}
            onBack={handleGoBack}
            isLoading={isLoading}
            feedback={feedback}
            onResendCode={handleResendOtp}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
