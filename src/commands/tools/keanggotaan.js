const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const AnggotaModel = require("../../schemas/anggota");
const mongoose = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("keanggotaan")
        .setDescription("Data anggota dan relasi white tiger sadulur"),
    async execute(interaction, client) {
        // yang diperbolehkan hanya role dengan id tertentu

        // Mengambil data nama - nama anggota dari posisi ketua dan melooping data nama anggota
        const ketuaArray = await AnggotaModel.find({ posisi: "ketua" });
        const wakilKetuaArray = await AnggotaModel.find({ posisi: "wakil ketua" });
        const bisnisArray = await AnggotaModel.find({ posisi: "PJ Bisnis" });
        const brankasArray = await AnggotaModel.find({ posisi: "PJ Brankas" });
        const jalananArray = await AnggotaModel.find({ posisi: "PJ Jalanan" });
        const relasiArray = await AnggotaModel.find({ posisi: "Relasi" });
        const anggotaArray = await AnggotaModel.find({ posisi: "Anggota" });
        
        const ketuaList = ketuaArray.map((anggota, index) => `> ${index + 1}. ${anggota.nama}`).join("\n");
        const wakilKetuaList = wakilKetuaArray.map((anggota, index) => `> ${index + 1}. ${anggota.nama}`).join("\n");
        const bisnisList = bisnisArray.map((anggota, index) => `> ${index + 1}. ${anggota.nama}`).join("\n");
        const brankasList = brankasArray.map((anggota, index) => `> ${index + 1}. ${anggota.nama}`).join("\n");
        const jalananList = jalananArray.map((anggota, index) => `> ${index + 1}. ${anggota.nama}`).join("\n");
        const relasiList = relasiArray.map((anggota, index) => `> ${index + 1}. ${anggota.nama}`).join("\n");
        const anggotaList = anggotaArray.map((anggota, index) => `> ${index + 1}. ${anggota.nama}`).join("\n");

        const embed = new EmbedBuilder()
        .setTitle("Keanggotaan - White Tiger Sadulur")
        .setDescription('> Daftar anggota dan relasi resmi\n\n> **[STRUKTUR KEANGGOTAAN WT-KS]**\n> **Ketua**\n> Kepimpinan tertinggi White Tiger Sadulur\n'+`${ketuaList || '> Tidak Ada Anggota'}`+'\n\n> **Wakil Ketua**\n> Wakil ketua dari ketua White Tiger Sadulur\n'+`${wakilKetuaList || '> Tidak Ada Anggota'}`+'\n\n> **PJ Bisnis**\n> Manajer dan mengelola bisnis WT-KS\n'+`${bisnisList || '> Tidak Ada Anggota'}`+'\n\n> **PJ Brankas**\n> Manajer inventaris atau stock persediaan WT-KS\n'+`${brankasList || '> Tidak Ada Anggota'}`+'\n\n> **PJ Jalanan**\n> Manajer dan mengelola bisnis WT-KS\n'+`${jalananList || '> Tidak Ada Anggota'}`+'\n\n> **Anggota**\n> Anggota remis WT-KS\n'+`${anggotaList || '> Tidak Ada Anggota'}`+'\n\n> **Relasi**\n> Relasi remis WT-KS\n'+`${relasiList || '> Tidak Ada Anggota'}`+'')
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
            await interaction.reply({
                content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
                ephemeral: true
            })
        }
    }
}