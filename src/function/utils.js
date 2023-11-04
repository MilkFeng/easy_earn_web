import * as rchainToolkit from '@fabcotech/rchain-toolkit';
import elliptic from 'elliptic';
import { sha256 } from "js-sha256";
import secp256k1 from 'secp256k1';

export const signSecp256k1 = (hash, privateKey) => {
  const ec = new elliptic.ec("secp256k1");
  const keyPair = ec.keyFromPrivate(privateKey);
  const signature = keyPair.sign(new Uint8Array(hash), {
    canonical: true,
  });
  const derSign = new Uint8Array(signature.toDER());
  if (!ec.verify(new Uint8Array(hash), signature, keyPair, "hex")) {
    throw new Error("Failed to verify signature");
  }
  return derSign;
};

export function uint8ArrayToHexString(uint8Array) {
  return Array.from(uint8Array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function hexStringToUint8Array(hexString) {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    const byte = parseInt(hexString.substr(i, 2), 16);
    bytes[i / 2] = byte;
  }
  return bytes;
}

export const toByteArray = rchainToolkit.utils.toByteArray;

export const getBlake2Hash = rchainToolkit.utils.getBlake2Hash;


export const decodeTaskContent = (content) => {
  try {
    return JSON.parse(content);
  } catch (err) {
    return {
      text: "24324234"
    }
  }
};

export const decodeRecordContent = (content) => {
  try {
    return JSON.parse(content);
  } catch (err) {
    return {
      text: "24324234"
    }
  }
};

export const sha256Hash = sha256;