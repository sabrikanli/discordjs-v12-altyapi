/*
* @type: Module
* @description: 'discord.js' modülünü tanımla.
* @version: 12.2.0
*/
const Discord = require("discord.js");



/*
* @type: Object
* @description: 'discord.js' modülünün içerisinden Client tanımla. Bu discord içerisindeki botumuz anlamına geliyor.
*/
const client = new Discord.Client();



/*
* @type: Function
* @description: './events/' dosyasındaki etkinlikleri tanımlar. 
* Örneğin klasör içerisinde 'guildMemberAdd.js' oluşturursanız, 'guildMemberAdd' etkinliğinde yapılacaklar o dosya içerisindeki kodlar olur.
* Bunun için bir örnek klasör içerisinde yer alıyor.
*/
require("./eventHandler/load_events.js")(client)

/*
* @type: Collection [Map] (Object)
* @description: Komutlar hakkında verileri saklayacağımız bir obje oluştur.
*/
client.commands = new Discord.Collection();



/*
* @type: Shortcut (Object)
* @description: 'client_settings.json' dosyasındaki ayarları tanımlar.
*/
client.ayarlar = require("./client_settings.json");



/*
* @type: Collection [Map] (Object)
* @description: Komutlar'ın aliaslarını (diğer isimlerini) saklayan obje oluştur.
*/
client.aliases = new Discord.Collection();



/*
* @type: String
* @description: '.env' dosyasından TOKEN değişkenini çağırır/tanımlar.
* @note: .env dosyasını kontrol edin.
*/
const token = process.env.TOKEN;



/*
* @type: Module
* @description: Komutları başka dosyada kullanabilmek için 'fs' modülünü tanımla.
* @version: 0.0.2
*/
const fs = require("fs");



/*
* @type: Function
* @description: 'komutlar' klasöründeki dosyaları 'client.commands' ve 'client.aliases' içerisinde kaydeder.
*/
fs.readdir("./komutlar/", (err, files) => {
  if (err) throw new Error("Görünüşe göre belirtilen klasörün yolu doğru değil veya klasör yok.")
  console.log(`${files.length} komut, "./komutlar/" klasörü içerisinden yüklenecek.`);
  files.forEach(f => {
    const props = require(`./komutlar/${f}`);
    console.log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});



/*
 * @type: Function
 * @description: Uygulamanıza giriş yapar. Bunun için .env dosyasındaki tokeni doğru yazdığınızdan emin olun.
*/
client.login(process.env.TOKEN)
.then(() => { // Başarıyla giriş yaptığında tetikleniyor.
  /*
  * Başarıyla giriş yaptığında buradaki işlemler gerçekleşecek.
  */
  console.log(`[Discord]: Başarıyla '${client.user.tag}' uygulamasına giriş yapıldı.`) // Konsola bilgilendirme mesajı gönder.
})
.catch(async function(err) { // Hata yakaladığında tetikleniyor.
  /*
  * Hata yakaladığında yukarıdaki kısım atlanacak ve direkt buradaki işlemler gerçekleşecek.
  */
  if (err.message === "An invalid token was provided.") {
    throw new Error("Geçersiz bir token girildi, doğruluğunu kontrol edin.") // Konsola hatanın türkçeleştirilmiş versiyonunu gönder.
  }  
});