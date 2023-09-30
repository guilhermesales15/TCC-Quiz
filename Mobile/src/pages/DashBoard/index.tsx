import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function DashBoard() {
  const {signOut} = useContext(AuthContext)

  return (
    <View>
      <Text>Nada aqui ainda :)</Text>
      <Button
        title="Sair"
        onPress={signOut}
      />
    </View>
  );
}
