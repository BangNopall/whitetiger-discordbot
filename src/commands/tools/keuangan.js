const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Keuangan = require("../../schemas/keuangan");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("keuangan")
    .setDescription("Keuangan White Tiger Pandawa"),
  async execute(interaction, client) {
    let keuanganData = await Keuangan.findOne();

    const embed = new EmbedBuilder()
      .setTitle("Keuangan - White Tiger Pandawa")
      .setDescription(
        "> **Uang Putih**\n> ```" +
          `$${keuanganData.uangPutih}` +
          "``` \n\n> **Uang Merah**\n> ```" +
          `$${keuanganData.uangMerah}` +
          "```"
      )
      .setColor("ffffff")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&"
      )
      .setTimestamp(Date.now())
      .setFooter({
        iconURL:
          "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
        text: "White Tiger Pandawa",
      });

    if (interaction.member.roles.cache.has("1155443652911452252")) {
      await interaction.reply({
        embeds: [embed],
      });
    } else {
      await interaction.reply({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
        ephemeral: true,
      });
    }
  },
};
