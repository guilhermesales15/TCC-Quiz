import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function DashBoard() {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    console.log("Tentando fazer logout..."); // Mensagem de log para depuração
    await signOut();
    console.log("Logout concluído."); // Mensagem de log para depuração
    // Redirecione ou atualize a interface do usuário após o logout, se necessário.
  };

  return (
    <View>
      <Text>Nada aqui ainda :)</Text>
      <Button
        title="Sair"
        onPress={handleSignOut}
      />
    </View>
  );
}
