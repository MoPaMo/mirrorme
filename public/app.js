let vm = Vue.createApp({
  data() {
    return {
      
      msgs: [
        {
          author: "Cicero",
          text: "Lorem Ipsum",
          date: "dies",
          id: "159985870458322944",
          img:
            "https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.png?size=128",
        },
        {
          author: "Cicero",
          text: "Lorem Ipsum",
          date: "dies",
          id: "159985870458322944",
          img:
            "https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.png?size=128",
        },
        {
          author: "Cicero",
          text: "Lorem Ipsum",
          date: "dies",
          id: "159985870458322944",
          img:
            "https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.png?size=128",
        },
        {
          author: "Cicero",
          text: "Lorem Ipsum",
          date: "dies",
          id: "159985870458322944",
          img:
            "https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.png?size=128",
        },
      ],
      loading: true,
      load_reason:"Starting app…"
    };
  },
  mounted() {
    var socket = io();
    this.load_reason="Establishing a connection…"
    socket.on('connect', (socket) => {
  console.log('a user connected');
  this.loading = false;
});
    
  },
}).mount("#main");
