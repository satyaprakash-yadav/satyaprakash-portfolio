export const fadeIn = (delay: number) => {
    return {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay,
                duration: 0.5,
            }
        }
    };
};

export const slideInFromTop = (delay: number) => {
    return {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay,
                duration: 0.5,
            }
        }
    };
};

export const slideInFromBottom = (delay: number) => {
    return {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay,
                duration: 0.5,
            }
        }
    };
};

export const slideInFromLeft = (delay: number) => {
    return {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay,
                duration: 0.5,
            }
        }
    };
};

export const slideInFromRight = (delay: number) => {
    return {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay,
                duration: 0.5,
            }
        }
    };
};
