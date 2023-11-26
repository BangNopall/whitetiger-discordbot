module.exports = {
    data: {
        name: 'jabatanmenu',
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `You select: ${interaction.values[0]}`
        });
    }
}