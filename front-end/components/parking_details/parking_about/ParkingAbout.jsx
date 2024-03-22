import { Image, Text, View } from "react-native";
import { styles } from "./parkingAbout.style";
export default function ParkingAbout({
  ownerName,
  fare,
  maximumCapacity,
  service,
}) {
  const likeIcon = require("../../../assets/icons/like.png");
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Text style={styles.title}>Detail information</Text>
        <Text>{"Owner: " + ownerName}</Text>
        {/* <Text>{"Public key: " + publicKey}</Text> */}
        <Text>{"Fare: " + fare}</Text>
        <Text>{"Maximum: " + maximumCapacity}</Text>
      </View>
      <View style={styles.service}>
        {service.length > 0 &&
          service.map((item, index) => {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  backgroundColor: "#b8d4b2",
                  padding: 6,
                  borderRadius: 15,
                  alignItems: "center",
                }}
                key={index}
              >
                <Image source={likeIcon} style={styles.likeIcon} />
                <Text style={{ color: "#37592f", fontWeight: "bold" }}>
                  {item}
                </Text>
              </View>
            );
          })}
      </View>
    </View>
  );
}
