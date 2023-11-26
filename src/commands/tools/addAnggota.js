const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
  EmbedBuilder,
  Embed,
  Events,
  PermissionFlagsBits,
} = require("discord.js");
const AnggotaModel = require("../../schemas/anggota");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tambah-anggota")
    .setDescription(
      "Menambah anggota ke dalam daftar anggota White Tiger Pandawa"
    ),

  async execute(interaction, client) {
    if (interaction.member.roles.cache.has("1177816855285600296")) {
      const modal = new ModalBuilder()
        .setCustomId("anggota")
        .setTitle(`Tambah anggota baru`);
      modal.addComponents(
        new ActionRowBuilder({
          components: [
            new TextInputBuilder()
              .setCustomId("nama")
              .setLabel("Nama IC")
              .setPlaceholder("Masukan nama IC")
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
          ],
        }),
        new ActionRowBuilder({
          components: [
            new TextInputBuilder()
              .setCustomId("steamhex")
              .setLabel("SteamHex")
              .setPlaceholder("Masukan steamhex")
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
          ],
        }),
        new ActionRowBuilder({
          components: [
            new TextInputBuilder()
              .setCustomId("nohpic")
              .setLabel("Nomor Hp IC")
              .setPlaceholder("Masukan Nomor HP IC")
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
          ],
        }),
        new ActionRowBuilder({
          components: [
            new TextInputBuilder()
              .setCustomId("discordid")
              .setLabel("Discord ID")
              .setPlaceholder("Masukan Discord ID")
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
          ],
        })
      );
      const menu = new StringSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder("Pilih posisi anggota")
        .setOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel("Ketua")
            .setDescription("Ketua WT-KS")
            .setValue("ketua"),
          new StringSelectMenuOptionBuilder()
            .setLabel("Wakil Ketua")
            .setDescription("Wakil Ketua WT-KS")
            .setValue("wakil ketua"),
          new StringSelectMenuOptionBuilder()
            .setLabel("PJ Bisnis")
            .setDescription("Manajer dan pengelolaan bisnis WT-KS")
            .setValue("PJ Bisnis"),
          new StringSelectMenuOptionBuilder()
            .setLabel("PJ Brankas")
            .setDescription(
              "Manajer inventaris atau stock persediaan brankas WT-KS"
            )
            .setValue("PJ Brankas"),
          new StringSelectMenuOptionBuilder()
            .setLabel("PJ Jalanan")
            .setDescription(
              "Mengoordinasi aktivitas dan kegiatan jalanan WT-KS"
            )
            .setValue("PJ Jalanan"),
          new StringSelectMenuOptionBuilder()
            .setLabel("PJ Relasi")
            .setDescription(
              "Mengoordinasi aktivitas serta mengelola relasi WT-KS"
            )
            .setValue("PJ Relasi"),
          new StringSelectMenuOptionBuilder()
            .setLabel("Anggota")
            .setDescription("Anggota resmi White Tiger Sadulur")
            .setValue("Anggota"),
          new StringSelectMenuOptionBuilder()
            .setLabel("Relasi")
            .setDescription("Relasi resmi White Tiger Sadulur")
            .setValue("Relasi")
        );

      const row = new ActionRowBuilder().addComponents(menu);
      const embedJabatan = new EmbedBuilder()
        .setDescription(
          "**Sebelum mengisi Nama IC dan SteamHex, pilih posisi keanggotaan, **"
        )
        .setColor("ffffff");
      const response = await interaction.reply({
        embeds: [embedJabatan],
        components: [row],
      });
      const collector = response.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        filter: (i) =>
          i.user.id === interaction.user.id && i.customId === interaction.id,
        time: 60_000, // Optional: Set a timeout for the collector
      });

      collector.on("collect", async (interaction) => {
        const selectedOption = interaction.values[0]; // Get the selected option value
        // menghapus pesan diatasnya, jika telah melakukan selected
        const messages = await interaction.channel.messages.fetch({ limit: 1 }); // Fetch the last 3 messages
        messages.forEach(async (message) => {
          if (message.id !== interaction.id) {
            // Skip the current interaction's message
            await message.delete();
          }
        });

        // Melakukan perintah ketika menu di pilih
        if (interaction.member.roles.cache.has("1155443652911452252")) {
          switch (selectedOption) {
            case "ketua":
              await interaction.showModal(modal);
              // Jika modal di submit, maka tampilkan embed
              client.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "anggota") {
                  const nama = interaction.fields.getTextInputValue("nama");
                  const steamhex =
                    interaction.fields.getTextInputValue("steamhex");
                  const nohpic = interaction.fields.getTextInputValue("nohpic");
                  const discordid = interaction.fields.getTextInputValue("discordid");
                  const posisi = selectedOption;
                  const anggota = new AnggotaModel({
                    _id: new mongoose.Types.ObjectId(),
                    nama,
                    steamhex,
                    nomorhp: nohpic,
                    posisi,
                    discordid,
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                  } catch (error) {
                    console.error(
                      "Gagal menyimpan data anggota ke database:",
                      error
                    );
                    return interaction.reply({
                      content:
                        "Terjadi kesalahan saat menyimpan data ke database.",
                      ephemeral: true,
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Pandawa")
                    .setDescription(
                      `
                    Nama Ic: ${nama}\nSteamHex : ${steamhex}\nNomor HP ic: ${nohpic}\nPosisi: ${posisi}\nDiscord ID: ${discordid}
                    `
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

                  await interaction.reply({
                    embeds: [embed],
                  });
                }
              });
              break;
            case "wakil ketua":
              await interaction.showModal(modal);
              // Jika modal di submit, maka tampilkan embed
              client.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "anggota") {
                  const nama = interaction.fields.getTextInputValue("nama");
                  const steamhex =
                    interaction.fields.getTextInputValue("steamhex");
                  const nohpic = interaction.fields.getTextInputValue("nohpic");
                  const discordid = interaction.fields.getTextInputValue("discordid");
                  const posisi = selectedOption;

                  const anggota = new AnggotaModel({
                    _id: new mongoose.Types.ObjectId(),
                    nama,
                    steamhex,
                    nomorhp: nohpic,
                    posisi,
                    discordid
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                  } catch (error) {
                    console.error(
                      "Gagal menyimpan data anggota ke database:",
                      error
                    );
                    return interaction.reply({
                      content:
                        "Terjadi kesalahan saat menyimpan data ke database.",
                      ephemeral: true,
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Pandawa")
                    .setDescription(
                      `
                    Nama Ic: ${nama}\nSteamHex : ${steamhex}\nNomor HP ic: ${nohpic}\nPosisi: ${posisi}\nDiscord ID: ${discordid}
                    `
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

                  await interaction.reply({
                    embeds: [embed],
                  });
                }
              });
              break;
            case "PJ Bisnis":
              await interaction.showModal(modal);
              // Jika modal di submit, maka tampilkan embed
              client.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "anggota") {
                  const nama = interaction.fields.getTextInputValue("nama");
                  const steamhex =
                    interaction.fields.getTextInputValue("steamhex");
                  const nohpic = interaction.fields.getTextInputValue("nohpic");
                  const discordid = interaction.fields.getTextInputValue("discordid");
                  const posisi = selectedOption;

                  const anggota = new AnggotaModel({
                    _id: new mongoose.Types.ObjectId(),
                    nama,
                    steamhex,
                    nomorhp: nohpic,
                    posisi,
                    discordid
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                  } catch (error) {
                    console.error(
                      "Gagal menyimpan data anggota ke database:",
                      error
                    );
                    return interaction.reply({
                      content:
                        "Terjadi kesalahan saat menyimpan data ke database.",
                      ephemeral: true,
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Pandawa")
                    .setDescription(
                      `
                    Nama Ic: ${nama}\nSteamHex : ${steamhex}\nNomor HP ic: ${nohpic}\nPosisi: ${posisi}\nDiscord ID: ${discordid}
                    `
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

                  await interaction.reply({
                    embeds: [embed],
                  });
                }
              });
              break;
            case "PJ Brankas":
              await interaction.showModal(modal);
              // Jika modal di submit, maka tampilkan embed
              client.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "anggota") {
                  const nama = interaction.fields.getTextInputValue("nama");
                  const steamhex =
                    interaction.fields.getTextInputValue("steamhex");
                  const nohpic = interaction.fields.getTextInputValue("nohpic");
                  const discordid = interaction.fields.getTextInputValue("discordid");
                  const posisi = selectedOption;

                  const anggota = new AnggotaModel({
                    _id: new mongoose.Types.ObjectId(),
                    nama,
                    steamhex,
                    nomorhp: nohpic,
                    posisi,
                    discordid
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                  } catch (error) {
                    console.error(
                      "Gagal menyimpan data anggota ke database:",
                      error
                    );
                    return interaction.reply({
                      content:
                        "Terjadi kesalahan saat menyimpan data ke database.",
                      ephemeral: true,
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Pandawa")
                    .setDescription(
                      `
                    Nama Ic: ${nama}\nSteamHex : ${steamhex}\nNomor HP ic: ${nohpic}\nPosisi: ${posisi}\nDiscord ID: ${discordid}
                    `
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

                  await interaction.reply({
                    embeds: [embed],
                  });
                }
              });
              break;
            case "PJ Jalanan":
              await interaction.showModal(modal);
              // Jika modal di submit, maka tampilkan embed
              client.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "anggota") {
                  const nama = interaction.fields.getTextInputValue("nama");
                  const steamhex =
                    interaction.fields.getTextInputValue("steamhex");
                  const nohpic = interaction.fields.getTextInputValue("nohpic");
                  const discordid = interaction.fields.getTextInputValue("discordid");
                  const posisi = selectedOption;

                  const anggota = new AnggotaModel({
                    _id: new mongoose.Types.ObjectId(),
                    nama,
                    steamhex,
                    nomorhp: nohpic,
                    posisi,
                    discordid
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                  } catch (error) {
                    console.error(
                      "Gagal menyimpan data anggota ke database:",
                      error
                    );
                    return interaction.reply({
                      content:
                        "Terjadi kesalahan saat menyimpan data ke database.",
                      ephemeral: true,
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Pandawa")
                    .setDescription(
                      `
                    Nama Ic: ${nama}\nSteamHex : ${steamhex}\nNomor HP ic: ${nohpic}\nPosisi: ${posisi}\nDiscord ID: ${discordid}
                    `
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

                  await interaction.reply({
                    embeds: [embed],
                  });
                }
              });
              break;
            case "PJ Relasi":
              await interaction.showModal(modal);
              // Jika modal di submit, maka tampilkan embed
              client.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "anggota") {
                  const nama = interaction.fields.getTextInputValue("nama");
                  const steamhex =
                    interaction.fields.getTextInputValue("steamhex");
                  const nohpic = interaction.fields.getTextInputValue("nohpic");
                  const discordid = interaction.fields.getTextInputValue("discordid");
                  const posisi = selectedOption;

                  const anggota = new AnggotaModel({
                    _id: new mongoose.Types.ObjectId(),
                    nama,
                    steamhex,
                    nomorhp: nohpic,
                    posisi,
                    discordid
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                  } catch (error) {
                    console.error(
                      "Gagal menyimpan data anggota ke database:",
                      error
                    );
                    return interaction.reply({
                      content:
                        "Terjadi kesalahan saat menyimpan data ke database.",
                      ephemeral: true,
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Pandawa")
                    .setDescription(
                      `
                    Nama Ic: ${nama}\nSteamHex : ${steamhex}\nNomor HP ic: ${nohpic}\nPosisi: ${posisi}\nDiscord ID: ${discordid}
                    `
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

                  await interaction.reply({
                    embeds: [embed],
                  });
                }
              });
              break;
            case "Anggota":
              await interaction.showModal(modal);
              // Jika modal di submit, maka tampilkan embed
              client.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "anggota") {
                  const nama = interaction.fields.getTextInputValue("nama");
                  const steamhex =
                    interaction.fields.getTextInputValue("steamhex");
                  const nohpic = interaction.fields.getTextInputValue("nohpic");
                  const discordid = interaction.fields.getTextInputValue("discordid");
                  const posisi = selectedOption;

                  const anggota = new AnggotaModel({
                    _id: new mongoose.Types.ObjectId(),
                    nama,
                    steamhex,
                    nomorhp: nohpic,
                    posisi,
                    discordid
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                  } catch (error) {
                    console.error(
                      "Gagal menyimpan data anggota ke database:",
                      error
                    );
                    return interaction.reply({
                      content:
                        "Terjadi kesalahan saat menyimpan data ke database.",
                      ephemeral: true,
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setTitle("Anggota baru - White Tiger Pandawa")
                    .setDescription(
                      `
                    Nama Ic: ${nama}\nSteamHex : ${steamhex}\nNomor HP ic: ${nohpic}\nPosisi: ${posisi}\nDiscord ID: ${discordid}
                    `
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

                  await interaction.reply({
                    embeds: [embed],
                  });
                }
              });
              break;
            case "Relasi":
              await interaction.showModal(modal);
              // Jika modal di submit, maka tampilkan embed
              client.on(Events.InteractionCreate, async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "anggota") {
                  const nama = interaction.fields.getTextInputValue("nama");
                  const steamhex =
                    interaction.fields.getTextInputValue("steamhex");
                  const nohpic = interaction.fields.getTextInputValue("nohpic");
                  const discordid = interaction.fields.getTextInputValue("discordid");
                  const posisi = selectedOption;

                  const anggota = new AnggotaModel({
                    _id: new mongoose.Types.ObjectId(),
                    nama,
                    steamhex,
                    nomorhp: nohpic,
                    posisi,
                    discordid
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                  } catch (error) {
                    console.error(
                      "Gagal menyimpan data anggota ke database:",
                      error
                    );
                    return interaction.reply({
                      content:
                        "Terjadi kesalahan saat menyimpan data ke database.",
                      ephemeral: true,
                    });
                  }

                  const embed = new EmbedBuilder()
                    .setTitle("Relasi baru - White Tiger Pandawa")
                    .setDescription(
                      `
                    Nama Ic: ${nama}\nSteamHex : ${steamhex}\nNomor HP ic: ${nohpic}\nPosisi: ${posisi}\nDiscord ID: ${discordid}
                    `
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

                  await interaction.reply({
                    embeds: [embed],
                  });
                }
              });
              break;
          }
        } else {
          await interaction.reply({
            content: `Maaf, hanya <@&1155443652911452252> yang dapat menggunakan command ini.`,
            ephemeral: true,
          });
        }
      });
    } else {
      await interaction.reply({
        content: `Maaf, hanya <@&1177816855285600296> yang dapat menggunakan command ini.`,
        ephemeral: true,
      });
    }
  },
};
