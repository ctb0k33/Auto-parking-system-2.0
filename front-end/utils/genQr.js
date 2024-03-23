import qrcode from "qrcode"; // Assuming you're using a library like 'qrcode' to generate QR codes

function generateQRCodeBase64(publicKey, message, signature) {
  const data = {
    pu: publicKey,
    randomString: message,
    sig: signature,
  };

  return new Promise((resolve, reject) => {
    qrcode.toDataURL(JSON.stringify(data), (err, url) => {
      if (err) {
        console.error("Error generating QR code", err);
        reject(err);
      } else {
        // Convert the data URL to base64
        const base64 = url.split(",")[1];
        resolve(base64);
      }
    });
  });
}


export default generateQRCodeBase64;
