const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Daftar command WT-KSRP discord bot yang tersedia"),
    async execute(interaction, client) {
        // yang diperbolehkan hanya role dengan id tertentu
        const embed = new EmbedBuilder()
        .setTitle("Commmand Bot - White Tiger Sadulur")
        .setDescription("> Gunakan aplication command atau prefix dengan ``slash atau (/)`` untuk memulai perintah.\n\n> **General Command**\n> - ``/help`` : Daftar seluruh perintah bot wt-ksrp\n> - ``/wtksrp`` : Informasi wt-ksrp bot discord\n> - ``/wtgg`` : wtgg!\n> - ``/kota`` : Direct link kota sadulur\n\n> **Moderator Command**\n> - ``/clear`` : Membersihkan pesan - pesan pada channel\n> - ``/sticky`` : Pin atau membuat pesan menjadi sticky\n\n> **WT Sadulur Command**\n> - ``/keuangan`` : Data keuangan kantor\n> - ``/brankas`` : Data brankas kantor\n> - ``/dp-brankas`` : Deposit brankas kantor\n> - ``/wd-brankas`` : Withdraw brankas kantor\n> - ``/dp-uangputih`` : Deposit uang putih kantor\n> - ``/wd-uangputih`` : Withdraw uang putih kantor\n> - ``/dp-uangmerah`` : Deposit uang merah kantor\n> - ``/wd-uangmerah`` : Withdraw uang merah kantor\n> - ``/anggota-info`` : Informasi anggota wt-ks\n> - ``/keanggotaan`` : Data seluruh anggota wt-ks\n> - ``/tambah-barang`` : Menambahkan barang ke dalam data brankas wt-ks bot\n> - ``/hapus-barang`` : Menghapus barang dari data brankas wt-ks bot\n\n> **Music Player Command**\n> - ``/play`` : Menggunakan musik player untuk memutar lagu\n> - ``/resume`` : Melanjutkan lagu yang sedang di pause\n> - ``/pause`` : Menghentikan lagu yang sedang di putar\n> - ``/skip`` : Melewati lagu yang sedang di putar\n> - ``/queue`` : Melihat daftar 10 antrian lagu\n> - ``/exit`` : Menghapus semua antrian lagu dan keluar dari voice")
        .setColor("ffffff")
        .setThumbnail("https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&")
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
            text: "White Tiger Sadulur"
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