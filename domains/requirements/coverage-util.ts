type CoverageCandidate = {
    startsAt: Date;
    endsAt: Date;
};

type CoverageResult = {
    average: number;
    ratio: number;
};

const BLOCK_MINUTES = 15;

function isOverlapping(
    candidate: CoverageCandidate,
    blockStart: Date,
    blockEnd: Date
): boolean {
    return (
        candidate.startsAt < blockEnd &&
        candidate.endsAt > blockStart
    );
}

function countOverlappingCandidates(
    candidates: CoverageCandidate[],
    blockStart: Date,
    blockEnd: Date
): number {
    return candidates.reduce(
        (count, candidate) =>
            count + (isOverlapping(candidate, blockStart, blockEnd) ? 1 : 0),
        0
    );
}

export function calculateCoverage(
    start: Date,
    end: Date,
    candidates: CoverageCandidate[],
    requiredStaff: number
): CoverageResult {
    if (end <= start) {
        throw new Error('Coverage end must be after coverage start.');
    }

    if (requiredStaff <= 0) {
        throw new Error('Required staff must be greater than zero.');
    }

    let blockStart = new Date(start);
    let totalStaffing = 0;
    let blockCount = 0;

    while (blockStart < end) {
        const blockEnd = new Date(
            Math.min(
                blockStart.getTime() + BLOCK_MINUTES * 60 * 1000,
                end.getTime()
            )
        );

        totalStaffing += countOverlappingCandidates(
            candidates,
            blockStart,
            blockEnd
        );

        blockCount++;

        blockStart = blockEnd;
    }

    const average = totalStaffing / blockCount;
    const ratio = average / requiredStaff;

    return {
        average,
        ratio,
    };
}