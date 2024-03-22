import { View, ScrollView } from "react-native";
import QrDetail from "../../components/qr_components/QrDetail";

export default function Qr() {
  return (
    <ScrollView>
      <View>
        <QrDetail />
      </View>
    </ScrollView>
  );
}
