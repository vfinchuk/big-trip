export const getFilters = () => {
  return [
    {
      title: `Everything`,
      isChecked: true,
    },
    {
      title: `Future`,
      isChecked: false,
    },
    {
      title: `Past`,
      isChecked: false,
    }
  ];
};
