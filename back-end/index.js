import express from "express";
import "./config/mongo.js";
import { v4 as uuidv4 } from "uuid";
import qrcode from "qrcode";
import OnetimeQrModel from "./models/OnetimeQr.js";
import ParkingModel from "./models/Parking.js";
import UserModel from "./models/User.js";
import CommentModel from "./models/Comment.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/createQr", async (req, res) => {
  try {
    const { publicKey, carNumber } = req.body;
    console.log(req.body);

    const qrCode = {
      id: uuidv4(),
      publicKey,
      carNumber,
    };

    await OnetimeQrModel.create(qrCode);

    qrcode.toDataURL(JSON.stringify(qrCode), (err, url) => {
      if (err) {
        console.error("Error generating QR code", err);
        return res.status(500).send("Error generating QR code");
      }
      res.status(200).json({ qrCode: url });
    });
  } catch (error) {
    console.error("Error in /create1qr route", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/checkQr", async (req, res) => {
  try {
    const { qrCode } = req.body;
    const qr = await OnetimeQrModel.findOne;
  } catch (error) {
    console.error("Error in /checkQr route", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/createAcccount", async (req, res) => {
  try {
    const { publickey } = req.body;
    await UserModel.create({
      publickey,
    });
    qrcode.toDataURL(JSON.stringify(publickey), (err, url) => {
      if (err) {
        console.error("Error generating QR code", err);
        return res.status(500).send("Error generating QR code");
      }
      res.status(200).json({ qrCode: url });
    });
  } catch (error) {
    console.error("Error in /createAccount route", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/deleteQr/:carNumber", async (req, res) => {
  try {
    const { carNumber } = req.params;
    await OnetimeQrModel.deleteOne({ carNumber });
    res.status(200).send("Deleted");
  } catch (error) {
    console.error("Error in /deleteQr route", error);
    res.status(500).send("Internal Server Error");
  }
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

app.get("/parking/:id", async (req, res) => {
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

app.get("/1qr", async (req, res) => {
  try {
    const qr = await OnetimeQrModel.find();
    res.status(200).json(qr);
  } catch (error) {
    console.error("Error in /1qr route", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
