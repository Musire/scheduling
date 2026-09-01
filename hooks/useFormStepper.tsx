'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ZodObject, ZodRawShape } from 'zod';

export interface SlideConfig {
  schema: ZodObject<ZodRawShape>;
  component: React.ReactNode;
}

interface UseFormStepperProps {
  slides: SlideConfig[];
  animationDuration?: number; // Optional timing configuration
}

export function useFormStepper({ slides, animationDuration=200 }: UseFormStepperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Grab trigger from React Hook Form
  const { trigger, formState } = useFormContext();
  

  const isLastStep = currentIndex === slides.length - 1;

  const handleNext = async () => {
    const currentSlide = slides[currentIndex];
    const fieldsToValidate = Object.keys(currentSlide.schema.shape);

    const isValid = await trigger(fieldsToValidate);

    // 3. If validation fails, stop here (errors will display on the inputs automatically)
    if (!isValid) return;

    // 4. Proceed to the next slide if valid
    setDirection('forward');
    setAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
      setAnimating(false);
    }, animationDuration);
  };

  const handleBack = () => {
    setDirection('backward');
    setAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      setAnimating(false);
    }, animationDuration);
  };

  return {
    currentIndex,
    animating,
    direction,
    isLastStep,
    currentSlideComponent: slides[currentIndex].component,
    handleNext,
    handleBack,
  };
}