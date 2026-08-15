function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

export function getPortalPoints(results) {

    if (!results || !results.landmarks) return null;

    if (results.landmarks.length < 2) return null;

    const left = results.landmarks[0];
    const right = results.landmarks[1];

    const topGap = distance(left[8], right[8]);
    const bottomGap = distance(left[4], right[4]);

    if (topGap > 0.45 || bottomGap > 0.45) {
        return null;
    }

    return {
        leftThumb: left[4],
        leftIndex: left[8],
        rightThumb: right[4],
        rightIndex: right[8]
    };
}