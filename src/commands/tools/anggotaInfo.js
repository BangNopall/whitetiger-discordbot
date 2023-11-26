const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const AnggotaModel = require("../../schemas/anggota");
const mongoose = require("mongoose");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("anggota-info")
    .setDescription(
      "Mengambil informasi anggota White Tiger Sadulur"
    )
    .addStringOption((option) =>
      option
        .setName("anggota")
        .setDescription("Pilih anggota yang akan diambil informasinya")
        .setRequired(true)
        .setAutocomplete(true)
    ),

    async autocomplete(interaction) {
        // Mengambil semua data data dari database berdasarkan nama
        const focusedValue = interaction.options.getFocused();
        try {
          // Mengambil semua data anggota dari database berdasarkan nama
          const anggotaData = await AnggotaModel.find({
            nama: { $regex: focusedValue, $options: "i" },
          });
    
          // Membuat array choices dari data yang ditemukan
          const choices = anggotaData.map((anggota) => anggota.nama);
    
          // Menyaring hasil untuk autocomplete
          const filtered = choices
            .filter(
              (choice) =>
                choice.startsWith(focusedValue) &&
                choice.length > focusedValue.length
            )
            .slice(0, 25); // Ambil 25 item pertama
    
          // Merespon dengan hasil autocomplete
          await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
          );
        } catch (error) {
          console.error(error);
          await interaction.reply(
            "Terjadi kesalahan saat mengambil data dari database."
          );
        }
    },

    async execute(interaction, client) {
        let nama = interaction.options.getString("anggota");

        // Mengambil informasi anggota nama, steamhex, nomor hp, berasarkan nama dari database
        try {
            const anggotaData = await AnggotaModel.findOne({
                nama: nama,
            });

            const embed = new EmbedBuilder()
                .setTitle("Info Anggota - White Tiger Sadulur")
                .setDescription(`Berikut adalah informasi anggota **${nama}**\nNama Ic : ${anggotaData.nama}\nSteamHex : ${anggotaData.steamhex}\nNomor HP : ${anggotaData.nomorhp}\nPosisi : ${anggotaData.nomorhp}\nDiscord ID : <@${anggotaData.discordid}>`)
                .setColor("ffffff")
                .setTimestamp(Date.now())
                .setFooter({
                  iconURL:
                    "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
                  text: "White Tiger Sadulur",
                });

            if (interaction.member.roles.cache.has("1155443652911452252")) {
                await interaction.reply({ embeds: [embed] });
            }else {
                await interaction.reply({
                  content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
                  ephemeral: true,
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply(
                "Terjadi kesalahan saat mengambil data dari database."
            );
        }
    }
}