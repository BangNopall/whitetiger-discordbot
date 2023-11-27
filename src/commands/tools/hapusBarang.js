const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Brankas = require("../../schemas/brankas");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hapus-barang")
    .setDescription("hapus barang ke daftar item untuk dp-wd barang")
    // buatkan 2 option
    .addStringOption((option) =>
      option
        .setName("barang")
        .setDescription("Pilih barang yang akan dihapus")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    // mengambil data barang dari database
    const barangArray = await Brankas.find();

    // looping data barang di choices autocomplete+
    const focusedValue = interaction.options.getFocused();
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
    if (interaction.member.roles.cache.has("1177816855285600296")) {
      const barang = interaction.options.getString("barang");

      try {
        await Brankas.findOneAndDelete({ barang: barang });
        console.log(`Barang ${barang} berhasil dihapus dari database.`);
      } catch (error) {
        console.error("Gagal menghapus barang dari database:", error);
        return interaction.reply({
          content: "Terjadi kesalahan saat menghapus barang dari database.",
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
          .setDescription(
            `> **${barang}** berhasil dihapus dari daftar item brankas`
          );

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

    } else {
      return interaction.reply({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini. Perintah ini masih dalam tahap pengembangan`,
        ephemeral: true,
      });
    }
  },
};
