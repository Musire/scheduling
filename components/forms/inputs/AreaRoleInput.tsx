'use client'
import { DropdownButton } from "@/components/buttons";
import { ControlledInput } from "@/components/forms";
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
  areaRoles: {
    id: string;
    name: string;
    roles: {
      id: string;
      name: string;
    }[];
  }[]; // Make sure this is an array
};

export default function AreaRoleInput({ areaRoles }: Props) {
  const { control, setValue } = useFormContext();

  // 1. Watch the selected area ID in real-time
  const selectedAreaId = useWatch({ control, name: "areaId" });

  // 2. Find the full area object based on the selected ID
  const selectedArea = areaRoles.find((area) => area.id === selectedAreaId);

  // 3. Extract roles for the selected area (empty array if no area chosen yet)
  const availableRoles = selectedArea ? selectedArea.roles : [];

  return (
    <div className="flex flex-col gap-4">
      {/* --- AREA DROPDOWN --- */}
      <ControlledInput
        name="areaId"
        label="Area"
        render={(field) => {
          const currentArea = areaRoles.find((a) => a.id === field.value);
          const areaNames = areaRoles.map((a) => a.name);

          return (
            <DropdownButton
              options={areaNames}
              value={currentArea ? currentArea.name : ""}
              onChange={(selectedName) => {
                const matchedArea = areaRoles.find((a) => a.name === selectedName);
                const newAreaId = matchedArea ? matchedArea.id : "";

                // Set the area ID in form state
                field.onChange(newAreaId);

                // Reset the role field whenever the area changes to prevent stale data
                setValue("roleId", ""); 
              }}
            />
          );
        }}
      />

      {/* --- ROLE DROPDOWN (Disabled until an area is selected) --- */}
      <ControlledInput
        name="roleId"
        label="Role"
        render={(field) => {
          const currentRole = availableRoles.find((r) => r.id === field.value);
          const roleNames = availableRoles.map((r) => r.name);

          return (
            <div className={!selectedAreaId ? "opacity-50 pointer-events-none" : ""}>
              <DropdownButton
                options={roleNames}
                value={currentRole ? currentRole.name : ""}
                onChange={(selectedName) => {
                  const matchedRole = availableRoles.find((r) => r.name === selectedName);
                  field.onChange(matchedRole ? matchedRole.id : "");
                }}
              />
            </div>
          );
        }}
      />
    </div>
  );
}