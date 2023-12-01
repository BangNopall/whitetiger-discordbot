const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wtksrp")
        .setDescription("Informasi WT-KSRP Discord Bot"),
    async execute(interaction, client) {
        // yang diperbolehkan hanya role dengan id tertentu
        const embed = new EmbedBuilder()
        .setTitle("White Tiger - Sadulur")
        .setDescription('WT-KSRP Adalah discord bot official dari White Tiger Sadulur yang dikembangkan oleh Noxvall (Demon Jaffa). Memberikan kemudahan untuk mengelola dan mengatur berbagai menejemen kota dengan berbagai command.')
        .setColor("ffffff")
        .setThumbnail("https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
            text: "White Tiger Sadulur"
        })
        .setImage("https://cdn.discordapp.com/attachments/1155435976861171723/1178025774763229315/image.png?ex=6574a4ff&is=65622fff&hm=266a51a467d62cf104b273d35c3bde1e0cfa49d5cb3f4a245c8740c2ca2b88f9&")
        .addFields(
            { name: '> Connect', value: '- [Masuk Kota](https://cfx.re/join/zzgj99)', inline: true },
            { name: '> DC KSRP', value: '- [SadulurRP](https://discord.gg/sadulurrp)', inline: true },
            { name: '> DC WT', value: '- [WhiteTiger](https://discord.gg/whitetiger)', inline: true },
            { name: '> Ping', value: `- ${client.ws.ping} ms`, inline: true },
            { name: '> Version', value: '- 1.0.1', inline: true },
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