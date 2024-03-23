import nacl from "tweetnacl";
import bs58 from "bs58";

const verify = (msg, sig, pu) => {
  const msgUint8 = new TextEncoder().encode(msg);
  const publicKeyUint8 = bs58.decode(pu);
  const signedMessage = bs58.decode(sig);

  const hasSucceededVerification = nacl.sign.detached.verify(
    msgUint8, // the message
    signedMessage, // the signature
    publicKeyUint8 // public key
  );

  return hasSucceededVerification;
};

export default verify;
