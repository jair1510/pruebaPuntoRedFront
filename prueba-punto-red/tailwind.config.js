/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // <- Esto le dice a Tailwind que busque clases en tu React
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
