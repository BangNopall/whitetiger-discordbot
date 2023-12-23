const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Brankas = require("../../schemas/brankas");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("brankas")
    .setDescription("Brankas White Tiger Sadulur"),
  async execute(interaction, client) {
    interaction.reply({
      content: "Menampilkan Brankas White Tiger Sadulur...",
      ephemeral: true,
    });
    // Mengambil nama2 barang dengan kategori barang disanker dan di looping datanya di embed untuk ditampilkan
    const disnakerArray = await Brankas.find({ kategori: "Barang Disnaker" });
    const barhamArray = await Brankas.find({ kategori: "Barang Haram" });
    const senjataArray = await Brankas.find({ kategori: "Senjata" });
    const peluruArray = await Brankas.find({ kategori: "Peluru" });

    const disnakerList = disnakerArray
      .map((barang) => `> - ${barang.barang} : ${barang.jumlah}`)
      .join("\n");
    const barhamList = barhamArray
      .map((barang) => `> - ${barang.barang} : ${barang.jumlah}`)
      .join("\n");
    const senjataList = senjataArray
      .map((barang) => `> - ${barang.barang} : ${barang.jumlah}`)
      .join("\n");
    const peluruList = peluruArray
      .map((barang) => `> - ${barang.barang} : ${barang.jumlah}`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle("Brankas - White Tiger Sadulur")
      .setDescription(
        "> **Barang Disnaker**\n" +
          `${disnakerList || "> Tidak Ada Barang"}` +
          "\n\n> **Barang Haram**\n" +
          `${barhamList || "> Tidak Ada Barang"}` +
          "\n\n> **Senjata**\n" +
          `${senjataList || "> Tidak Ada Barang"}` +
          "\n\n> **Peluru**\n" +
          `${peluruList || "> Tidak Ada Barang"}` +
          ""
      )
      .setColor("ffffff")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&"
      )
      .setTimestamp(Date.now())
      .setFooter({
        iconURL:
          "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
        text: "White Tiger Sadulur",
      });

      const msg = await interaction.channel.send({embeds: [embed]});

    // hanya role tertentu yang dapat mengakses
    if (interaction.member.roles.cache.has("1155443652911452252")) {
      msg
    } else {
      return interaction.channel.send({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
        ephemeral: true,
      });
    }

    const interval = setInterval( async () => {
      const disnakerArray = await Brankas.find({ kategori: "Barang Disnaker" });
      const barhamArray = await Brankas.find({ kategori: "Barang Haram" });
      const senjataArray = await Brankas.find({ kategori: "Senjata" });
      const peluruArray = await Brankas.find({ kategori: "Peluru" });

      const disnakerList = disnakerArray
        .map((barang) => `> - ${barang.barang} : ${barang.jumlah}`)
        .join("\n");
      const barhamList = barhamArray
        .map((barang) => `> - ${barang.barang} : ${barang.jumlah}`)
        .join("\n");
      const senjataList = senjataArray
        .map((barang) => `> - ${barang.barang} : ${barang.jumlah}`)
        .join("\n");
      const peluruList = peluruArray
        .map((barang) => `> - ${barang.barang} : ${barang.jumlah}`)
        .join("\n");

      const updatedEmbed = new EmbedBuilder()
        .setTitle("Brankas - White Tiger Sadulur")
        .setDescription(
          "> **Barang Disnaker**\n" +
            `${disnakerList || "> Tidak Ada Barang"}` +
            "\n\n> **Barang Haram**\n" +
            `${barhamList || "> Tidak Ada Barang"}` +
            "\n\n> **Senjata**\n" +
            `${senjataList || "> Tidak Ada Barang"}` +
            "\n\n> **Peluru**\n" +
            `${peluruList || "> Tidak Ada Barang"}`
        )
        .setColor("ffffff")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&"
        )
        .setTimestamp(Date.now())
        .setFooter({
          iconURL:
            "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
          text: "White Tiger Sadulur • Updated setiap 1 menit",
        });

      if (interaction.member.roles.cache.has("1155443652911452252")) {
        await msg.edit({
          embeds: [updatedEmbed],
        })
      }
    }, 5000);
    // hanya role tertentu yang dapat mengakses
    if (!interaction.member.roles.cache.has("1155443652911452252")) {
      return interaction.reply({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
        ephemeral: true,
      });
    }
  },
};
