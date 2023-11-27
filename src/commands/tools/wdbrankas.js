const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Brankas = require("../../schemas/brankas");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wd-brankas")
    .setDescription("Withdraw barang brankas White Tiger Sadulur")
    // buatkan 2 option
    .addStringOption((option) =>
      option
        .setName("barang")
        .setDescription(
          "Pilih barang yang akan di withdraw (terdapat 47+ barang)"
        )
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option.setName("jumlah").setDescription("Jumlah withdraw barang").setRequired(true)
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const barangArray = await Brankas.find();
    const choices = barangArray.map((barang) => barang.barang);
    const filtered = choices
      .filter(
        (choice) =>
          choice.startsWith(focusedValue) && choice.length > focusedValue.length
      )
      .slice(0, 25); // Take the first 25 items
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction, client) {
      let barang = interaction.options.getString("barang");
      let jumlah = interaction.options.getString("jumlah");

      try {
        // Cari data brankas di database
        let brankasData = await Brankas.findOne({ barang: barang });

        if (!brankasData) {
          return interaction.reply({
            content: `Barang ${barang} tidak ditemukan di database.`,
            ephemeral: true,
          });
        }

        // tambahkan jumlah barang
        brankasData.jumlah = parseInt(brankasData.jumlah) - parseInt(jumlah);
        await brankasData.save();

        console.log(brankasData);

        const embed = new EmbedBuilder()
          .setTitle("WD Brankas - White Tiger Sadulur")
          .setDescription(
            `> **Data Withdraw Brankas**\n> - User: <@${interaction.user.id}> \n> - Barang : ${barang}\n> - Jumlah : ${jumlah}`
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
            content: `Berhasil melakukan withdraw ${jumlah} ${barang}`,
            ephemeral: true,
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
        console.error("Error during withdraw: ", error);
        await interaction.reply({
          content: `Terjadi kesalahan saat melakukan withdraw!`,
        });
      }
  },
};
