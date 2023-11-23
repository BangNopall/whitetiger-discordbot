const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("jabatan")
        .setDescription("test doang"),
    async execute(interaction, client) {
        const menu = new StringSelectMenuBuilder()
        .setCustomId('jabatanmenu')
        .setPlaceholder('Pilih jabatan')
        .setOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel('Ketua')
            .setDescription('Ketua White Tiger Pandawa')
            .setValue('ketua'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Wakil Ketua')
            .setDescription('Wakil Ketua White Tiger Pandawa')
            .setValue('wakilketua'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Bisnis')
            .setDescription('Bisnis White Tiger Pandawa')
            .setValue('bisnis'),
        )
        
        const row = new ActionRowBuilder()
			.addComponents(menu);

		await interaction.reply({
			content: 'Choose your starter!',
			components: [row],
		});
    }
}