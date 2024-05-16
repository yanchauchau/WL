import chroma from "chroma-js";

const originalColor = "#FF5733"; // Assuming this is the user input

// Generate lighter and darker shades
const lighterColor = chroma(originalColor).brighten().hex();
const darkerColor = chroma(originalColor).darken().hex();

// You can also generate a scale of colors
const scale = chroma.scale([originalColor, "white"]).mode("lab").colors(5); // Generates 5 colors from originalColor to white


