export function getTouches(e) {
  const h = e.target.clientHeight;
  const w = e.target.clientWidth;

  return [...e.touches].map((touch) => ({
    id: touch.identifier,
    h,
    w,
    x: touch.clientX,
    y: touch.clientY,
  }));
}

export function getPositions(touches) {
  const sums = touches.reduce(({ sumX, sumY }, { x, y }) => ({
    sumX: sumX + x,
    sumY: sumY + y,
  }), { sumX: 0, sumY: 0 });

  const divisor = touches.length || 1;

  return {
    x: sums.sumX / divisor,
    y: sums.sumY / divisor,
  };
}

function getDiffs(lastTouches, touches) {
  return touches.reduce((diffs, touch) => {
    const match = lastTouches.find((last) => last.id === touch.id);
    if (match) {
      const x = touch.x - match.x;
      const y = touch.y - match.y;

      return [...diffs, { x, y }];
    }
    return diffs;
  }, []);
}

function getAverages(diffs) {
  const init = { x: 0, y: 0 };

  if (diffs.length > 0) {
    return diffs.reduce((sum, { x, y }) => ({
      x: sum.x + x,
      y: sum.y + y,
    }), init);
  }
  return init;
}

export function getMoveRatios(lastTouches, touches) {
  const w = touches[0].w;
  const h = touches[0].h;
  const diffs = getDiffs(lastTouches, touches);
  const { x, y } = getAverages(diffs);
  const xRatio = x / w;
  const yRatio = y / h;

  return {
    x: xRatio,
    y: yRatio,
  };
}

function getScaleAndCenter(lastTouches, matched, axis, range) {
  if (matched.length >= 2) {
    const min = matched.reduce((min, item) => item[axis] < min[axis] ? item : min, matched[0]);
    const max = matched.reduce((max, item) => item[axis] > max[axis] ? item : max, matched[0]);
    const dist = max[axis] - min[axis];

    const lastMax = lastTouches.find((last) => last.id === max.id);
    const lastMin = lastTouches.find((last) => last.id === min.id);
    const lastDist = lastMax[axis] - lastMin[axis];

    if (lastDist > 0) {
      const scale = dist / lastDist;
      const center = (min[axis] + max[axis]) / 2;

      return [scale, center / range];
    }
  }

  return [1.0, 0.5];
}

export function getScaleRatios(lastTouches, touches) {
  const w = touches[0].w;
  const h = touches[0].h;
  const lastIds = lastTouches.map((last) => last.id);
  const matched = touches.filter((touch) => lastIds.includes(touch.id));

  const [x, xCenter] = getScaleAndCenter(lastTouches, matched, 'x', w);
  const [y, yCenter] = getScaleAndCenter(lastTouches, matched, 'y', h);

  return { x, xCenter, y, yCenter };
}
