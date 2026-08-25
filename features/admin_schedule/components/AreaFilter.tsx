'use client';

type Area = {
  id: string;
  name: string;
};

interface AreaFilterProps {
  selectedAreaId: string;
  setSelectedAreaId: (id: string) => void;
  areas?: Area[];
}

export function AreaFilter({ 
  selectedAreaId, 
  setSelectedAreaId, 
  areas = [
    { id: "area_kitchen", name: "Kitchen" },
    { id: "area_dining", name: "Dining" }
  ] 
}: AreaFilterProps) {
  return (
    <div className="w-full max-w-md px-1">
      <div className="relative flex items-center bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 transition-colors focus-within:border-neutral-600">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mr-3">
          Area
        </span>
        <select
          id="area-filter"
          value={selectedAreaId}
          onChange={(e) => setSelectedAreaId(e.target.value)}
          className="w-full bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer appearance-none"
        >
          <option value="all" className="bg-neutral-900 text-white">All Areas</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id} className="bg-neutral-900 text-white">
              {area.name}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow to match sleek modern UI */}
        <div className="pointer-events-none text-neutral-400 text-xs">
          ▼
        </div>
      </div>
    </div>
  );
}