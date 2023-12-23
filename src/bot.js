require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
} = require("discord.js");
const { Player } = require("discord-player");
const fs = require("fs");
const Sticky = require("./schemas/sticky");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.player = new Player(client);
client.commandArray = [];
client.player.extractors.loadDefault();

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.on('messageCreate', async (message) => {
  try {
    const data = await Sticky.findOne({ ChannelID: message.channel.id });
    if (!data) return;

    let channel = data.ChannelID;
    let cachedChannel = client.channels.cache.get(channel);

    let string = data.Message;
    string = string.replace(/\\n/g, "\n");

    const embed = new EmbedBuilder()
      .setColor("White")
      .setDescription(string)
      .setFooter({ text: "White Tiger Sadulur • Sticky Message" });

    if (message.channel.id === channel) {
      data.CurrentCount += 1;
      data.save();

      if (data.CurrentCount == data.MaxCount) {
        try {
          await client.channels.cache
            .get(channel)
            .messages.fetch(data.LastMessageID)
            .then(async (m) => {
              await m.delete();
            });

          let newMessage = await cachedChannel.send({ embeds: [embed] });

          data.LastMessageID = newMessage.id;
          data.CurrentCount = 0;
          data.save();
        } catch (err) {
          console.log(err);
          return;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

client.handleEvents();
client.handleComponents();
client.handleCommands();
client.login(token);
(async () => {
  await connect(databaseToken).catch(console.error);
})();
