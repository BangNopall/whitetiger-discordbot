const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wtpdw")
        .setDescription("Informasi WT-PDW Discord Bot"),
    async execute(interaction, client) {
        // yang diperbolehkan hanya role dengan id tertentu
        const embed = new EmbedBuilder()
        .setTitle("White Tiger - Pandawa")
        .setDescription('WT-PDW Adalah discord bot official dari White Tiger Pandawa yang dikembangkan oleh developer Noxvall (Demon Jaffa). Memberikan kemudahan untuk mengelola dan mengatur berbagai menejemen kota dengan berbagai command.')
        .setColor("ffffff")
        .setThumbnail("https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
            text: "White Tiger Pandawa"
        })
        .setImage("https://cdn.discordapp.com/attachments/1155435976861171723/1173344322725359626/20231113023056_1.jpg?ex=65639d0e&is=6551280e&hm=9cee050545f6a74039c5f55c0d7ff6910c6dd247f9b3c75da5df86c1ee8cc3f3&")
        .addFields(
            { name: '> Connect', value: '- [Masuk Kota](https://cfx.re/join/jklyam)', inline: true },
            { name: '> DC PDW', value: '- [PandawaRP](https://discord.gg/pandawarp)', inline: true },
            { name: '> DC WT', value: '- [WhiteTiger](https://discord.gg/whitetiger)', inline: true },
            { name: '> Ping', value: `- ${client.ws.ping} ms`, inline: true },
            { name: '> Version', value: '- 1.0.0', inline: true },
            { name: '> Prefix', value: '- /', inline: true },
        )

        // hanya role tertentu yang dapat mengakses
        if(interaction.member.roles.cache.has('1155443652911452252')) return interaction.reply({
            embeds: [embed]
        }) 
        else{
            await interaction.reply({
                content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
                ephemeral: true
            })
        }
    }
}