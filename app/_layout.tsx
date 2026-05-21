import { Stack } from "expo-router";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
    return (
        <PaperProvider theme={MD3DarkTheme}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: MD3DarkTheme.colors.background,
                    },
                    headerTintColor: "#fff",
                    contentStyle: {
                        backgroundColor: MD3DarkTheme.colors.background,
                    },
                }}
            ></Stack>
        </PaperProvider>
    );
}
