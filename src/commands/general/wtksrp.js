const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wtksrp")
    .setDescription("Informasi WT-KSRP Discord Bot"),
  async execute(interaction, client) {
    // yang diperbolehkan hanya role dengan id tertentu
    const embed = new EmbedBuilder()
      .setTitle("White Tiger - Sadulur")
      .setDescription(
        "WT-KSRP Adalah discord bot official dari White Tiger Sadulur yang dikembangkan oleh Noxvall <@685664045172654082>. Memberikan kemudahan untuk mengelola dan mengatur berbagai menejemen kota dengan berbagai command."
      )
      .setColor("ffffff")
      .setThumbnail(
        "https://media.discordapp.net/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=657ec15a&is=656c4c5a&hm=d1772ffb0b014d7169dec2f63d9dcb0fbf9a0a7dcede8fbe145b471607ee890d&=&format=webp&quality=lossless&width=662&height=662"
      )
      .setTimestamp(Date.now())
      .setFooter({
        iconURL:
          "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
        text: "White Tiger Sadulur",
      })
      .setImage(
        "https://cdn.discordapp.com/attachments/1002811461921415193/1181118714217766963/image.png?ex=657fe585&is=656d7085&hm=96d02da462ccdd23d859275dfc3e7a7009a560b796206a8a6ff4a711ce549be0&"
      )
      .addFields(
        {
          name: "> Connect",
          value: "- [Masuk Kota](https://cfx.re/join/zzgj99)",
          inline: true,
        },
        {
          name: "> DC KSRP",
          value: "- [SadulurRP](https://discord.gg/sadulurrp)",
          inline: true,
        },
        {
          name: "> DC WT",
          value: "- [WhiteTiger](https://discord.gg/whitetiger)",
          inline: true,
        },
        { name: "> Ping", value: `- ${client.ws.ping} ms`, inline: true },
        { name: "> Version", value: "- 1.2.2", inline: true },
        { name: "> Prefix", value: "- /", inline: true }
      );

    // hanya role tertentu yang dapat mengakses
    if (interaction.member.roles.cache.has("1155443652911452252"))
      return interaction.reply({
        embeds: [embed],
      });
    else {
      await interaction.reply({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
        ephemeral: true,
      });
    }
  },
};
