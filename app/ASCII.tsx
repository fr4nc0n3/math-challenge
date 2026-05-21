import { ASCII_MAP, ASCIICharValue } from "@/services/ASCIIMap";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    Text,
    TextInput as TextInputPaper,
} from "react-native-paper";

const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
};

const getRandomBoolean = () => {
    return Math.random() < 0.5;
};

const getRandomASCII = () => {
    return ASCII_MAP[getRandomInt(ASCII_MAP.length)];
};

export default function ASCIIScreen() {
    const [charToValue, setCharToValue] = useState<boolean>(getRandomBoolean());
    const [randomASCII, setRandomASCII] =
        useState<ASCIICharValue>(getRandomASCII());
    const [userText, setUserText] = useState<string>("");
    const [right, setRight] = useState<boolean | null>(null);

    useEffect(() => {
        if (right === null) return;

        const timer = setTimeout(() => {
            setRight(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [right]);

    const quiz: string = charToValue
        ? randomASCII.char
        : `(ASCII) ${randomASCII.value}`;
    const solution: string = charToValue
        ? randomASCII.value.toString()
        : randomASCII.char;

    const check = () => {
        setRight(solution.trim() === userText.trim());
    };

    const changeQuiz = () => {
        setCharToValue(getRandomBoolean());
        setRandomASCII(getRandomASCII());
    };

    const clearUserText = () => {
        setUserText("");
    };

    const confirmDone = () => {
        check();
        clearUserText();
        changeQuiz();
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    {right !== null && (
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: right ? "green" : "red",
                            }}
                        >
                            {right ? "Corretto" : "Sbagliato"}
                        </Text>
                    )}

                    <Text variant="bodyLarge" style={styles.description}>
                        {quiz}
                    </Text>

                    <TextInputPaper
                        value={userText}
                        onChangeText={(txt) => setUserText(txt)}
                        placeholder="Scrivi qui..."
                        returnKeyType="done"
                        onSubmitEditing={() => confirmDone()}
                        submitBehavior="submit"
                    />

                    <Button
                        mode="contained"
                        onPress={() => confirmDone()}
                        style={styles.button}
                    >
                        Conferma
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: "100%",
        maxWidth: 420,
        borderRadius: 20,
        paddingVertical: 12,
    },
    title: {
        textAlign: "center",
        marginBottom: 12,
        fontWeight: "700",
    },
    description: {
        textAlign: "center",
        marginBottom: 24,
        opacity: 0.7,
        lineHeight: 22,
    },
    button: {
        marginTop: 8,
    },
});
