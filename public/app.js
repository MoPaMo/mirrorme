let vm=Vue.createApp({
  data() {
    return {
      msgs: [{ author: "Cicero", text: "Lorem Ipsum", date: "dies", id:'159985870458322944' },
      { author: "Cicero", text: "Lorem Ipsum", date: "dies", id:'159985870458322944' },
      { author: "Cicero", text: "Lorem Ipsum", date: "dies", id:'159985870458322944' },
      { author: "Cicero", text: "Lorem Ipsum", date: "dies", id:'159985870458322944' }],
      loading:true
    };
  },
  mounted(){
      this.loading=false;
  }
}).mount("#main");
