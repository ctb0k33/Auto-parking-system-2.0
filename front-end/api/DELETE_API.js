const DELETE_API = (carNumber ) => {
  return {
    deleteParking: `/parking/${carNumber}`,
  };
};

export default DELETE_API;
