const getD = (previous) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  console.log(previous);
  console.log(new Date(previous));
  var elapsed = new Date() - new Date(previous);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " s ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " m ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " h ago";
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " d ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " mo ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " y ago";
  }
};

fetch("https://api.github.com/users/MoPaMo/events", {
  method: "get",
})
  .then((response) => response.json())
  .then((jsonData) => {
    // console.log(jsonData);
    let data = jsonData.filter((a) => a.type == "PushEvent");
    let parent = document.getElementById("col"); //.innerHTML=data
    console.log(data);
    for (let i = 0; i < 3; i++) {
      let b = data[i].payload.commits[0],
        c = parent.children[i].children[0],
        a = `
          <h5 class=" is-size-7 has-text-weight-bold">
          <span class="icon">
            <i class="icon icon-book"></i>
          </span> ${data[i].repo.name}Read the docs
        </h5>
        <span class="is-size-7 icon-texthas-text-weight-light"><span class="icon">
        <i class="fas fa-clock"></i>
      </span>${data[i].created_at ? getD(data[i].created_at) : "no date provided :("
          }</span><br/><div class="is-size-6 is-size-5-widescreen">${b.message
          }</div>`;
      console.log(a);
      c.innerHTML = a.toString();
    }
  })
  .catch((err) => {
    //error block
  });
