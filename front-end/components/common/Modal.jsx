import {
  Modal as RNModal,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Text
} from "react-native";

export const Modal = ({ isOpen, withInput, children, ...rest }) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={styles.keyBoard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.keyBoard}>{children}</View>
  );
  return (
    <RNModal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      {...rest}
    >
      {content}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  keyBoard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    backgroundColor: "rgba(35, 45, 53, 0.4)",
  },
});
