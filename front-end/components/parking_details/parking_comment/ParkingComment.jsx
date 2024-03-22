import { View, Text, ScrollView, Image, FlatList } from "react-native";
import { styles } from "./parkingComment.style";
export default function ParkingComment(comments) {
  const starIcon = require("../../../assets/icons/star.png");
  const commentList = comments.comments;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      <View>
        <FlatList
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          data={commentList}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={{ fontWeight: "bold" }}>{item.content}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  transform: [{ translateX: -6 }],
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image source={starIcon} style={styles.starIcon} />
                  <Text style={{ color: "#008DDA", fontWeight: "bold" }}>
                    {item.rating}
                  </Text>
                  <Text style={styles.blur}>/ 5</Text>
                </View>

                <Text style={styles.blur}>{item.userName}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}
