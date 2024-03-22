const DELETE_API = (carNumber ) => {
  return {
    deleteOneTimeQr: `/qr/${carNumber}`,
  };
};

export default DELETE_API;
