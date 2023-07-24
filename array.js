function move(arr, from, to) {
  if (to < from) {
    const a = arr.slice(0, to);
    const b = arr.slice(to, from);
    const c = arr.slice(from, from + 1);
    const d = arr.slice(from + 1);

    return [...a, ...c, ...b, ...d];
  } else if(from < to) {
    const a = arr.slice(0, from);
    const b = arr.slice(from, from + 1);
    const c = arr.slice(from + 1, to + 1);
    const d = arr.slice(to + 1);

    return [...a, ...c, ...b, ...d];
  }

  return arr;
}

