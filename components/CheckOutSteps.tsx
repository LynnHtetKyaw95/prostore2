import { CHECK_OUT_STEPS } from "@/lib/constants";
import React from "react";
import { cn } from "@/lib/utils";

const CheckOutSteps = ({ current = 0 }) => {
  return (
    <div className="flex-between md:flex-row flex-col space-x-2 space-y-2 mb-10">
      {CHECK_OUT_STEPS.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              "p-2 w-56 rounded-full text-center text-sm",
              index === current ? "bg-secondary" : "",
            )}
          >
            {step}
          </div>
          {index !== CHECK_OUT_STEPS.length - 1 && (
            <hr className="w-16 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default CheckOutSteps;
