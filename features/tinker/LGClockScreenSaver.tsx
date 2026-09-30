'use client';

import { APP_TIMEZONE } from '@/lib/timeUtils';
import { formatInTimeZone } from 'date-fns-tz';
import { useEffect, useState } from 'react';

export default function LGClockScreensaver() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get current hour and minute in the application timezone
  const hourString = formatInTimeZone(time, APP_TIMEZONE, 'H');
  const minuteString = formatInTimeZone(time, APP_TIMEZONE, 'm');

  const rawHour = parseInt(hourString, 10);
  const minute = parseInt(minuteString, 10);

  const hour12 = rawHour % 12 || 12;

  // Calculate clock-hand angles
  const minuteAngle = minute * 6;
  const hourAngle = hour12 * 30 + minute * 0.5;

  // Format date in the application timezone
  const formattedDate = formatInTimeZone(
    time,
    APP_TIMEZONE,
    'd MMMM yyyy'
  );

  return (
    <div className="flex-1 bg-background centered-col p-6">
      <h2 className="font-light text-3xl text-center">
        FEATURE COMING SOON
      </h2>

      <div className="flex flex-col items-center justify-center min-h-100 w-full bg-background text-white p-6 font-sans select-none">
        <style>{`
          @keyframes arcRotate {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }

          .animate-lg-arc {
            animation: arcRotate 6s linear infinite;
            transform-origin: 100px 100px;
          }
        `}</style>

        {/* Clock Face */}
        <svg
          viewBox="0 0 200 200"
          className="w-64 h-64"
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.9"
        >
          {/* Hour Hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="55"
            strokeWidth="2.5"
            transform={`rotate(${hourAngle} 100 100)`}
            className="transition-transform duration-500 ease-out"
          />

          {/* Minute Hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="40"
            strokeWidth="2"
            transform={`rotate(${minuteAngle} 100 100)`}
            className="transition-transform duration-500 ease-out"
          />

          {/* Central Pivot */}
          <circle
            cx="100"
            cy="100"
            r="1.5"
            fill="black"
            stroke="white"
            strokeWidth="1"
          />

          {/* 180 Degree Sweeping Arc */}
          <g className="animate-lg-arc">
            <path
              d="M 175 100 A 75 75 0 0 1 25 100"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
          </g>
        </svg>

        {/* Dynamic Date */}
        <div className="mt-4 text-base tracking-wide font-normal text-gray-300/80 min-h-6">
          {formattedDate}
        </div>
      </div>
    </div>
  );
}