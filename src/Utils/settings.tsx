export const getSettings = () => {
  const values = localStorage.getItem("RivestreamSettings");
  return values ? JSON.parse(values) : {};
};

export const setSettings = ({ values }: any) => {
  localStorage.setItem("RivestreamSettings", JSON.stringify(values));
};
