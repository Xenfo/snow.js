export function isPromise(value: any) {
  return (
    value &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  );
}

export function isEventEmitter(value) {
  return (
    value && typeof value.on === 'function' && typeof value.emit === 'function'
  );
}

export function prefixCompare(aKey, bKey) {
  if (aKey === '' && bKey === '') return 0;
  if (aKey === '') return 1;
  if (bKey === '') return -1;
  if (typeof aKey === 'function' && typeof bKey === 'function') return 0;
  if (typeof aKey === 'function') return 1;
  if (typeof bKey === 'function') return -1;
  return aKey.length === bKey.length
    ? aKey.localeCompare(bKey)
    : bKey.length - aKey.length;
}

export function intoArray(x: any[] | any) {
  if (Array.isArray(x)) {
    return x;
  }

  return [x];
}

export function intoCallable(thing) {
  if (typeof thing === 'function') {
    return thing;
  }

  return () => thing;
}

export function flatMap(xs, f) {
  const res = [];
  for (const x of xs) {
    res.push(...f(x));
  }

  return res;
}

export function deepAssign(o1, ...os) {
  for (const o of os) {
    for (const [k, v] of Object.entries(o)) {
      const vIsObject = v && typeof v === 'object';
      const o1kIsObject =
        Object.prototype.hasOwnProperty.call(o1, k) &&
        o1[k] &&
        typeof o1[k] === 'object';
      if (vIsObject && o1kIsObject) {
        deepAssign(o1[k], v);
      } else {
        o1[k] = v;
      }
    }
  }

  return o1;
}

export function choice(...xs: any[]) {
  for (const x of xs) {
    if (x !== null) {
      return x;
    }
  }

  return null;
}
