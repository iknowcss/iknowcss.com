<? include('./public/php/header.php'); ?>


<div id="mirror">
  <img src="public/img/coronado.png"/>
</div>

<main id="main-home">

Cody Jenkins

  iknowCSS


I know some other stuff, too

<section class="container">
  <div class="row">
    <div class="col-xs-12
                col-sm-10 col-sm-push-1
                col-lg-8 col-lg-push-2">
      <svg id="skill-svg" style="width: 100%; height: 200px; border: 1px solid black"></svg>
    </div>
  </div>
  <script src="public/js/skills.js"></script>
  <script src="vendor/d3/d3.js"></script>
  <script src="public/js/skill-chart.js"></script>
  <script>
    ik.SkillChart('#skill-svg', ik.skillData);
  </script>
</section>



  <ul>
    <li>iknowCSS
    <ul>
      <li>
      </li>
    </ul>
    </li>
  </ul>

  <div class="container">
    <? for ($i = 0; $i < 20; $i++) { ?>
    <div class="row">
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
      <div class="col-xs-4 col-sm-3 col-md-2 col-lg-1">&nbsp;</div>
    </div>
    <? } ?>
  </div>
</main>

<? include('./public/php/footer.php'); ?>