const carPlateRegex = /^[A-Z]{1,2}-\d{1,4}\s[A-Z]{1,2}$/;
const motorcyclePlateRegex = /^[A-Z]{1,2}-[A-Z]\d-\d{1,3}$/;

const checkVehicleType = (plate) => {
  if (carPlateRegex.test(plate)) {
    return "car";
  }
  if (motorcyclePlateRegex.test(plate)) {
    return "motorcycle";
  }
  return "unknown";
};

const calculateFee = (vehicleType) => {
    let fee=0
    if(vehicleType==="car"){
        fee+=3
    }
    else if(vehicleType==="motorcycle"){
        fee+=1
    }

    return fee
}

export { checkVehicleType, calculateFee };