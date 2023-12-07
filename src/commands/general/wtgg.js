const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("wtgg").setDescription("wtgg"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `wtgg!`;
    if (interaction.member.roles.cache.has("1155443652911452252")) {
      await interaction.editReply({
        content: newMessage,
      });
    } else {
      await interaction.reply({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
        ephemeral: true,
      });
    }
  },
};
