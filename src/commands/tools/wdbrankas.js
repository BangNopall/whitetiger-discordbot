const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const Brankas = require("../../schemas/brankas");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wd-brankas")
    .setDescription("Withdraw barang brankas White Tiger Sadulur")
    // buatkan 2 option
    .addStringOption((option) =>
      option
        .setName("barang")
        .setDescription(
          "Pilih barang yang akan di withdraw (terdapat 47+ barang)"
        )
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option.setName("jumlah").setDescription("Jumlah withdraw barang")
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = [
      "axe",
      "ayam potong",
      "baju",
      "batu",
      "benang",
      "bulu ayam",
      "diamond",
      "dompet",
      "gold",
      "iron",
      "kain",
      "kemasan ayam",
      "map dokumen",
      "obat stress",
      "pecahan batu",
      "perban",
      "phone",
      "radio",
      "sakura tea",
      "skateboard",
      "tembaga",
      "udon",
      "advanced lockpick",
      "alumunium",
      "joint",
      "kecubung",
      "lockpick",
      "meth",
      "olahan kecubung",
      "paket meth",
      "toolkit senjata",
      "vest",
      "ak47",
      "de",
      "heavy sniper",
      "knife",
      "machete",
      "mini smg",
      "python",
      "tech9",
      ".44 magnum",
      ".45 acp",
      ".50 ae",
      ".50 bmg",
      "5.55",
      "9mm",
    ];
    const filtered = choices
      .filter(
        (choice) =>
          choice.startsWith(focusedValue) && choice.length > focusedValue.length
      )
      .slice(0, 25); // Take the first 25 items
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction, client) {
    if (interaction.member.roles.cache.has("1177816855285600296")) {
      let barang = interaction.options.getString("barang");
      let jumlah = interaction.options.getString("jumlah");

      if (barang == "ayam potong") {
        barang = "ayampotong";
      } else if (barang == "kemasan ayam") {
        barang = "kemasanayam";
      } else if (barang == "map dokumen") {
        barang = "mapdokumen";
      } else if (barang == "obat stress") {
        barang = "obatstress";
      } else if (barang == "bulu ayam") {
        barang = "buluayam";
      } else if (barang == "pecahan batu") {
        barang = "pecahanbatu";
      } else if (barang == "sakura tea") {
        barang = "sakuratea";
      } else if (barang == "advanced lockpick") {
        barang = "advancedlockpick";
      } else if (barang == "olahan kecubung") {
        barang = "olahankecubung";
      } else if (barang == "paket meth") {
        barang = "paketmeth";
      } else if (barang == "toolkit senjata") {
        barang = "toolkitsenjata";
      } else if (barang == "heavy sniper") {
        barang = "heavysniper";
      } else if (barang == "mini smg") {
        barang = "minismg";
      } else if (barang == ".44 magnum") {
        barang = "pelurumagnum";
      } else if (barang == ".45 acp") {
        barang = "peluruacp";
      } else if (barang == ".50 ae") {
        barang = "peluruae";
      } else if (barang == ".50 bmg") {
        barang = "pelurubmg";
      } else if (barang == "5.55") {
        barang = "pelurulimalimaenam";
      } else if (barang == "9mm") {
        barang = "pelurusembilanmm";
      }

      try {
        // Cari data brankas di database
        let brankasData = await Brankas.findOne();

        // Jika data tidak ditemukan, inisiasi nilai data ke 0 sebagai default
        if (!brankasData)
          brankasData = await new Brankas({
            _id: new mongoose.Types.ObjectId(),
            axe: "0",
            ayampotong: "0",
            baju: "0",
            batu: "0",
            benang: "0",
            buluayam: "0",
            diamond: "0",
            dompet: "0",
            gold: "0",
            iron: "0",
            kain: "0",
            kemasanayam: "0",
            mapdokumen: "0",
            obatstress: "0",
            pecahanbatu: "0",
            perban: "0",
            phone: "0",
            radio: "0",
            sakuratea: "0",
            skateboard: "0",
            tembaga: "0",
            udon: "0",
            advancedlockpick: "0",
            alumunium: "0",
            joint: "0",
            kecubung: "0",
            lockpick: "0",
            meth: "0",
            olahankecubung: "0",
            paketmeth: "0",
            toolkitsenjata: "0",
            vest: "0",
            ak47: "0",
            de: "0",
            heavysniper: "0",
            knife: "0",
            machete: "0",
            minismg: "0",
            python: "0",
            tech9: "0",
            pelurumagnum: "0",
            peluruacp: "0",
            peluruae: "0",
            pelurubmg: "0",
            pelurulimalimaenam: "0",
            pelurusembilanmm: "0",
          });
        await brankasData.save();

        //   buatkan kondisi ketika barang tidak ditemukan atau tidak sesuai
        if (!brankasData[barang]) {
          return interaction.reply({
            content: `Barang tidak ditemukan! Ketik dan pilih barang sesuai pada option yang diberikan.`,
            ephemeral: true,
          });
        }

        // Tambahkan jumlah withdraw barang dan simpan ke database
        brankasData[barang] = (
          parseInt(brankasData[barang]) - parseInt(jumlah)
        ).toString();
        await brankasData.save();
        // tampilkan pesan berhasil

        console.log(brankasData);

        if (barang == "ayampotong") {
          barang = "ayam potong";
        } else if (barang == "kemasanayam") {
          barang = "kemasan ayam";
        } else if (barang == "mapdokumen") {
          barang = "map dokumen";
        } else if (barang == "obatstress") {
          barang = "obat stress";
        } else if (barang == "buluayam") {
          barang = "bulu ayam";
        } else if (barang == "pecahanbatu") {
          barang = "pecahan batu";
        } else if (barang == "sakuratea") {
          barang = "sakura tea";
        } else if (barang == "advancedlockpick") {
          barang = "advanced lockpick";
        } else if (barang == "olahankecubung") {
          barang = "olahan kecubung";
        } else if (barang == "paketmeth") {
          barang = "paket meth";
        } else if (barang == "toolkitsenjata") {
          barang = "toolkit senjata";
        } else if (barang == "heavysniper") {
          barang = "heavy sniper";
        } else if (barang == "minismg") {
          barang = "mini smg";
        } else if (barang == "pelurumagnum") {
          barang = ".44 magnum";
        } else if (barang == "peluruacp") {
          barang = ".45 acp";
        } else if (barang == "peluruae") {
          barang = ".50 ae";
        } else if (barang == "pelurubmg") {
          barang = ".50 bmg";
        } else if (barang == "pelurulimalimaenam") {
          barang = "5.55";
        } else if (barang == "pelurusembilanmm") {
          barang = "9mm";
        }

        const embed = new EmbedBuilder()
          .setTitle("WD Brankas - White Tiger Sadulur")
          .setDescription(
            `> **Data Withdraw Brankas**\n> - User: <@${interaction.user.id}> \n> - Barang : ${barang}\n> - Jumlah : ${jumlah}`
          )
          .setColor("ffffff")
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&"
          )
          .setTimestamp(Date.now())
          .setFooter({
            iconURL:
              "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
            text: "White Tiger Sadulur",
          });

        if (interaction.member.roles.cache.has("1155443652911452252")) {
          await interaction.reply({
            content: `Berhasil melakukan withdraw ${jumlah} ${barang}`,
            ephemeral: true,
          });
          await interaction.followUp({
            embeds: [embed],
          });
        } else {
          await interaction.reply({
            content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
            ephemeral: true,
          });
        }
      } catch (error) {
        console.error("Error during withdraw: ", error);
        await interaction.reply({
          content: `Terjadi kesalahan saat melakukan withdraw!`,
        });
      }
    } else {
      return interaction.reply({
        content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini. Perintah ini masih dalam tahap pengembangan`,
        ephemeral: true,
      });
    }
  },
};
