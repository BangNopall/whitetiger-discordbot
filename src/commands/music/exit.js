const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Keluar dari voice channel"),

    async execute(interaction, client) {
        const player = useMainPlayer();
        // Get the current queue
		const queue = player.nodes.get(interaction.guild.id);

		if (!queue)
		{
			await interaction.reply({
                embeds: [ new EmbedBuilder()
                    .setTitle('Musik Player - White Tiger Sadulur')
                    .setDescription(`> Tidak ada lagu dalam antrian`)
                    .setColor("ffffff")
                    .setTimestamp(Date.now())
                    .setFooter({
                        iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
                        text: "White Tiger Sadulur"
                    })
                ]
            })
			return;
		}

        // Deletes all the songs from the queue and leaves the voice channel
		queue.delete();

        await interaction.reply({
            embeds: [ new EmbedBuilder()
                .setTitle('Musik Player - White Tiger Sadulur')
                .setDescription(`> Menghapus semua antrian dan keluar dari voice channel.`)
                .setColor("ffffff")
                .setTimestamp(Date.now())
                .setFooter({
                    iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
                    text: "White Tiger Sadulur"
                })
            ]
        })
    }
}