const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Keuangan = require("../../schemas/keuangan");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wd-uangputih")
    .setDescription("Withdraw Uang Putih White Tiger Sadulur")
    // buatkan 2 option
    .addStringOption((option) =>
      option
        .setName("jumlah")
        .setDescription("Jumlah withdraw")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const uangputih = interaction.options.getString("jumlah");
    try {
      // Cari data keuangan di database
      let keuanganData = await Keuangan.findOne();

      // Jika data tidak ditemukan, inisiasi nilai data ke 0 sebagai default
      if (!keuanganData)
        keuanganData = await new Keuangan({
          _id: new mongoose.Types.ObjectId(),
          uangPutih: "0",
          uangMerah: "0",
        });
      await keuanganData.save();

      // Tambahkan jumlah deposit ke uangPutih dan simpan ke database
      keuanganData.uangPutih = (
        parseInt(keuanganData.uangPutih) - parseInt(uangputih)
      ).toString();
      await keuanganData.save();
      // tampilkan pesan berhasil

      console.log(keuanganData);

      // membuat embed
      const embed = new EmbedBuilder()
        .setTitle("Keuangan - White Tiger Sadulur")
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
          text: "White Tiger Sadulur",
        });

      if (interaction.member.roles.cache.has("1155443652911452252")) {
        await interaction.reply({
          content: `Berhasil melakukan withdraw $${uangputih} uang putih`,
        });

        await interaction.followUp({
          embeds: [embed],
        });
      } else {
        await interaction.reply({
          content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Error during deposit: ", error);
      await interaction.reply({
        content: `Terjadi kesalahan saat melakukan withdraw!`,
      });
    }
  },
};
