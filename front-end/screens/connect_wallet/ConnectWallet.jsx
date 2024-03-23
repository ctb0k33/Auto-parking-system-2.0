import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
import * as Linking from "expo-linking";
import { React, useEffect, useState, useCallback } from "react";
import { Text, View } from "react-native";
import "react-native-get-random-values";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";
import nacl from "tweetnacl";
import Button from "../../components/common/Button";
import { buildUrl } from "../../utils/buildUrl";
import { decryptPayload } from "../../utils/decryptPayload";
import { encryptPayload } from "../../utils/encryptPayload";
import { styles } from "./ConnectWallet.style";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../../utils/axios";
import { GET_API } from "../../api";
import { POST_API } from "../../api";
import asyncStorage from "@react-native-async-storage/async-storage";
import generateQRCodeBase64 from "../../utils/genQr";
import { v4 as uuidv4 } from "uuid";
global.Buffer = global.Buffer || Buffer;

const onConnectRedirectLink = Linking.createURL("onConnect");
const onDisconnectRedirectLink = Linking.createURL("onDisconnect");
const onSignMessageRedirectLink = Linking.createURL("onSignMessage");

const connection = new Connection(clusterApiUrl("devnet"));

export default function ConnectWallet() {
  const [signMsg, setSignMsg] = useState();
  const [publicKey, setPublicKey] = useState(null);
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [sharedSecret, setSharedSecret] = useState();
  const [session, setSession] = useState();
  const [deepLink, setDeepLink] = useState("");
  const [balance, setBalance] = useState(0);
  const [storagePublicKey, setStoragePublicKey] = useState("");

  const navigation = useNavigation();
  const testAPI = async () => {
    const response = await axiosInstance.get(GET_API().testGet);
    console.log(response.data);
  };
  useEffect(() => {});
  // useEffect(() => {
  //   testAPI();
  // }, []);
  useEffect(() => {
    const initializeDeeplinks = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    };
    initializeDeeplinks();
    const listener = Linking.addEventListener("url", handleDeepLink);
    return () => {
      listener.remove();
    };
  }, []);

  const handleDeepLink = ({ url }) => {
    setDeepLink(url);
  };

  useEffect(() => {
    const saveDataInStorage = async (data) => {
      try {
        console.log("datahahahahahahaha",data)
        await asyncStorage.setItem("publicKey", data.publicKey);
        await asyncStorage.setItem("signature", data.signature);
        let randomString = uuidv4();
        const url = await generateQRCodeBase64(
          data.publicKey,
          randomString,
          data.signature
        );
        console.log("URLLLLLLLL",url)
        await asyncStorage.setItem("Private QR", url);

      } catch (e) {
        console.log(e);
      }
    };
    if (!deepLink) return;
    console.log("deepLink: ", deepLink);
    const url = new URL(deepLink);
    const params = url.searchParams;

    // Handle an error response from Phantom
    if (params.get("errorCode")) {
      const error = Object.fromEntries([...params]);
      const message =
        error?.errorMessage ??
        JSON.stringify(Object.fromEntries([...params]), null, 2);
      console.log("error: ", message);
      return;
    }

    if (/onConnect/.test(url.pathname)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")),
        dappKeyPair.secretKey
      );
      const connectData = decryptPayload(
        params.get("data"),
        params.get("nonce"),
        sharedSecretDapp
      );
      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      setPublicKey(new PublicKey(connectData.public_key));
      console.log(`connected to ${connectData.public_key.toString()}`);
      console.log(`shared secret when connect: ${sharedSecretDapp}`);
    }

    if (/onSignMessage/.test(url.pathname)) {
      setSignMsg(params.get("data"));
      const data = decryptPayload(
        params.get("data"),
        params.get("nonce"),
        sharedSecret
      );
      saveDataInStorage(data);

      console.log("============");
      console.log("data", data);
      console.log(`shared secret when sign: ${sharedSecret}`);
      // console.log(bs58.decode(params.get("data")))
    }
    if (/onDisconnect/.test(url.pathname)) {
      setPublicKey(null);
      console.log("disconnected");
    }
  }, [deepLink]);

  const connect = async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: "devnet",
      app_url: "exp://192.168",
      redirect_link: onConnectRedirectLink,
    });

    const url = buildUrl("connect", params);
    Linking.openURL(url);
  };

  const disconnect = async () => {
    const payload = {
      session,
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onDisconnectRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });
    const url = buildUrl("disconnect", params);
    Linking.openURL(url);
  };

  const updateBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  const signMessage = async () => {
    const message = uuidv4();

    const payload = {
      session,
      message: bs58.encode(Buffer.from(message)),
    };

    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignMessageRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });
    console.log("++++++++++++++++++++");
    const url = buildUrl("signMessage", params);
    Linking.openURL(url);
    // setSignMsg(url)
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("publicKey");
      if (value !== null) {
        setStoragePublicKey(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateBalance();
    retrieveData();
  }, [publicKey]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.header}>
          {publicKey || storagePublicKey ? (
            <>
              <View style={[styles.row, styles.wallet]}>
                <View style={styles.greenDot} />
                <Text
                  style={styles.text}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {`Connected to: ${publicKey.toString()}`}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.balanceText}>{`Balance: ${balance.toFixed(
                  2
                )} SOL`}</Text>
              </View>
              <View style={styles.row}>
                <Button title="Sign Message" onPress={signMessage} />
              </View>
              <Text>{signMsg}</Text>
              {/* <Text> {bs58.decode(signMsg)}</Text> */}
              <View style={styles.row}>
                <Button title="Disconnect" onPress={disconnect} />
              </View>
            </>
          ) : (
            <View style={{ marginTop: 15 }}>
              <Button title="Connect Phantom" onPress={connect} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
