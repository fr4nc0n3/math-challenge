import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    Text,
    TextInput as TextInputPaper,
} from "react-native-paper";

type QuizTemplateProps = {
    quiz: string;
    solution: string;
    onChangeQuiz: () => void;
};

export const QuizTemplate = ({
    onChangeQuiz,
    quiz,
    solution,
}: QuizTemplateProps) => {
    const [userText, setUserText] = useState<string>("");
    const [right, setRight] = useState<boolean | null>(null);

    useEffect(() => {
        if (right === null) return;

        const timer = setTimeout(() => {
            setRight(null);
        }, 2000);

        return () => clearTimeout(timer);
    }, [right]);

    const check = () => {
        setRight(solution === userText);
    };

    const clearUserText = () => {
        setUserText("");
    };

    const confirmDone = () => {
        check();
        clearUserText();
        onChangeQuiz();
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 24,
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
