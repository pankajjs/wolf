const dotenv = require("dotenv");
const { HELLO } = require("./dtos/commands.ts");

dotenv.config({
    path: ".dev.vars"
});

const commands = [
   HELLO
];

async function registerCommands(appId, discordToken, commands) {
    const endpoint = `https://discord.com/api/v10/applications/${appId}/commands`
    try{
        const res = await fetch(endpoint, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bot ${discordToken}`,
            },
            method: 'PUT',
            body: JSON.stringify(commands),
          });
        if(!res.ok){
            console.error("Failed to register command");
            return;
        }
        console.log("Commands registered successfully");
    }catch(error){
        console.error(`Error while registering commands`, error);
    }
}

// Register slash commands
registerCommands(process.env.APP_ID, process.env.DISCORD_BOT_TOKEN, commands);
