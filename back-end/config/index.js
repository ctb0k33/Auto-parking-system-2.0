import dotenv from "dotenv";
dotenv.config();

const config = {
  db: {
    url: process.env.MONGODB_URL,
    name: "parkingdb",
  },
};
console.log("config: ",config);
export default config;
