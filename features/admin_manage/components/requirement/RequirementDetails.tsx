import { CoverageRequirement } from "@/generated/prisma/client";

export interface CoverageWithCount extends CoverageRequirement {
  _count: number;
  area: {
    name: string;
  },
  role: {
    name: string;
  }
}

export type Props = {
  requirement: CoverageWithCount
}

export default function RequirementDetails ({
    requirement
}: Props) {
    return (
        <section className="">
            <pre className="">{JSON.stringify(requirement, null, 4)}</pre>
        </section>
    );
}