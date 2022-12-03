export const getKey = (key) => {
  if (!key) {
    throw new Error("Can not get empty key");
  }
  const value = import.meta.env[key];
  if (value) {
    return value;
  }
  throw new Error(`Key ${key} could not be found. Please add to ENV file`);
};
