const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Daftar command WT-PDW discord bot yang tersedia"),
    async execute(interaction, client) {
        // yang diperbolehkan hanya role dengan id tertentu
        const embed = new EmbedBuilder()
        .setTitle("Commmand Bot - White Tiger Pandawa")
        .setDescription("> Gunakan aplication command atau prefix dengan ``slash atau (/)`` untuk memulai perintah.\n\n> **General Command**\n> - ``/help``\n> - ``/wtpdw``\n> - ``/wtgg``\n> - ``/kota``\n\n> **WT Pandawa Command**\n> - ``/keuangan``\n> - ``/brankas``\n> - ``/dp-brankas``\n> - ``/wd-brankas``\n> - ``/dp-uangputih``\n> - ``/wd-uangputih``\n> - ``/dp-uangmerah``\n> - ``/wd-uangmerah``")
        .setColor("ffffff")
        .setThumbnail("https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
            text: "White Tiger Pandawa"
        })

        // hanya role tertentu yang dapat mengakses
        if(interaction.member.roles.cache.has('1155443652911452252')) return interaction.reply({
            embeds: [embed]
        }) 
        else{
            return interaction.reply({
                content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
                ephemeral: true
            })
        }
    }
}