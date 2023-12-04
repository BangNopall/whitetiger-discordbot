const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Mainkan musik dari YouTube")
		.addSubcommand(subcommand =>
			subcommand
				.setName("search")
				.setDescription("Cari lagu dan mainkan")
				.addStringOption(option =>
					option.setName("keywords").setDescription("Cari keywords").setRequired(true)
				)
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("playlist")
				.setDescription("Mainkan playlist dari Youtube")
				.addStringOption(option => option.setName("url").setDescription("Link playlist youtube").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("song")
				.setDescription("Mainkan single lagu dari Youtube")
				.addStringOption(option => option.setName("url").setDescription("Link lagu youtube").setRequired(true))
		),
    async execute(interaction, client) {
        const player = useMainPlayer();
        // Make sure the user is inside a voice channel
		if (!interaction.member.voice.channel) return interaction.reply({
			embeds: [ new EmbedBuilder()
				.setDescription("Anda harus berada di voice channel untuk memutar musik")
			],
			ephemeral: true
		});

        // Create a play queue for the server, get guild id
		const queue = player.nodes.create(interaction.guild.id);

        // Wait until you are connected to the channel
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            
            // Search for the song using the discord-player
            const result = await player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })

            // finish if no tracks were found
            if (result.tracks.length === 0){
                return interaction.reply({
                    content: `Tidak ada hasil yang ditemukan`,
                    ephemeral: true
                })
            };

            // Add the track to the queue
            const song = result.tracks[0]
            queue.addTrack(song)
            embed
                .setTitle('Musik Player - White Tiger Sadulur')
                .setDescription(`> Lagu berhasil ditambahkan ke dalam antrian\n\n> Judul : [${song.title}](${song.url})\n> Artist : ${song.author}\n> Durasi : ${song.duration}\n> Requested By : <@${song.requestedBy.id}>`)
                .setThumbnail(`${playlist.thumbnail}`)
                .setColor("ffffff")
                .setTimestamp(Date.now())
                .setFooter({
                    iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
                    text: "White Tiger Sadulur"
                })
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})

		}else if (interaction.options.getSubcommand() === "playlist") {

            // Search for the playlist using the discord-player
            let url = interaction.options.getString("url")
            const result = await player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0){
                return interaction.reply({
                    content: `Tidak ada hasil yang ditemukan dengan link tersebut`,
                    ephemeral: true
                })
            };
            
            // Add the tracks to the queue
            const playlist = result.playlist
            queue.addTrack(result.tracks)
            embed
                .setTitle('Musik Player - White Tiger Sadulur')
                .setDescription(`> **${result.tracks.length} lagu** berhasil ditambahkan ke dalam antrian dari playlist\n\n> Playlist : [${playlist.title}](${playlist.url})\n> Creator ${playlist.author.name}`)
                .setThumbnail(`${playlist.thumbnail}`)
                .setColor("ffffff")
                .setTimestamp(Date.now())
                .setFooter({
                    iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
                    text: "White Tiger Sadulur"
                })

		}else if (interaction.options.getSubcommand() === "search") {

            // Search for the song using the discord-player
            let url = interaction.options.getString("keywords")
            const result = await player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            // finish if no tracks were found
            if (result.tracks.length === 0){
                return interaction.reply({
                    content: `Tidak ada hasil yang ditemukan`,
                    ephemeral: true
                })
            };
            // Add the track to the queue
            const song = result.tracks[0]
            queue.addTrack(song)

            console.log(song);

            embed
                .setTitle('Musik Player - White Tiger Sadulur')
                .setDescription(`> Lagu berhasil ditambahkan ke dalam antrian\n\n> Judul : [${song.title}](${song.url})\n> Artist : ${song.author}\n> Durasi : ${song.duration}\n> Requested By : <@${song.requestedBy.id}>`)
                .setThumbnail(`${song.thumbnail}`)
                .setColor("ffffff")
                .setTimestamp(Date.now())
                .setFooter({
                    iconURL: "https://cdn.discordapp.com/attachments/1155437160678314094/1155437850821656596/dtfyguiho.png?ex=656311da&is=65509cda&hm=c30ef98ca6f94f0365a76a98b9f6dae8e57a72ac6cb8d2cb38dca0c05bb7d7c1&",
                    text: "White Tiger Sadulur"
                })
		}

        // Play the queue if it's not playing
        if (!queue.isPlaying()){
            queue.node.play();
        }

        await interaction.reply({
            embeds: [embed]
        })
    }
}