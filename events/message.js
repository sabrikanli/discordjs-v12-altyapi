/*
* @type: Function
* @description: Bu sadece message eventinde olacakları belirler. Diğer eventleri şu şekilde sıralayabiliriz:
* @EVENTS: (https://discord.js.org/#/docs/main/12.2.0/class/Client)
* channelCreate
* channelDelete
* channelPinsUpdate
* channelUpdate
* debug
* emojiCreate
* emojiDelete
* emojiUpdate
* error
* guildBanAdd
* guildBanRemove
* guildCreate
* guildDelete
* guildIntegrationsUpdate
* guildMemberAdd
* guildMemberRemove
* guildMembersChunk
* guildMemberSpeaking
* guildMemberUpdate
* guildUnavailable
* guildUpdate
* invalidated
* inviteCreate
* inviteDelete
* message
* messageDelete
* messageDeleteBulk
* messageReactionAdd
* messageReactionRemove
* messageReactionRemoveAll
* messageReactionRemoveEmoji
* messageUpdate
* presenceUpdate
* rateLimit
* ready
* roleCreate
* roleDelete
* roleUpdate
* shardDisconnect
* shardError
* shardReady
* shardReconnecting
* shardResume
* typingStart
* userUpdate
* voiceStateUpdate
* warn
* webhookUpdate
*/
module.exports = async message => {
  
  const client = message.client; // Uygulamamızı/istemcimizi buraya çağırdık.
  
  if (message.author.bot) return; // Komutumuzu kullanan kişi bot ise geriye dön ve işlemi iptal et.
  if (!message.guild) return; // Komutu sunucuda kullanmıyorsa işlemi iptal et.
  if (!message.content.startsWith(client.ayarlar.prefix)) return; // Komut prefix ile başlamıyor ise geriye dön ve işlemi iptal et.
  
  const command = message.content.split(" ")[0].slice(client.ayarlar.prefix.length); // Prefixi silip komutu al. "!selam" => "selam"
  const args = message.content.split(" ").slice(1); // Mesaj içeriğindeki kelimeleri Array içerisine koy => ["selam", "bu", "bir", "cümle"]
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)); // Komutu client.commands ve client.aliases içinde ara.
  
  if (!cmd) return; // Eğer komut bulunamazsa geri dön ve işlemi iptal et. Örneğin: !hello yazdı fakat hello diye bir komut yok.
  
  await cmd.run(client, message, args); // 3 sabit değişkeni komuta ver.
}

module.exports.conf = {
  event: "message"
}



