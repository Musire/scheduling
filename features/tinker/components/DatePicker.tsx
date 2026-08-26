'use client';

import { generateDayTabs, getWeekRange, navigateWeek } from '@/domains/scheduling/utils/weekViewUtils';
import { Dayjs } from '@/lib/dayjs';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CalendarControllerProps {
  currentWeekStart: Dayjs;
  setCurrentWeekStart: (date: Dayjs) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export function DatePicker({
  currentWeekStart,
  setCurrentWeekStart,
  selectedDate,
  setSelectedDate,
}: CalendarControllerProps) {
  
  const { formattedRange } = getWeekRange(currentWeekStart);
  const dayTabs = generateDayTabs(currentWeekStart);

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md overflow-hidden">
      {/* Week Controller */}
      <div className="flex items-center space-x-6  justify-between w-full text-white text-lg font-medium">
        <button 
          onClick={() => setCurrentWeekStart(navigateWeek(currentWeekStart, "prev").startOfWeek)}
          className="text-else hover:text-main transition cursor-pointer"
        >
          <ArrowLeft />
        </button>
        <span className="capitalize">{formattedRange}</span>
        <button 
          onClick={() => setCurrentWeekStart(navigateWeek(currentWeekStart, "next").startOfWeek)}
          className="text-else hover:text-main transition cursor-pointer"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Day Filter Tabs */}
      <div className="flex xs:max-mobile:space-x-1 space-x-2 w-full max-w-full overflow-x-auto justify-between  scrollbar-none">
        {dayTabs.map((tab) => {
          const isActive = selectedDate === tab.dateString;
          return (
            <button
              key={tab.dateString}
              onClick={() => setSelectedDate(tab.dateString)}
              className={` py-2 text-sm rounded font-medium transition lowercase
                flex flex-col items-center justify-center shrink-0 w-[12%] gap-0.5 cursor-pointer border-whitesmoke/15 border
                ${isActive 
                  ? "bg-whitesmoke/87 text-black font-bold" 
                  : " text-else hover:bg-lighten-1/background"
                }
                ${tab.isToday && !isActive ? "border border-whitesmoke/45" : ""}
              `}
            >
              {/* Day Name (e.g., mon) */}
              <span className="text-xs opacity-80 capitalize">{tab.dayName}</span>
              
              {/* Date Digit (e.g., 24) */}
              <span className="text-base font-semibold">
                {tab.dateString.split("-")[2]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
