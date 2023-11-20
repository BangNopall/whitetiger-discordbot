const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Brankas = require("../../schemas/brankas");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("brankas")
    .setDescription("Brankas White Tiger Pandawa"),
  async execute(interaction, client) {
    // yang diperbolehkan hanya role dengan id tertentu
    let brankasData = await Brankas.findOne();
    const embed = new EmbedBuilder()
      .setTitle("Brankas - White Tiger Pandawa")
      .setDescription(
        `> **Barang Disnaker**\n> - AXE : ${brankasData.axe}\n> - AYAM POTONG : ${brankasData.ayampotong}\n> - BAJU : ${brankasData.baju}\n> - BATU : ${brankasData.batu}\n> - BENANG : ${brankasData.benang}\n> - BULU AYAM : ${brankasData.buluayam}\n> - DIAMOND : ${brankasData.diamond}\n> - DOMPET : ${brankasData.dompet}\n> - GOLD : ${brankasData.gold}\n> - IRON : ${brankasData.iron}\n> - KAIN : ${brankasData.kain}\n> - KEMASA AYAM : ${brankasData.kemasanayam}\n> - MAP DOKUMEN : ${brankasData.mapdokumen}\n> - OBAT STRESS : ${brankasData.obatstress}\n> - PECAHAN BATU : ${brankasData.pecahanbatu}\n> - PERBAN : ${brankasData.perban}\n> - PHONE : ${brankasData.phone}\n> - RADIO : ${brankasData.radio}\n> - SAKURA TEA : ${brankasData. sakuratea}\n> - SKATEBOARD : ${brankasData.skateboard}\n> - TEMBAGA : ${brankasData.tembaga}\n> - UDON : ${brankasData.udon}\n\n> **Barang Haram**\n> - ADVANCED LOCKPICK : ${brankasData.advancedlockpick}\n> - ALUMUNIUM : ${brankasData.alumunium}\n> - JOINT : ${brankasData.joint}\n> - KECUBUNG : ${brankasData.kecubung}\n> - LOCKPICK : ${brankasData.lockpick}\n> - METH : ${brankasData.meth}\n> - OLAHAN KECUBUNG : ${brankasData.olahankecubung}\n> - PAKET METH : ${brankasData.paketmeth}\n> - TOOLKIT SENJATA : ${brankasData.toolkitsenjata}\n> - VEST : ${brankasData.vest}\n\n> **Senjata**\n> - AK-47 :${brankasData.ak47}\n> - DE : ${brankasData.de}\n> - HEAVY SNIPER : ${brankasData.heavysniper}\n> - KNIFE : ${brankasData.knife}\n> - MACHETE : ${brankasData.machete}\n> - MINI SMG : ${brankasData.minismg}\n> - PYTHON : ${brankasData.python}\n> - TECH-9 : ${brankasData.tech9}\n\n> **Peluru**\n> - .44 MAGNUM : ${brankasData.pelurumagnum}\n> - .45 ACP : ${brankasData.peluruacp}\n> - .50 AE : ${brankasData.peluruae}\n> - .50 BMG : ${brankasData.pelurubmg}\n> - 5.56 : ${brankasData.pelurulimalimaenam}\n> - 9MM : ${brankasData.pelurusembilanmm}`
      )
      .setColor("ffffff")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&"
      )
      .setTimestamp(Date.now())
      .setFooter({
        iconURL:
          "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
        text: "White Tiger Pandawa",
      });

    // hanya role tertentu yang dapat mengakses
    if (interaction.member.roles.cache.has("1155443652911452252"))
      return interaction.reply({
        embeds: [embed],
      });
    else {
      return interaction.reply({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
        ephemeral: true,
      });
    }
  },
};
