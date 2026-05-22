//da 0 a max
export const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * max);
};

export const getRandomBoolean = () => {
    return Math.random() < 0.5;
};
