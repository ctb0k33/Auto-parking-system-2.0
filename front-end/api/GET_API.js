const GET_API = (id) => {
  return {
    getAllParking:"/parking",
    getParkingRegisted: `/parkingRegisted/${id}`,
    getParkingOwner:`/parkingOwner/${id}`,
    getParking: `/parking/${id}`,
    getAllOwnedParking:`parking/owned/${id}`
  };
};

export default GET_API;
