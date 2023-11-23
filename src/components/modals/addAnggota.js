module.exports = {
    data: {
        name: 'anggota'
    },
    async execute(interaction, client){
        const embed = new EmbedBuilder()
        .setTitle("Anggota Baru - White Tiger Pandawa")
        .setDescription('> **Uang Putih**\n> ```' + `$${keuanganData.uangPutih}` + '``` \n\n> **Uang Merah**\n> ```' + `$${keuanganData.uangMerah}` + '```')
        .setColor("ffffff")
        .setThumbnail("https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
            text: "White Tiger Pandawa"
        })
        await interaction.reply({
            content: `Nama IC: ${interaction.fields.getTextInputValue("nama")}\nSteam Hex: ${interaction.fields.getTextInputValue("steamhex")}`
        });
    }
}