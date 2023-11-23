module.exports = {
    data: {
        name: 'jabatanmenu',
    },
    async execute(interaction, client) {
        console.log(interaction);
        await interaction.reply({
            content: `You select: `
        });
    }
}