export const normalizeKey = (serviceName) => {
    if (!serviceName) return "default";
    return serviceName.toLowerCase().replace(/\s+/g, "");
  };
  