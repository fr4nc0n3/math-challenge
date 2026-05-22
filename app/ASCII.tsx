import { ASCII_MAP, ASCIICharValue } from "@/services/ASCIIMap";
import { getRandomBoolean, getRandomInt } from "@/services/Utils";
import * as React from "react";
import { useState } from "react";

import { QuizTemplate } from "@/components/QuizTemplate";

const getRandomASCII = () => {
    return ASCII_MAP[getRandomInt(ASCII_MAP.length)];
};

export default function ASCIIQuizScreen() {
    const [charToValue, setCharToValue] = useState<boolean>(getRandomBoolean());
    const [randomASCII, setRandomASCII] =
        useState<ASCIICharValue>(getRandomASCII());

    const changeQuiz = () => {
        setCharToValue(getRandomBoolean());
        setRandomASCII(getRandomASCII());
    };

    const quiz: string = charToValue
        ? randomASCII.char
        : `(ASCII) ${randomASCII.value}`;
    const solution: string = charToValue
        ? randomASCII.value.toString()
        : randomASCII.char;

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
