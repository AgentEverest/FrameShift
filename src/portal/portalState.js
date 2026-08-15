let portalStrength = 0;

export function updatePortal(active) {

    const speed = 0.08;

    if (active) {
        portalStrength = Math.min(1, portalStrength + speed);
    } else {
        portalStrength = Math.max(0, portalStrength - speed);
    }

    return portalStrength;
}