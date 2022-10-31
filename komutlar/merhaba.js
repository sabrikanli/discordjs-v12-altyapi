/*
* @type: Module
* @description: 'discord.js' modülünü tanımla.
* @version: 12.2.0
*/
const Discord = require("discord.js");

module.exports.run = async function (client, message, args) { // Command handler'ımızı buraya çağırabiliriz.
  
/*
* @URL: https://discordjs.guide/popular-topics/embeds.html
*/
const örnekEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff') // Renk Kodu (HEX)
	.setTitle('Başlık')
	.setURL(`Başlık URLsi`)
	.setAuthor('İsim', `Resim URLsi`, `Başlık Altı Yazı URLsi`)
	.setDescription('Açıklamalar')
	.setThumbnail(`Sağ Üstteki Resim URLsi`)
	.addField('Küçük yazı başlığı', 'Küçük yazı içeriği', true)
	.setImage(`Alttaki Büyük Resim`)
	.setTimestamp() // Küçük alt yazı sağında şuanki zamanı gösterir. Örneğin: (bugün saat 00:00)
	.setFooter('Küçük alt yazılar', `Küçük alt yazı resim URLsi`);

/*
* @type: Function
* @description: Mesajın/komutun yazıldığı kanala Embed gönder.
*/
message.channel.send({
 embed: örnekEmbed 
});
  
};

/*
* @type: Object
* @description: Komutumuzun ayarları burada yer alıyor.
*/
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["selam"] // Komutun diğer isimleri, bu haliyle hem 'merhaba' hem de 'selam' komutu kullanıldığında çalışacak.
}

/*
* @type: Object
* @description: Komutumuzun ayarları burada yer alıyor.
*/
module.exports.help = {
  name: "merhaba", // Komutu belirler. Şuanki haliyle !merhaba şeklinde olacaktır.
  description: "Selam verdiğinizde karşılık verir!"
}
