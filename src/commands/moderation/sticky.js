const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  Events,
} = require("discord.js");
const Sticky = require("../../schemas/sticky");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sticky")
    .setDescription("Membuat sticky message di channel yang ditentukan")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Pesan yang ingin dijadikan sticky")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("count")
        .setDescription("Jumlah frekuensi pesan untuk sticky")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),
  async execute(interaction, client) {
    let string = interaction.options.getString("message");
    let ammout = interaction.options.getNumber("count") || 6;

    string = string.replace(/\\n/g, "\n");

    const embed = new EmbedBuilder()
      .setColor("White")
      .setDescription(string)
      .setFooter({ text: "White Tiger Sadulur • Sticky Message" });

    try {
      const data = await Sticky.findOne({ ChannelID: interaction.channel.id });

      if (!data) {
        let msg = await interaction.channel.send({ embeds: [embed] });

        await Sticky.create({
          ChannelID: interaction.channel.id,
          Message: string,
          MaxCount: ammout,
          LastMessageID: msg.id,
        });

        return await interaction.reply({
          content: "Sticky message berhasil dibuat",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content:
            "Sticky message sudah ada di channel ini, gunakan /unstick untuk menghapus, dan coba lagi!",
          ephemeral: true,
        });
      }
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "Terjadi kesalahan saat mencari sticky message",
        ephemeral: true,
      });
    }
  },
};
