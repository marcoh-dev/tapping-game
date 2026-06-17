export function getScale(width, height) {
  const unit = Math.min(width, height);

  return {
    gap: unit * 0.05,
    minSize: unit * 0.1,
    maxSize: unit * 0.25,
  };
}

export function random(min, max) {
  return Math.random() * (max - min) + min;
}

export function isOverlapping(a, b, gap) {
  return !(
    a.left + a.size + gap < b.left ||
    a.left > b.left + b.size + gap ||
    a.top + a.size + gap < b.top ||
    a.top > b.top + b.size + gap
  );
}

export function createTarget(
  existingTargets,
  gameAreaWidth,
  gameAreaHeight,
  gameAreaScale
) {
  let potentialNewTarget;

  for (let i = 0; i < 1000; i++) {
    const targetSize =
      Math.random() * (gameAreaScale.maxSize - gameAreaScale.minSize) +
      gameAreaScale.minSize;

    potentialNewTarget = {
      id: crypto.randomUUID(),
      left: random(0, gameAreaWidth - targetSize),
      top: random(0, gameAreaHeight - targetSize),
      size: targetSize,
      removing: true,
    };

    const overlap = existingTargets.some((target) =>
      isOverlapping(potentialNewTarget, target, gameAreaScale.gap)
    );

    if (!overlap) {
      return potentialNewTarget;
    }
  }
  return potentialNewTarget;
}

export function createFixedPositionTarget(
  existingTargets,
  gameAreaWidth,
  gameAreaHeight,
  gameAreaScale,
  { top: targetPercentageTop, left: targetPercentageLeft }
) {
  let potentialNewTarget;

  for (let i = 0; i < 1000; i++) {
    const targetSize =
      Math.random() * (gameAreaScale.maxSize - gameAreaScale.minSize) +
      gameAreaScale.minSize;

    potentialNewTarget = {
      id: crypto.randomUUID(),
      left: (gameAreaWidth / 100) * targetPercentageLeft,
      top: (gameAreaHeight / 100) * targetPercentageTop,
      size: targetSize,
      removing: true,
    };

    const overlap = existingTargets.some((target) =>
      isOverlapping(potentialNewTarget, target, gameAreaScale.gap)
    );

    if (!overlap) {
      return potentialNewTarget;
    }
  }
  return potentialNewTarget;
}
