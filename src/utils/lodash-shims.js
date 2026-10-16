// Standalone callable Lodash replacement for Recharts compatibility

export const isNil = (val) => val === null || val === undefined;
export const isFunction = (val) => typeof val === 'function';
export const isObject = (val) => val !== null && (typeof val === 'object' || typeof val === 'function');
export const isPlainObject = (val) => Object.prototype.toString.call(val) === '[object Object]';
export const isString = (val) => typeof val === 'string';
export const isNumber = (val) => typeof val === 'number' && !Number.isNaN(val);
export const isBoolean = (val) => typeof val === 'boolean';
export const isNaN = (val) => Number.isNaN(val);

export const get = (obj, path, defaultValue) => {
  if (!obj) return defaultValue;
  if (Array.isArray(path)) {
    let curr = obj;
    for (const key of path) {
      if (curr == null) return defaultValue;
      curr = curr[key];
    }
    return curr !== undefined ? curr : defaultValue;
  }
  const parts = String(path).replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr == null) return defaultValue;
    curr = curr[part];
  }
  return curr !== undefined ? curr : defaultValue;
};

export const sortBy = (collection, iteratees) => {
  if (!Array.isArray(collection)) return [];
  const list = [...collection];
  const fns = Array.isArray(iteratees) ? iteratees : [iteratees];
  return list.sort((a, b) => {
    for (const fn of fns) {
      const valA = typeof fn === 'function' ? fn(a) : (fn ? a?.[fn] : a);
      const valB = typeof fn === 'function' ? fn(b) : (fn ? b?.[fn] : b);
      if (valA < valB) return -1;
      if (valA > valB) return 1;
    }
    return 0;
  });
};

export const max = (arr) => {
  if (!arr || !arr.length) return undefined;
  return Math.max(...arr.filter((x) => typeof x === 'number' && !Number.isNaN(x)));
};

export const min = (arr) => {
  if (!arr || !arr.length) return undefined;
  return Math.min(...arr.filter((x) => typeof x === 'number' && !Number.isNaN(x)));
};

export const maxBy = (arr, iteratee) => {
  if (!arr || !arr.length) return undefined;
  const fn = typeof iteratee === 'function' ? iteratee : (x) => x?.[iteratee];
  let best = arr[0];
  let bestVal = fn(best);
  for (let i = 1; i < arr.length; i++) {
    const val = fn(arr[i]);
    if (val > bestVal) {
      best = arr[i];
      bestVal = val;
    }
  }
  return best;
};

export const minBy = (arr, iteratee) => {
  if (!arr || !arr.length) return undefined;
  const fn = typeof iteratee === 'function' ? iteratee : (x) => x?.[iteratee];
  let best = arr[0];
  let bestVal = fn(best);
  for (let i = 1; i < arr.length; i++) {
    const val = fn(arr[i]);
    if (val < bestVal) {
      best = arr[i];
      bestVal = val;
    }
  }
  return best;
};

export const flatMap = (arr, fn) => {
  if (!Array.isArray(arr)) return [];
  return arr.flatMap(typeof fn === 'function' ? fn : (x) => x);
};

export const upperFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
};

export const mapValues = (obj, fn) => {
  if (!obj) return {};
  const res = {};
  for (const [k, v] of Object.entries(obj)) {
    res[k] = typeof fn === 'function' ? fn(v, k, obj) : v;
  }
  return res;
};

export const every = (arr, fn) => {
  if (!Array.isArray(arr)) return true;
  return arr.every(typeof fn === 'function' ? fn : Boolean);
};

export const memoize = (fn) => {
  const cache = new Map();
  const memoized = (...args) => {
    const key = args[0];
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
  memoized.cache = cache;
  return memoized;
};

export const omit = (obj, keys) => {
  if (!obj) return {};
  const keySet = new Set(Array.isArray(keys) ? keys : [keys]);
  const res = {};
  for (const [k, v] of Object.entries(obj)) {
    if (!keySet.has(k)) res[k] = v;
  }
  return res;
};

export const uniqBy = (arr, iteratee) => {
  if (!Array.isArray(arr)) return [];
  const fn = typeof iteratee === 'function' ? iteratee : (x) => x?.[iteratee];
  const seen = new Set();
  const res = [];
  for (const item of arr) {
    const val = fn(item);
    if (!seen.has(val)) {
      seen.add(val);
      res.push(item);
    }
  }
  return res;
};

export const last = (arr) => (arr && arr.length ? arr[arr.length - 1] : undefined);
export const first = (arr) => (arr && arr.length ? arr[0] : undefined);
export const range = (start, end, step = 1) => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  const res = [];
  for (let i = start; i < end; i += step) {
    res.push(i);
  }
  return res;
};
export const some = (arr, fn) => (Array.isArray(arr) ? arr.some(typeof fn === 'function' ? fn : Boolean) : false);
export const find = (arr, fn) => (Array.isArray(arr) ? arr.find(typeof fn === 'function' ? fn : (x) => x) : undefined);
export const sumBy = (arr, iteratee) => {
  if (!Array.isArray(arr)) return 0;
  const fn = typeof iteratee === 'function' ? iteratee : (x) => x?.[iteratee];
  return arr.reduce((acc, curr) => acc + (Number(fn(curr)) || 0), 0);
};

export const throttle = (func, wait = 100) => {
  let timeout = null;
  let previous = 0;
  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
};

function lodash(val) {
  return {
    value: () => val,
    map: (fn) => lodash(Array.isArray(val) ? val.map(fn) : []),
    filter: (fn) => lodash(Array.isArray(val) ? val.filter(fn) : []),
    sortBy: (fn) => lodash(sortBy(val, fn)),
  };
}

Object.assign(lodash, {
  isNil,
  isFunction,
  isObject,
  isPlainObject,
  isString,
  isNumber,
  isBoolean,
  isNaN,
  get,
  sortBy,
  max,
  min,
  maxBy,
  minBy,
  flatMap,
  upperFirst,
  isEqual,
  mapValues,
  every,
  memoize,
  omit,
  uniqBy,
  last,
  first,
  range,
  some,
  find,
  sumBy,
  throttle
});

export default lodash;
