export const formatUrl = (url: string): string => {
  return new URL(url).hostname;
};
