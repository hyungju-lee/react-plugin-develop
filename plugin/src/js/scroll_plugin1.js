/* eslint-disable */
new section("#scroll-interaction-0", 7);
new element("#scroll-interaction-0", "#txt-0", {
    acc: 0.1,
    change: {
        transform: [
            {
                effect: "translateX",
                unit: "px",
                keyframe: {
                    point: [0.1, 0.5, 0.7, 0.9],
                    value: [0, 100, 150, 120]
                },
            },
            {
                effect: "translateY",
                unit: "%",
                keyframe: {
                    point: [0.1, 0.5, 0.7, 0.9],
                    value: [0, -100, -150, -120]
                },
            },
            {
                effect: "scale",
                unit: "",
                keyframe: {
                    point: [0.3, 0.8, 1],
                    value: [1, 1.4, 0.4],
                }
            },
            {
                effect: "rotate",
                unit: "deg",
                keyframe: {
                    point: [0.1, 0.2, 1],
                    value: [0, 30, -75],
                }
            },
            {
                effect: "skewX",
                unit: "deg",
                keyframe: {
                    point: [0.1, 0.2, 1],
                    value: [0, 30, -75],
                }
            },
            {
                effect: "skewY",
                unit: "deg",
                keyframe: {
                    point: [0.2, 0.5, 1],
                    value: [0, -30, 40],
                }
            },
        ]
    },
});