
const isPrimitive = (value: any): boolean => {
  return value === null || (typeof value !== "object" && typeof value !== "function");
}



export const deepClone = <T>(value: T): T => {
  const _clone = (value: any, seen = new Set<any>()): any => {
    if (isPrimitive(value)) {
      return value;
    }
    if (seen.has(value)) {
      return value; // Prevent circular references
    }
    seen.add(value);

    if (Array.isArray(value)) {
      return value.map(item => _clone(item, seen));
    } else if (value instanceof Date) {
      return new Date(value.getTime());
    } else if (value instanceof RegExp) {
      return new RegExp(value.source, value.flags);
    } else if (typeof value === 'object') {
      const clonedObj: Record<string, any> = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          clonedObj[key] = _clone(value[key], seen);
        }
      }
      return clonedObj;
    }
    
    return value; // Fallback for other types
  }

  return _clone(value);
}
