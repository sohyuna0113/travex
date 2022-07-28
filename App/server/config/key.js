if (process.env.NODE_ENV === "production") {
    // Deployment Mode
    module.exports = require("./production.js")
} else {
    // Development Mode
    module.exports = require("./dev.js")
}