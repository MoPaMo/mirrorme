module.exports = {
  html_render: function (string) {
    return (
      ```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>mirrorme | a discord bot</title>
  <link rel="stylesheet" href="/indexstyles.css">
  <link rel="stylesheet" href="/icons.css">
  <link rel="icon" type="image/svg+xml" href="/ico.svg">
  <link rel="alternate icon" href="/fav.ico">
  <link rel="mask-icon" href="/ico.svg" color="#000">
</head>

<body>
  <nav class="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item title" href="https://mirror.mopamo.repl.co">
        mirrorme </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/#about"> About </a>
        <a class="navbar-item" href="/docs"> Docs </a>
        <a class="navbar-item" href="/tos">Code of conduct</a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary"
              href="https://discord.com/oauth2/authorize?client_id=835079528770043925&scope=bot&permissions=2147900481&response_type=code&redirect_uri=https%3A%2F%2Fmirror.mopamo.repl.co%2Ffinish">
              <strong>Invite</strong>
            </a>
            <a class="button is-light" target="_blank" href="https://github.com/MoPaMo/mirrorme">Contribute</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <br /><br /><br />
``` +
      string +
      ```
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>mirrorme</strong> by <a href="https://mopamo.github.io">MoPaMo</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
      <div class="columns">
        <div class="column">
          <a href="https://discord.com/oauth2/authorize?client_id=835079528770043925&scope=bot&permissions=2147900481&response_type=code&redirect_uri=https%3A%2F%2Fmirror.mopamo.repl.co%2Ffinish"
            class="has-text-dark button is-light">Invite mirrorme</a>
        </div>
        <div class="column">
          <a href="/docs" class="has-text-dark">Docs</a><br />
          <a href="https://github.com/MoPaMo/mirrorme" class="has-text-dark"><span class="icon">
              <i class="icon-github"></i>
            </span>GitHub</a>
        </div>
        <div class="column">
          <a href="/license" class="has-text-dark">License</a> <br />
          <a href="/tos" class="has-text-dark">Code of Conduct</a>
        </div>
        <div class="column">
          <a href="https://stats.uptimerobot.com/BErLNFVkyE/787978795" class="has-text-dark">Status</a> <br />
          <a href="https://replit.com" class="has-text-dark">Hosted on replit.com</a>
        </div>
      </div>
    </div>
  </footer>
  <script>
    document.addEventListener('DOMContentLoaded', () => {

      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

          });
        });
      }

    });</script>
</body>

</html>
```
    );
  },
};
