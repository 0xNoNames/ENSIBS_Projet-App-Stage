module.exports = {
    mode: "jit",
    purge: ["frontend/*.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                green: {
                    "ensibs-light": "#dee686",
                    ensibs: "#a9c332",
                    "ensibs-dark": "#608a3c"
                }
            }
        }
    }
};