import express from "express";
import "./config/mongo.js";
import { v4 as uuidv4 } from "uuid";
import qrcode from "qrcode";
import OnetimeQrModel from "./models/OnetimeQr.js";
import ParkingModel from "./models/Parking.js";
import UserModel from "./models/User.js";
import { checkVehicleType, calculateFee } from "./utils/fee.js";
import cors from "cors";
const app = express();
const port = 3000;
import verify from "./utils/verify.js";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: true, credentials: true}));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/parking", async (req, res) => {
  try {
    const parking = await ParkingModel.find();
    res.status(200).json(parking);
  } catch (error) {
    console.error("Error in /parking route", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/parkingRegisted/:id", async (req, res) => {
  try {
    const parkingRegistered = await UserModel.find({
      _id: req.params.id,
    }).populate("registerPark");
    res.status(200).json(parkingRegistered);
  } catch (error) {
    console.error("Error in /parking route", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("parkingOwner/:id", async (req, res) => {
  try {
    const parkingOwner = await UserModel.find({
      _id: req.params.id,
    }).populate("parkingOwner");
    res.status(200).json(parkingOwner);
  } catch (error) {
    console.error("Error in /parkingOwner route", error);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/check", async (req, res) => {
  try {
    const { qrCode } = req.body;
    if(!verify(qrCode.msg,qrCode.sig,qrCode.pu)) {
      res.status(400).send("invalid ")
    }
    const fee = calculateFee(checkVehicleType(qr.carNumber));
    res.status(200).json({ fee: fee });
  } catch (error) {
    console.error("Error in /checkQr route", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/account", async (req, res) => {
  try {
    const { publickey } = req.body;

    let tmp_user = await UserModel.findOne({ publickey: publickey });
    let randomString = uuidv4();
    let data = {
      publickey: publickey,
      randomString: null,
    };
    if (!tmp_user) {
      console.log("user not found");

      await UserModel.create({
        publickey: publickey,
        randomString: randomString,
      });

      data.randomString = randomString;
      qrcode.toDataURL(JSON.stringify(data), (err, url) => {
        if (err) {
          console.error("Error generating QR code", err);
          return res.status(500).send("Error generating QR code");
        }
        res.status(200).json({ qrCode: url });
      });
    } else {
      console.log("user found");
      data.randomString = tmp_user.randomString;
      qrcode.toDataURL(JSON.stringify(data), (err, url) => {
        if (err) {
          console.error("Error generating QR code", err);
          return res.status(500).send("Error generating QR code");
        }
        res.status(200).json({ qrCode: url });
      });
    }
  } catch (error) {
    console.error("Error in /createAccount route", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("createParking", async (req, res) => {
  try {
    const { name, address, owner } = req.body;
    let user = await UserModel.findOne({ publickey: owner });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const parking = await ParkingModel.create({
      name,
      address,
      owner: user._id,
    });

    user.parkingOwner = parking._id;
    await user.save();

    res.status(200).json(parking);
  } catch (error) {
    console.error("Error in /createParking route", error);
    res.status(500).send("Internal Server Error");
  }
});



app.delete("/qr/:carNumber", async (req, res) => {
  try {
    const { carNumber } = req.params;
    await OnetimeQrModel.deleteOne({ carNumber });
    res.status(200).send("Deleted");
  } catch (error) {
    console.error("Error in /deleteQr route", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
