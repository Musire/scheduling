type CoverageCandidate = {
    startsAt: number; // Seconds since midnight
    endsAt: number;   // Seconds since midnight
};

type CoverageResult = {
    average: number;
    ratio: number;
};

// 15 minutes converted to seconds (15 * 60)
const BLOCK_SECONDS = 15 * 60; 

function isOverlapping(
    candidate: CoverageCandidate,
    blockStart: number,
    blockEnd: number
): boolean {
    return (
        candidate.startsAt < blockEnd &&
        candidate.endsAt > blockStart
    );
}

function countOverlappingCandidates(
    candidates: CoverageCandidate[],
    blockStart: number,
    blockEnd: number
): number {
    return candidates.reduce(
        (count, candidate) =>
            count + (isOverlapping(candidate, blockStart, blockEnd) ? 1 : 0),
        0
    );
}

export function calculateCoverage(
    start: number, // Seconds since midnight (e.g., 28800 for 08:00)
    end: number,   // Seconds since midnight (e.g., 61200 for 17:00)
    candidates: CoverageCandidate[],
    requiredStaff: number
): CoverageResult {
    // If you need to handle empty ranges or division by zero guardrails:
    if (end <= start || requiredStaff <= 0) {
        return { average: 0, ratio: 0 };
    }

    let blockStart = start;
    let totalStaffing = 0;
    let blockCount = 0;

    while (blockStart < end) {
        const blockEnd = Math.min(
            blockStart + BLOCK_SECONDS,
            end
        );

        totalStaffing += countOverlappingCandidates(
            candidates,
            blockStart,
            blockEnd
        );

        blockCount++;
        blockStart = blockEnd;
    }

    const rawAverage = totalStaffing / blockCount;
    const average = Number(rawAverage.toFixed(1))
    const ratio = average / requiredStaff;

    return {
        average,
        ratio,
    };
}
