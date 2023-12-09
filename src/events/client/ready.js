const { Events } = require("discord.js");
const Sticky = require("../../schemas/sticky");


module.exports = {
    name : "ready",
    once : true,
    async execute(client){
        setInterval(client.pickPresence, 10 * 1000);
        console.log(`Logged in as ${client.user.tag}!`);
    }
}