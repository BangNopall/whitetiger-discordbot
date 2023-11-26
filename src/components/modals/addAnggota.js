const { EmbedBuilder, ComponentType } = require("discord.js");

module.exports = {
  data: {
    name: "test",
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("Tambah Anggota - White Tiger Pandawa")
      .setDescription(
        `Nama IC: ${interaction.fields.getTextInputValue(
          "nama"
        )}\nSteam Hex : ${interaction.fields.getTextInputValue("steamhex")}`
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

    await interaction.reply({
        embeds: [embed],
    })
  },
};
