/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateRows: {
                "main": "repeat(1, minmax(0, 20rem))",
            },
        },
    },
    plugins: [],
};
