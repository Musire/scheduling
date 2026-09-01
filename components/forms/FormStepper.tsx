'use client';

import { SlideConfig, useFormStepper } from '@/hooks/useFormStepper';
import StatusButton from './StatusButton';
import { useFormStatus } from '@/context/FormStatusProvider';

interface FormStepperProps {
  slides: SlideConfig[];
}

export default function FormStepper({ slides }: FormStepperProps) {
  const {
    currentIndex,
    animating,
    direction,
    isLastStep,
    currentSlideComponent,
    handleNext,
    handleBack,
  } = useFormStepper({ slides });

  const { state, pending } = useFormStatus()

  return (
    <div className="flex flex-col w-full space-y-4 overflow-hidden">
      {/* Animated Slide Container with TranslateX & Opacity Combo */}
      <div
        className={`transition-all duration-200 transform ${
          animating
            ? direction === 'forward'
              ? '-translate-x-6 opacity-0'
              : 'translate-x-6 opacity-0'
            : 'translate-x-0 opacity-100'
        }`}
      >
        {currentSlideComponent}
      </div>

      {/* Navigation Controls (Always Multi) */}
      <div className="flex justify-between items-center pt-4 border-t">
        {currentIndex > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {!isLastStep ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 text-sm font-medium ml-auto transition-opacity"
          >
            Next
          </button>
        ) : (
          <StatusButton isPending={pending} state={state} />
        )}
      </div>
    </div>
  );
}