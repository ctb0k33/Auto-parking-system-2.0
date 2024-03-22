import { Image, View, Text, Linking } from "react-native";
import { styles } from "./parkingInformation.style";
export default function ParkingInformation({
  rating,
  address,
  commentNum,
  openTime,
}) {
  const starIcon = require("../../../assets/icons/star.png");
  const mapIcon = require("../../../assets/icons/map.png");
  const mapIcon2 = require("../../../assets/icons/map2.png");

  const redirectToGoogleMaps = () => {
    const searchQuery = encodeURIComponent(address);

    const url = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

    Linking.openURL(url).catch((err) =>
      console.error("Không thể mở URL:", err)
    );
  };

  return (
      <View style={styles.container}>
        <View style={styles.rating}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.ratingText}>{"Rating: " + rating}</Text>
            <Image source={starIcon} style={styles.starIcon} />
          </View>
          <Text style={styles.commentNum}>{commentNum + " comments"}</Text>
          <Text>{"Open Time: " + openTime}</Text>
        </View>
        <View style={styles.map}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.address}>Address</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={mapIcon} style={styles.mapIcon} />
              <Text style={styles.viewOnMap} onPress={redirectToGoogleMaps}>
                View on map
              </Text>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Image source={mapIcon2} style={styles.map2} />
            <Text style={{ marginRight: 16 }}>{address}</Text>
          </View>
        </View>
      </View>
  );
}
