const getToken = (key: string) => {
  const data = JSON.parse(localStorage.getItem(key) as any);
  return data;
};

export default getToken;
