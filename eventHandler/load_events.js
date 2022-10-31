const reqEvent = (event) => require(`../events/${event}`);
const fs = require("fs");
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  fs.readdir("./events/", function (err, files) {
    console.log(`${files.length} etkinlik, './events/' klasörü içerisinden yüklenecek.`)
    files.forEach(file => {
      const Event = require(`../events/${file}`);
      console.log(`Yüklenen etkinlik: ${Event.conf.event}`)
      client.on(String(Event.conf.event), reqEvent(Event.conf.event))
    })
  });
};
