const Discord = require("discord.js");
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS"]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function findOwner(members, interaction) {
    return members.find((x) => x?.user?.id === interaction.ownerId);
}

function isAdmin(optUser) {
    return optUser?.guildMember?.permissions?.has("ADMINISTRATOR");
}

client.on('threadCreate', async interaction => {
    interaction.members.fetch().then(members => {
            if (!isAdmin(findOwner(members, interaction))) {
                interaction.delete();
            }
        }
    )
});

client.login(process.env.TOKEN);