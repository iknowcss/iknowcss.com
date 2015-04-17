<!-- Header -->

<? include('./public/php/header.php'); ?>

<div id="mirror">
  <!-- <img src="public/img/coronado.png"/> -->
</div>

<!-- Main -->

<main id="main-home">

<header class="jumbotron text-center">
  <h1>Cody Jenkins</h1>
  <p>I love to play with code. You have great ideas.</p>
  <p>Let's build something together</p>
</header>

<!-- Portfolio overview -->

<section class="container">
  <div class="row">
    <p class="col-xs-12">
      I have 10 years of experience developing quality web applications for
      businesses and individuals. 

      <!--

      Why am I a great developer?

      - I'm tenatious; I work with a problem until it's solved
        + Sometimes I struggle to stop for a break
        + When I do pull away, I can't help but think about the problem at hand
      - I improve the code wherever it makes sense and where time permits
        + If I'm confused about a block of code, others likely are, too
        + When I find an area that needs improvement, I clean it up so others benefit from it
      - When I don't know how to do something, I learn it
        + If my task can benefit from a new technology or skill, I learn what I need and apply it
      - I communicate easily with both technical and non-technical peers
        + To have a good idea is not enough; others must understand it to embrace it and refine it
        + Comprehension is crucial to me; I speak to my audience so that everyone understands
      - I care about the quality of the product and the efficiency of the development process
        + I write code to solve problems; if it doesn't improve the customer's life, I haven't done my job
        + If we get tripped up by the same 
      - I hold myself and others to the standards we set for ourselves
        + If we slide on our commitments to ourselves, I am not shy about speaking up
        + It's easier to stay on track when we're honest with ourselves
      - I don't take myself too seriously
        + I learn more when I make a mistake than when I don't
        + I'm honest with myself and others when I get it wrong so I can get it right next time

      -->

      
    </p>
  </div>

  <div class="row">
    <pre class="col-xs-12"></pre>
  </div>
</section>

<!-- Skills chart -->

<section class="container">
  <div class="row">
    <p class="col-xs-12">
      I've worked with a lot of technology over the years. Here's a brief
      overview of my experience.
    </p>
  </div>
  <div class="row">
    <div id="skill-buttons"
        class="col-xs-12
               col-sm-10 col-sm-push-1
               col-lg-8 col-lg-push-2">

    </div>
  </div>
  <div class="row">
    <div class="col-xs-12
                col-sm-10 col-sm-push-1
                col-lg-8 col-lg-push-2">
      <svg id="skill-svg" height="0" width="100%"></svg>
    </div>
  </div>
  <script src="public/js/skills.js"></script>
  <script src="vendor/d3/d3.js"></script>
  <script src="public/js/skill-chart.js"></script>
  <script src="public/js/page/index.js"></script>
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