const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kota")
    .setDescription("gerbang kota!"),
  async execute(interaction, client) {
    const button = new ButtonBuilder()
      .setLabel(`Masuk Kota!`)
      .setStyle(ButtonStyle.Link)
      .setURL(`https://cfx.re/join/zzgj99`);

    if (interaction.member.roles.cache.has("1155443652911452252")) {
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(button)],
      });
    } else {
      await interaction.reply({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
        ephemeral: true,
      });
    }
  },
};
