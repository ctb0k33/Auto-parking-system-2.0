import nacl from "tweetnacl";
import bs58 from "bs58";

/**
 * Decrypts the given encrypted data using the provided nonce and shared secret.
 * The data is expected to be in Base58 encoding. It uses the `nacl.box.open.after`
 * method for decryption, which is suitable for decrypting data encrypted with
 * NaCl's public key encryption system. The function assumes that the encrypted data,
 * once decrypted, is a JSON string that needs to be parsed into an object.
 * 
 * @param {string} data - The encrypted data in Base58 encoding.
 * @param {string} nonce - The nonce in Base58 encoding, used during the encryption process.
 * @param {Uint8Array} sharedSecret - The shared secret (Uint8Array) used for decryption.
 * @returns {Object} The decrypted data as a JavaScript object.
 * @throws {Error} Throws an error if the shared secret is not provided or if the data cannot be decrypted.
 */
export const decryptPayload = (
  data,
  nonce,
  sharedSecret
) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const decryptedData = nacl.box.open.after(
    bs58.decode(data),
    bs58.decode(nonce),
    sharedSecret
  );
  if (!decryptedData) {
    throw new Error("Unable to decrypt data");
  }
  return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
};
