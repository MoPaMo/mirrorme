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
      load_reason: "Starting app…",
      servername: "Loading name",
    };
  },
  mounted() {
    this.load_reason = "Establishing a connection…";
  },
}).mount("#main");
var socket = io();
socket.on('connect', (socket) => {
  console.log('connected to server');
  vm.loading = false;
>>>>>>> 1c7c470b991a50c9a46938b5409045182258e033
});
socket.on("error", (msg) => {
  open("/error", "_self");
});
socket.on("msg", (msg)=>{
  //vm.msgs.push({})
})
