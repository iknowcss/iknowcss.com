<? include('./public/php/header.php'); ?>


<div id="mirror">
  <!-- <img src="public/img/coronado.png"/> -->
</div>

<main id="main-home">


<p>Cody Jenkins</p>

<p>iknowCSS</p>






<section class="container">
  <div class="row">
    <p class="col-xs-12">Here's my professional development timeline</p>
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
      <svg id="skill-svg" height="0"></svg>
    </div>
  </div>
  <script src="public/js/skills.js"></script>
  <script src="vendor/d3/d3.js"></script>
  <script src="public/js/skill-chart.js"></script>
  <script>
    (function () {
      var chart = ik.SkillChart({
        container: '#skill-svg',
        data: ik.skillData
      });

      var groups = [
        'Web',
        'Server Platforms',
        'Languages',
        'Source control',
        'Management tools',
        'IDEs',
        'OS',
        'Database',
        'Testing'
      ];

      var skillButtons = document.getElementById('skill-buttons');
      _.each(groups, function (groupName) {
        var element = document.createElement('button');
        element.innerText = groupName;
        skillButtons.appendChild(element);
        element.addEventListener('click', function () {
          chart.setSkillGroup(groupName);
        });
      });

      // chart.displaySkillGroup('Source control');
    }())
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