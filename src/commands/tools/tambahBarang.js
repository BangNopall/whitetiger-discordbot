const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Brankas = require("../../schemas/brankas");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tambah-barang")
    .setDescription("Tambah barang ke daftar item untuk dp-wd barang")
    // buatkan 2 option
    .addStringOption((option) =>
      option
        .setName("kategori")
        .setDescription("Pilih kategori barang yang akan ditambahkan")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option.setName("barang").setDescription("Masukan nama barang")
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = [
      "Barang Disnaker",
      "Barang Haram",
      "Senjata",
      "Peluru",
    ];
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
      const kategori = interaction.options.getString("kategori");
      const barang = interaction.options.getString("barang");

      // mengecek apakah nama barang sudah ada di database
      const barangArray = await Brankas.find();
      const barangList = barangArray.map((barang) => barang.barang);
      if (barangList.includes(barang)) {
        return interaction.reply({
          content: "Nama barang sudah ada di database.",
          ephemeral: true,
        });
      }

      const newbarang = new Brankas({
        _id: new mongoose.Types.ObjectId(),
        barang: barang,
        jumlah: "0",
        kategori: kategori,
      });

      try {
        await newbarang.save();
        console.log("Data brankas berhasil disimpan ke database.");
      } catch (error) {
        console.error(
          "Gagal menyimpan data brankas ke database:",
          error
        );
        return interaction.reply({
          content:
            "Terjadi kesalahan saat menyimpan data ke database.",
          ephemeral: true,
        });
      }

      const embed = new EmbedBuilder()
          .setDescription(
            `> **${barang}** berhasil ditambahkan ke daftar item brankas`
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
