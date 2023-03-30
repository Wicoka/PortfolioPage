module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1f242d",
          second: "#323946"
        },
        neutral: { white: "#FFFFFF" },
        'custom-blue': {
          DEFAULT: "#00eeff"
        }
      },
      textColor: {
        white: "#FFF",
        black: "#000",
      },
    },
  },
  plugins: [],
};
