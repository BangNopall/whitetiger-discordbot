const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const Sticky = require("../../schemas/sticky");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unstick")
    .setDescription("Menghapus sticky message di channel yang ditentukan")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),
  async execute(interaction, client) {
    const data = await Sticky.findOne({ ChannelID: interaction.channel.id });

    if (!data) {
      return await interaction.reply({
        content: "Tidak ada sticky message di channel ini",
        ephemeral: true,
      });
    } else {
      try {
        const channel = interaction.client.channels.cache.get(data.ChannelID);
        const message = await channel.messages.fetch(data.LastMessageID);
        await message.delete();
      } catch (err) {
        console.log(err);
        return;
      }
    }

    try {
      await Sticky.deleteMany({ ChannelID: interaction.channel.id });
      return await interaction.reply({
        content: "Sticky message berhasil dihapus",
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);
      return await interaction.reply({
        content: "Terjadi kesalahan saat menghapus sticky message",
        ephemeral: true,
      });
    }
  },
};
