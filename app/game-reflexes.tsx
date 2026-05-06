import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";

type Operation = {
  a: number;
  b: number;
  operator: "+" | "-" | "×";
  result: number;
};

type PlaceholderText = "Premi invio per iniziare" | "Rispondi qui...";

const GAME_TIME = 60;
const MAX_LIVES = 3;

export default function GameReflexes() {
  const [operation, setOperation] = useState<Operation | null>(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(GAME_TIME);
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [placeholderText, setPlaceholderText] = useState<PlaceholderText>(
    "Premi invio per iniziare",
  );
  const [startGame, setStartGame] = useState(false);

  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  // genera operazione casuale
  const generateOperation = () => {
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);

    const operators: Operation["operator"][] = ["+", "-", "×"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let result = 0;

    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "×") result = a * b;

    setOperation({ a, b, operator, result });
  };

  // timer
  useEffect(() => {
    if (!startGame) {
      setPlaceholderText("Premi invio per iniziare");
      return;
    }

    setPlaceholderText("Rispondi qui...");

    generateOperation();

    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startGame]);

  const endGame = () => {
    setGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleInputSubmit = () => {
    if (startGame) {
      checkAnswer();
    } else {
      setStartGame(true);
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const checkAnswer = () => {
    if (!operation) return;

    const value = parseInt(answer);

    if (value === operation.result) {
      setScore((s) => s + 1);
    } else {
      setLives((l) => {
        const newLives = l - 1;
        if (newLives <= 0) endGame();
        return newLives;
      });
    }

    setAnswer("");
    generateOperation();
  };

  const restart = () => {
    setScore(0);
    setTime(GAME_TIME);
    setLives(MAX_LIVES);
    setGameOver(false);
    setOperation(null);
    setStartGame(false);
  };

  if (gameOver) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Game Over</Text>
        <Text style={styles.score}>Score: {score}</Text>

        <Button mode="contained" onPress={restart}>
          Gioca ancora
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        ⏱ {time}s | ❤️ {lives} | ⭐ {score}
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          {operation?.operator && (
            <Text style={styles.operation}>
              {operation?.a} {operation?.operator} {operation?.b} = ?
            </Text>
          )}

          <TextInput
            ref={inputRef}
            value={answer}
            onChangeText={setAnswer}
            keyboardType="numeric"
            placeholder={placeholderText}
            style={styles.input}
            onSubmitEditing={handleInputSubmit}
            autoFocus
          />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  card: {
    padding: 10,
  },
  operation: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
  },
});
