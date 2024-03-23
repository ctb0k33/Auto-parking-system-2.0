const PATCH_API = (carNumber) => {
  return {
    updateParking: `/parking/${carNumber}`,
  };
};

export default PATCH_API;
