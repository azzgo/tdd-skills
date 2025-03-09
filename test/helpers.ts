export let checkIsClass = (obj: any) => {
  return typeof obj === "function" && obj.constructor != null;
};
