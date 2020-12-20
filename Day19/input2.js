var exampleRules1 = {
0: [4, 1, 5],
1: [2, 3, '|', 3, 2],
2: [4, 4, '|', 5, 5],
3: [4, 5, '|', 5, 4],
4: ["a"],
5: ["b"]
};

var exampleRules2 = {
    0: [1, 2],
    1: ["a"],
    2: [1, 3, '|', 3, 1],
    3: ["b"]
    };

var exampleRules3 = {
    0: [1, 2, '|', 2, 1],
    1: ["a"],
    2: ["b"]
    };

var exampleRules4 = {
    0: [1, 3, 2, 1],
    1: ["a"],
    2: ["b"],
    3: [1, '|', 1, 3]
    };

try {
    module.exports = {rules: exampleRules4};
} catch (e) {}

