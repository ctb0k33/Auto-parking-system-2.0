const GET_API = (id) => {
  return {
    hello:"/",
    testGet:"/breeds/image/random",
    getAllParking:"/parking",
    getParkingRegisted: `/parkingRegisted/${id}`,
    getParkingOwner:`/parkingOwner/${id}`,

  };
};

export default GET_API;
