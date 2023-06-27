module.exports = {
    "src/**/!(*.min).js": [
        "eslint --fix",
        "prettier --write"
    ],
    "src/**/*.{ts,tsx}": [
        "eslint --fix",
        "prettier --write"
    ],
    "src/**/*.{css,less}": [
        "prettier --write"
    ]
}