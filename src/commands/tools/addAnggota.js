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
      "Menambah anggota ke dalam daftar anggota White Tiger Sadulur"
    ),

  async execute(interaction, client) {
    if (interaction.member.roles.cache.has("1177816855285600296")) {
      const modalketua = new ModalBuilder()
        .setCustomId("ketua")
        .setTitle(`Tambah anggota baru`);
      const modalwakil = new ModalBuilder()
        .setCustomId("wakil")
        .setTitle(`Tambah anggota baru`);
      const modalbisnis = new ModalBuilder()
        .setCustomId("bisnis")
        .setTitle(`Tambah anggota baru`);
      const modalbrankas = new ModalBuilder()
        .setCustomId("brankas")
        .setTitle(`Tambah anggota baru`);
      const modaljalanan = new ModalBuilder()
        .setCustomId("jalanan")
        .setTitle(`Tambah anggota baru`);
      const modalhr = new ModalBuilder()
        .setCustomId("hr")
        .setTitle(`Tambah anggota baru`);
      const modalanggota = new ModalBuilder()
        .setCustomId("anggota")
        .setTitle(`Tambah anggota baru`);
      const modalrelasi = new ModalBuilder()
        .setCustomId("relasi")
        .setTitle(`Tambah anggota baru`);
      modalketua.addComponents(
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
      modalwakil.addComponents(
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
      modalbisnis.addComponents(
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
      modalbrankas.addComponents(
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
      modaljalanan.addComponents(
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
      modalhr.addComponents(
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
      modalanggota.addComponents(
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
      modalrelasi.addComponents(
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
        .setCustomId('posisi')
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
          i.user.id === interaction.user.id && i.customId === 'posisi',
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
              await interaction.showModal(modalketua);
              // Jika modal di submit, maka tampilkan embed
              const interactionHandlerKetua = async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "ketua") {
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
                    foto: "-",
                    posisi,
                    discordid
                  });

                  try {
                    await anggota.save();
                    console.log("Data anggota berhasil disimpan ke database.");
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Sadulur")
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
                      text: "White Tiger Sadulur",
                    });

                    await interaction.reply({
                      embeds: [embed],
                    });

                    client.removeListener(Events.InteractionCreate, interactionHandlerKetua);
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
                }
              };
              client.on(Events.InteractionCreate, interactionHandlerKetua);
              break;
            case "wakil ketua":
              await interaction.showModal(modalwakil);
              // Jika modal di submit, maka tampilkan embed
              const interactionHandlerWakil = async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "wakil") {
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
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Sadulur")
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
                      text: "White Tiger Sadulur",
                    });

                    await interaction.reply({
                      embeds: [embed],
                    });

                    client.removeListener(Events.InteractionCreate, interactionHandlerWakil);
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
                }
              };
              client.on(Events.InteractionCreate, interactionHandlerWakil);
              break;
            case "PJ Bisnis":
              await interaction.showModal(modalbisnis);
              // Jika modal di submit, maka tampilkan embed
              const interactionHandlerBisnis = async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "bisnis") {
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
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Sadulur")
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
                      text: "White Tiger Sadulur",
                    });

                    await interaction.reply({
                      embeds: [embed],
                    });

                    client.removeListener(Events.InteractionCreate, interactionHandlerBisnis);
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
                }
              };
              client.on(Events.InteractionCreate, interactionHandlerBisnis);
              break;
            case "PJ Brankas":
              await interaction.showModal(modalbrankas);
              // Jika modal di submit, maka tampilkan embed
              const interactionHandlerBrankas = async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "brankas") {
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
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Sadulur")
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
                      text: "White Tiger Sadulur",
                    });

                    await interaction.reply({
                      embeds: [embed],
                    });

                    client.removeListener(Events.InteractionCreate, interactionHandlerBrankas);
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
                }
              };
              client.on(Events.InteractionCreate, interactionHandlerBrankas);
              break;
            case "PJ Jalanan":
              await interaction.showModal(modaljalanan);
              // Jika modal di submit, maka tampilkan embed
              const interactionHandlerJalanan = async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "jalanan") {
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
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Sadulur")
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
                      text: "White Tiger Sadulur",
                    });

                    await interaction.reply({
                      embeds: [embed],
                    });

                    client.removeListener(Events.InteractionCreate, interactionHandlerJalanan);
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
                }
              };
              client.on(Events.InteractionCreate, interactionHandlerJalanan);
              break;
            case "PJ Relasi":
              await interaction.showModal(modalhr);
              // Jika modal di submit, maka tampilkan embed
              const interactionHandlerHr = async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "hr") {
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
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Sadulur")
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
                      text: "White Tiger Sadulur",
                    });

                    await interaction.reply({
                      embeds: [embed],
                    });

                    client.removeListener(Events.InteractionCreate, interactionHandlerHr);
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
                }
              };
              client.on(Events.InteractionCreate, interactionHandlerHr);
              break;
            case "Anggota":
              await interaction.showModal(modalanggota);
              // Jika modal di submit, maka tampilkan embed
              const interactionHandlerAnggota = async (interaction) => {
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
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Sadulur")
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
                      text: "White Tiger Sadulur",
                    });

                    await interaction.reply({
                      embeds: [embed],
                    });

                    client.removeListener(Events.InteractionCreate, interactionHandlerAnggota);
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
                }
              };
              client.on(Events.InteractionCreate, interactionHandlerAnggota);
              break;
            case "Relasi":
              await interaction.showModal(modalrelasi);
              // Jika modal di submit, maka tampilkan embed
              const interactionHandlerRelasi = async (interaction) => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === "relasi") {
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
                    
                    const embed = new EmbedBuilder()
                    .setTitle("Anggota - White Tiger Sadulur")
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
                      text: "White Tiger Sadulur",
                    });

                    await interaction.reply({
                      embeds: [embed],
                    });

                    client.removeListener(Events.InteractionCreate, interactionHandlerRelasi);
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
                }
              };
              client.on(Events.InteractionCreate, interactionHandlerRelasi);
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
