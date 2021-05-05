let vm = Vue.createApp({
  data() {
    return {
      msgs: [
        
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
  vm.msgs.push(msg)
});
