"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { Check } from "lucide-react";
import React from "react";

const Steps = [
  { id: 1, name: "Shipping", value: "shipping" },
  { id: 2, name: "Payment", value: "payment" },
  { id: 3, name: "Confirmation", value: "confirmation" },
];

function CheckoutSteps() {
  const currentStep = useAppSelector((state) => state.checkout.currentStep);
  const currentStepIndex = Steps.findIndex(
    (step) => step.value === currentStep
  );

  return (
    <div className="lg:px-60 mt-10">
      <div className="flex items-center justify-center w-full">
        {Steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 flex justify-center items-center rounded-full",
                    isActive
                      ? "bg-accent-foreground text-background"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-accent text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <span className="text-sm">
                      <Check size={16} />
                    </span>
                  ) : (
                    <label className="text-sm">{step.id}</label>
                  )}
                </div>
                <p
                  className={cn(
                    "text-sm",
                    isActive
                      ? "text-accent-foreground"
                      : isCompleted
                      ? "text-green-500"
                      : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </p>
              </div>

              {index < Steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 border-b border-2 mx-2 sm:w-[150px] md:w-[200px] lg:w-[250px]",
                    isCompleted ? "border-green-500" : "border-muted-foreground"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default CheckoutSteps;
