import { Link } from "expo-router";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Link href={"/game-reflexes"}>Gioco aritmetica</Link>
            <Divider style={{ margin: 10 }} />
            <Link href={"/ASCII"}>ASCII</Link>
        </View>
    );
}
