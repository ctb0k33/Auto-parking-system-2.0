import nacl from "tweetnacl";
/**
 * 
 * @param {any} payload 
 * @param {?Uint8Array} sharedSecret 
 * @returns 
 */
export const encryptPayload = (payload, sharedSecret) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const nonce = nacl.randomBytes(24);

  const encryptedPayload = nacl.box.after(
    Buffer.from(JSON.stringify(payload)),
    nonce,
    sharedSecret
  );

  return [nonce, encryptedPayload];
};