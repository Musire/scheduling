'use client';

import { useEffect, useState } from 'react';
// Import the APP_TIMEZONE constant and the formatInTimeZone helper from your library
import { APP_TIMEZONE } from '@/lib/timeUtils';
import { formatInTimeZone } from 'date-fns-tz';

export default function LGClockScreensaver() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 1. Fetch current hour and minute explicitly mapped to the America/Chicago timezone string
  const hourString = formatInTimeZone(time, APP_TIMEZONE, 'H'); // 24-hour raw string format
  const minuteString = formatInTimeZone(time, APP_TIMEZONE, 'm');

  const rawHour = parseInt(hourString, 10);
  const minute = parseInt(minuteString, 10);
  const hour12 = rawHour % 12 || 12;

  // 2. Calculate angles relative to a center point (0deg = straight up)
  const minuteAngle = minute * 6;
  const hourAngle = (hour12 * 30) + (minute * 0.5);

  // 3. Format the Date exactly matching your image (e.g., "16 January 2024")
  const formattedDate = formatInTimeZone(time, APP_TIMEZONE, 'd MMMM yyyy');

  return (
    <div className="flex-1 bg-background centered-col p-6">
        <h2 className="font-light text-3xl">FEATURE COMING SOON</h2>
        <div className="flex flex-col items-center justify-center min-h-100 w-full bg-background text-white p-6 font-sans select-none">
            <style>{`
                @keyframes arcRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
                }
                .animate-lg-arc {
                animation: arcRotate 6s linear infinite;
                transform-origin: 100px 100px;
                }
            `}</style>

            {/* Clock Face Viewbox Canvas */}
            <svg
                viewBox="0 0 200 200"
                className="w-64 h-64 opacity-90"
                fill="none"
                stroke="white"
                strokeLinecap="round"
            >
                {/* --- CLOCK HANDS (Radiating perfectly from center 100,100) --- */}
                
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

                {/* Central Pivot Center Dot */}
                <circle cx="100" cy="100" r="1.5" fill="black" stroke="white" strokeWidth="1" />

                {/* --- 180 DEGREE SEMI-CIRCLE SWEEPING TANGENT SEGMENT --- */}
                <g className="animate-lg-arc">
                <path
                    d="M 175 100 A 75 75 0 0 1 25 100"
                    strokeWidth="1.2"
                    strokeOpacity="0.7"
                />
                </g>
            </svg>

            {/* Dynamic Date Label Output */}
            <div className="mt-4 text-base tracking-wide font-normal text-gray-300 opacity-80 min-h-6">
                {formattedDate}
            </div>
        </div>
    </div>
  );
}
