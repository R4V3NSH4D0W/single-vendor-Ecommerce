"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useGenerateOtp, useVerifyOtp } from "@/features/auth/api/use-otp";
import { useRegister } from "@/features/auth/api/user-register";
import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";

function VerifyOtpPage() {
  const { email, name, password } = useAppSelector((state) => state.register);
  const [otp, setOtp] = useState("");
  const { mutate: generateOtp, isPending: isGeneratingOtp } = useGenerateOtp();
  const { mutate: Register, isPending: isRegistering } = useRegister();
  const { mutate: verifyOtp, isPending: isOtpVerifying } = useVerifyOtp();

  useEffect(() => {
    if (email) {
      generateOtp({
        email,
        type: "EMAIL_VERIFICATION",
      });
    }
  }, [email, generateOtp]);

  const handleVerify = () => {
    verifyOtp(
      {
        email: email || "",
        otpCode: otp,
      },
      {
        onSuccess: () => {
          Register({
            json: {
              email,
              name,
              password,
            },
          });
        },
      }
    );
  };

  const handleResendOtp = () => {
    generateOtp({
      email: email || "",
      type: "EMAIL_VERIFICATION",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify Your Email</h1>
          <p className="text-muted-foreground mt-2">
            We've sent a verification code to
            <br />
            <span className="font-medium">{email || "your email"}</span>
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-center">
                Enter verification code
              </label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleVerify}
              disabled={otp.length !== 6 || isOtpVerifying || isRegistering}
            >
              {isOtpVerifying
                ? "Verifying..."
                : isRegistering
                ? "Registering..."
                : "Verify"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
                <button
                  onClick={handleResendOtp}
                  disabled={isGeneratingOtp}
                  className="text-primary hover:text-primary/80 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  type="button"
                >
                  {isGeneratingOtp ? "Resending..." : "Resend"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpPage;
