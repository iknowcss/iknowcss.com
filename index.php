<!-- Header -->

<? include('./public/php/header.php'); ?>

  <script src="public/js/controller/parallax-header.js"></script>
  <div id="parallax-mirror"
      data-bind="controller: 'parallax-header',
                 controllerParams: { imgHeight: 1933, imgWidth: 4597 }">
    <img class="slider" src="public/img/potts-xs.jpg"/>
    <img class="slider" data-bind="attr: { src: sliderSrc }"/>
    <div class="slider-overlay">
      <div class="logo">
        <img src="public/img/logo-circle.png">
      </div>
      <h1 class="title">Cody Jenkins</h1>
    </div>
  </div>

  <!-- Nav -->

  <script src="public/js/controller/main-nav.js"></script>
  <nav id="main-nav"
      data-bind="controller: 'main-nav'">
    <div class="container"><div class="row">
      <div class="col-xs-12">
        <ul>
          <li>Cody Jenkins</li>
        </ul>
      </div>
    </div></div>
  </nav>

  <!-- Main -->

  <main id="main-home">

  <!-- Portfolio overview -->

  <section class="portfolio-section container text-center">
    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        Hi there! My name is Cody Jenkins. I'm a full-stack web developer.
      </p>
    </div>

    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        I just moved to Sydney from Californa.
      </p>
    </div>

    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        I'm passionate about quality code and love to turn dreams into reality.
      </p>
    </div>
<!--
    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        I'm a tenatious developer; I work with a problem until it's solved.
        Even when I step away I can't help but think about the problem at hand.
      </p>
    </div>

    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        I improve code wherever it makes sense.
        When I find an area that needs improvement, I clean it up so others benefit from it.
      </p>
    </div>

    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        When I don't know how to do something, I learn it.
        If my task can benefit from a new technology or skill, I learn what I need and apply it.
      </p>
    </div>

    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        I communicate easily with everyone, both technical and non-technical.
        To have a good idea is not enough; others must understand it to embrace it and refine it.
        I speak to my audience so that everyone understands.
      </p>
    </div>

    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        I care about the quality of the product and the efficiency of the development process.
        I write code to solve problems. If it doesn't improve the customer's life, I haven't done my job.
      </p>
    </div>

    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        I hold myself and others to the standards we set for ourselves.
        If we slide on our commitments to ourselves, I am not shy about speaking up.
        It's easier to stay on track when we're honest with ourselves.
      </p>
    </div>

    <hr>

    <div class="row">
      <p class="col-xs-12
                col-sm-10 col-sm-push-1
                col-md-8 col-md-push-2">
        I don't take myself too seriously.
        I learn more when I make a mistake than when I don't.
        I'm honest with myself and others when I get it wrong so I can get it right next time.
      </p>

    </div>

-->

  </section>

  <!-- Skills chart -->

  <script src="public/js/controller/skill-chart.js"></script>
  <section class="container" data-bind="controller: 'skill-chart'" style="display:none">
    <div class="row">
      <p class="col-xs-12">
        
      </p>
    </div>

    <div class="row">
      <nav class="col-md-10 col-md-push-1">
        <ul id="skill-tabs"
            class="nav nav-tabs nav-justified"
            data-bind="foreach: groups">
          <li data-bind="css: $data === $parent.activeGroup() ? 'active' : ''">
            <a href="#"
                data-bind="text  : $data,
                           click : $parent.selectGroup"></a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="row">
      <div class="col-xs-12
                  col-sm-10 col-sm-push-1">
        <svg id="skill-svg" height="0" width="100%"></svg>
      </div>
    </div>
    <script src="public/js/skills.js"></script>
    <script src="vendor/d3/d3.js"></script>
    <script src="public/js/skill-chart.js"></script>
  </section>

  <!-- Whitespace -->

  <div class="container">
    <? for ($i = 0; $i < 20; $i++) { ?>
    <div class="row">
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
    </div>
    <? } ?>
  </div>

  </main>

  <!-- Footer -->

<? include('./public/php/footer.php'); ?>