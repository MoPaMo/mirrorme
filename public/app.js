var socket = io();
let vm = Vue.createApp({
  data() {
    return {
      msgs: [],
      loading: false,
      load_reason: "Starting app…",
      servername: "Loading name",
      send_val: "",
    };
  },
  methods: {
    send_handle() {
      if (this.send_val.trim()) {
        console.log("Sending msg");
       socket.emit("msg", this.send_val, function (aw) {
          console.log(aw);
          this.send_val = "";
        });
        this.send_val = "";
      } else {
        console.log("Message was whitespace");
      }
    },
    share(){
      if (navigator.share) {
        navigator
          .share({
            title: "MirrorMe discord bot",
            text: "Check out MirrorMe, a free and open source discord bot!",
            url: "https://mirror.mopamo.repl.co/",
          })
          .then(() => console.log("Successful share"))
          .catch((error) =>
            open(
              "mailto:?subject=Check%20out%20mirrorme!&body=Mirrorme%20is%20a%20free%20and%20open%20source%20discord%20bot%20to%20mirror%20your%20server%20to%20the%20web%2C%20I%20already%20added%20it%20to%20my%20server%20myself!%20%0ACheck%20it%20out%3A%20https%3A%2F%2Fmirror.mopamo.repl.co%2F",
              "_self"
            )
          );
      } else {
        open(
          "mailto:?subject=Check%20out%20mirrorme!&body=Mirrorme%20is%20a%20free%20and%20open%20source%20discord%20bot%20to%20mirror%20your%20server%20to%20the%20web%2C%20I%20already%20added%20it%20to%20my%20server%20myself!%20%0ACheck%20it%20out%3A%20https%3A%2F%2Fmirror.mopamo.repl.co%2F",
          "_self"
        );
      }
    }
  },
  mounted() {
    this.load_reason = "Establishing a connection…";
  },
}).mount("#main");

socket.on("connect", (socket) => {
  console.log("connected to server");
  vm.loading = false;
});
socket.on("error", (msg) => {
  if (msg == "NotRegistered") {
    open("/error/register", "_self");
  } else {
    open("/error?reason=" + encodeURI(msg), "_self");
  }
});
socket.on("msg", (msg) => {
  vm.msgs.push(msg);
});
