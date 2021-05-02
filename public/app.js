let vm=Vue.createApp({
  data() {
    return {
      msgs: [{ author: "Cicero", text: "Lorem Ipsum", date: "dies" },
      { author: "Cicero", text: "Lorem Ipsum", date: "dies" },
      { author: "Cicero", text: "Lorem Ipsum", date: "dies" },
      { author: "Cicero", text: "Lorem Ipsum", date: "dies" }],
      loading:true
    };
  },
}).mount("#main");
