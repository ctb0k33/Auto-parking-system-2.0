import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
import * as Linking from "expo-linking";
import { React, useEffect, useState } from "react";
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
global.Buffer = global.Buffer || Buffer;

const onConnectRedirectLink = Linking.createURL("onConnect");
const onDisconnectRedirectLink = Linking.createURL("onDisconnect");

const connection = new Connection(clusterApiUrl("devnet"));

export default function ConnectWallet() {
  const [publicKey, setPublicKey] = useState(null);
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [sharedSecret, setSharedSecret] = useState();
  const [session, setSession] = useState();
  const [deepLink, setDeepLink] = useState("");
  const [balance, setBalance] = useState(0);

  const navigation = useNavigation();
  const testAPI = async () => {
    const response = await axiosInstance.get(GET_API().testGet);
    console.log(response.data);
  };
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

  useEffect(() => {
    updateBalance();
  }, [publicKey]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.header}>
          {publicKey ? (
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
                <Button title="Disconnect" onPress={disconnect} />
              </View>
            </>
          ) : (
            <View style={{ marginTop: 15 }}>
              <Button title="Connect Phantom" onPress={connect} />
            </View>
          )}
        </View>
        <Button
          title="Connect Addedit"
          onPress={() => navigation.navigate("ParkingList")}
        />
        <Button
          title="Connect Parking Detail"
          onPress={() => navigation.navigate("ParkingDetail")}
        />
        <Button
          title="Connect QR Screen"
          onPress={() => navigation.navigate("Qr")}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
