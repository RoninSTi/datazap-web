const humanFileSize = (size: number): string => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return `${+(size / 1024 ** i).toFixed(2) * 1} ${
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }`;
};

export { humanFileSize };
