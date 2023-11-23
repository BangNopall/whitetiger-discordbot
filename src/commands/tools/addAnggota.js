const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tambah-anggota")
    .setDescription("Menambahkan anggota ke dalam daftar ke anggotaan White Tiger Pandawa"),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('anggota')
      .setTitle(`Tambahkan anggota baru`);

    modal.addComponents(
      new ActionRowBuilder({
        components: [
          new TextInputBuilder()
            .setCustomId("nama")
            .setLabel("Nama IC")
            .setPlaceholder("Masukan nama IC")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        ]
      }),
      new ActionRowBuilder({
        components: [
          new TextInputBuilder()
            .setCustomId("steamhex")
            .setLabel("Steam Hex")
            .setPlaceholder("Masukan steam hex")
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
        ]
      })
    );

    await interaction.showModal(modal);
  },
};
