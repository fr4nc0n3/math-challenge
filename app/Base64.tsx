import { ASCIICharValue } from "@/services/ASCIIMap";
import { getRandomBoolean, getRandomInt } from "@/services/Utils";
import * as React from "react";
import { useState } from "react";

import { QuizTemplate } from "@/components/QuizTemplate";
import { BASE64_MAP } from "@/services/Base64Map";

const getRandomBase64 = () => {
    return BASE64_MAP[getRandomInt(BASE64_MAP.length)];
};

export default function ASCIIQuizScreen() {
    const [charToValue, setCharToValue] = useState<boolean>(getRandomBoolean());
    const [randomBase64, setRandomBase64] =
        useState<ASCIICharValue>(getRandomBase64());

    const changeQuiz = () => {
        setCharToValue(getRandomBoolean());
        setRandomBase64(getRandomBase64());
    };

    const quiz: string = charToValue
        ? randomBase64.char
        : `(Base64) ${randomBase64.value}`;
    const solution: string = charToValue
        ? randomBase64.value.toString()
        : randomBase64.char;

    return (
        <QuizTemplate
            quiz={quiz}
            solution={solution}
            onChangeQuiz={() => {
                changeQuiz();
            }}
        />
    );
}
