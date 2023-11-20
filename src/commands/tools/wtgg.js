const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wtgg")
        .setDescription("wtgg"),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `wtgg!`;
        await interaction.editReply({
            content: newMessage
        })
    }
}