import qrcode from "qrcode"; // Assuming you're using a library like 'qrcode' to generate QR codes

async function generateQRCodeBase64(publicKey, message, signature) {
  try {
    const data = {
      pu: publicKey,
      randomString: message,
      sig: signature,
    };
    
    const url = await qrcode.toDataURL(JSON.stringify(data));
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:", url)
    return url;
  } catch (e) {
    console.log(e);
  }
}

export default generateQRCodeBase64;
