
<?php include "data.php"; ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

    <!-- FONTS: -->

    <!-- https://fonts.google.com/specimen/Montserrat -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700&display=swap" rel="stylesheet">
    <!-- https://fonts.google.com/specimen/Roboto -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet">

    <style media="screen">

    /* COLOURS: */

    .Bg_Pink {background-color: #FF4E50;}
    .Co_Pink {color: #FF4E50;}
    .Bo_2Pink {border: solid 2px #FF4E50}
    .BoTo_2Pink {border-top: solid 2px #FF4E50}
    .Ho_Bg_Pink:hover {background-color: #FF4E50;}


    .Bg_Green {background-color: #18D4CA;}
    .Bg_Orange {background-color: #FFA710;}
    .Bg_Purple {background-color: #667DF3;}
    .Co_White {color: white;}
    .Ho_Co_DarkWhite:hover {color: hsl(255,100%,95%);}
    .Ho_Co_White:hover {color: white;}
    .Bo_2White {border: solid 2px white}
    .Co_White {color: solid 2px white}
    .Ho_Bg_White:hover {background-color: white}
    /* (Headings) */
    .Co_DarkGrey {color: #444444;}
    .Ho_Co_DarkGrey:hover {color: #444444;}
    .Bg_Grey {background-color: #666666;}

    /* Bo-2White Co_White Ho_Bg_White Ho_Co_Grey */

    .BaPo_CeTo {background-position: center top; }

    .BoRa_1000 {border-radius: 1000px;}
    .PaLe_17 {padding-left: 17px;}
    .PaRi_17 {padding-right: 17px;}
    .PaTo_5 {padding-top: 5px;}
    .PaBo_5 {padding-bottom: 5px;}
    .FoSi_14 {font-size: 12px;}
    .Pa_9p5 {padding:9.5px;}
    /* .Ho_Bg_DarkPink:hover {background-color: hsl(359, 100%, 65%)} */
    .Ho_Bg_DarkPink:hover {background-color: rgb(195, 59, 61)}
    .FoFa_Mo {font-family: 'Montserrat', sans-serif;}
    .FoFa_Ro {font-family: 'Roboto', sans-serif;}
    .FoWe_300 {font-weight: 300;}
    .FoWe_400 {font-weight: 400;}
    .FoWe_500 {font-weight: 500;}
    .FoWe_600 {font-weight: 600;}
    .FoWe_700 {font-weight: 700;}
    .PaRi_15 {padding-right: 15px;}
    .PaLe_15 {padding-left: 15px;}
    .PaTo_7 {padding-top: 6px;}
    .PaBo_7 {padding-bottom: 6px;}
    .LeSp_p2 {letter-spacing: 0.4px;}
    .Co_WhiteTrans75 {color: rgba(255,255,255,75%);}
    .Co_BlackTrans50 {color: rgba(0,0,0,50%);}
    .Co_BlackTrans30 {color: rgba(0,0,0,30%);}
    @media (max-width:991.98px){
      .MeMaWi992_TeAl_Ce {text-align:center;}
    }
    .TeAl_Ce {text-align:center;}
    .BaIm_Burger {background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");}


    </style>
  </head>
  <body>
    <div class="container-fluid fixed-top FoFa_Mo FoWe_500 LeSp_p2" style="position: absolute;">
      <div class="row">
        <div class="col-lg-8 offset-lg-2 Pa_9p5 " style="padding-top:37px;">
          <nav class="navbar navbar-expand-lg" style="padding:0;">
            <a class="d-flex align-items-center" href="#">
              <img class="" style="filter:invert(100%); width:135px;" src="<?php echo $data["children"][0]["row2"] ?>" alt="">

            </a>
            <a href="" class=" d-md-block d-lg-none rounded" data-toggle="modal" data-target="#myModal" style="border: solid 1px rgba(255,255,255,.1); padding: 5px 10px; font-size: 20px;">
              <span class="navbar-toggler-icon BaIm_Burger"></span>
            </a>



            <div class="d-none d-lg-block ml-auto">

              <ul class="navbar-nav  ">
                <?php foreach ($data["children"][0]["children"] as $key => $value): ?>
                  <li class="nav-item PaRi_15 d-flex align-items-center">
                    <a class="nav-link PaTo_5 PaBo_5 FoSi_14 Co_White Ho_Co_DarkWhite" href="#">
                      <?php echo $value ?>
                    </a>
                  </li>
                <?php endforeach; ?>

                <li class="nav-item d-flex align-items-center" style="padding-right: 40px; padding-left: 2px;">
                  <a class="btn BoRa_1000 Bo_2White Co_White Ho_Bg_White Ho_Co_Grey FoFa_Mo FoSi_14 Co_White FoWe_500 PaTo_7 PaBo_7 PaRi_15 PaLe_15 " href="#">
                    <?php echo $data["children"][0]["row3"] ?>
                  </a>
                </li>
              </ul>
            </div>

          </nav>
        </div>
      </div>


    </div>

    <div class="container-fluid text-white BaPo_CeTo  FoFa_Mo " style="background-image: url('assets\\headerBackground.jpg'); background-size: cover; background-repeat: no-repeat;">
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <div class="d-flex " style="height: 104vh !important;">
                <div class="align-self-center ml-auto mr-auto text-center">
                  <div class="FoFa_Mo FoWe_700" style="font-size: 47px; line-height: 60px; padding-top: 0px;">
                    <?php echo $data["children"][2]["row2"] ?>
                  </div>

                  <div class="FoFa_Ro FoWe_300 LeSp_p2 Co_WhiteTrans75" style="font-size: 22px; padding-top: 15px; padding-bottom: 30px;">
                    <?php echo $data["children"][2]["row3"] ?>
                  </div>

                  <div class="btn BoRa_1000 Ho_Bg_DarkPink Bg_Pink Co_White Ho_Co_White FoFa_Mo FoWe_700 FoSi_14 " style="padding: 8px 22px;">
                    <?php echo $data["children"][2]["row4"]?>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <br>
    <br>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="d-flex row">
            <div class="col-lg-12 text-center " >
              <h5  class="FoWe_700 FoFa_Mo Co_DarkGrey">
                <?php echo $data["children"][3]["row2"] ?>
              </h5>
              <br>
            </div>
            <?php foreach ($data["children"][3]["children"] as $key => $value): ?>
              <div class="col-lg-3 Pa_9p5">
                <div class="text-center">
                  <div class="d-flex">
                    <div class="position-relative ml-auto mr-auto">
                      <img class="rounded-circle" src="<?php echo $value["row1"] ?>" alt="" style="width:113px;">
                      <div class="position-absolute " style="bottom:-4px;right:-4px; ">
                        <div class="<?php echo $value["row5"] ?> rounded-circle" style="height:38px; width: 38px; border:white solid 4px;">
                          <img class="" style="filter:invert(100%);" src="<?php echo $value["row2"] ?>" alt="">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div  style="font-size: 12px; padding: 10px 0;" class="FoWe_700 FoFa_Mo Co_DarkGrey">
                    <?php echo $value["row3"] ?>
                  </div>

                  <div class="FoFa_Ro FoWe_300 Co_BlackTrans50" style="font-size: 13px;">
                    <?php echo $value["row4"] ?>
                  </div>
                </div>
              </div>
            <?php endforeach; ?>
            <div class="col-lg-12">
              <div class="text-center ml-auto mr-auto">
                <br>
                <div class="btn BoRa_1000 Bo_2Pink Co_Pink Ho_Bg_Pink Ho_Co_White FoWe_700 FoFa_Mo FoSi_14" style="padding: 8px 22px;">
                  <?php echo $data["children"][3]["row3"] ?>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <br>
    <br>

    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="row">

            <div class="col-lg-12 text-center">
              <h5  class="FoWe_700 FoFa_Mo Co_DarkGrey">
                <?php echo $data["children"][4]["row2"] ?>
              </h5>
            </div>
            <?php foreach ($data["children"][4]["children"] as $key => $value): ?>
              <div class="<?php echo $value["row3"] ?> Pa_9p5" >
                <div class=" <?php echo $value["row4"] ?>">
                  <?php if ($value["row4"]=="text-white"): ?>
                    <?php $TexBg = "75%" ?>
                  <?php else: ?>
                    <?php $TexBg = "100%" ?>
                  <?php endif; ?>
                  <!-- <img class="card-img" src="<?php echo $value["row1"] ?>" alt="Card image" style="filter:brightness(<?php echo $TexBg ?>);"> -->

                  <div class="card-img d-flex rounded " style="height: 280px; filter:brightness(<?php echo $TexBg ?>); background-position: center center; background-size: cover; background-repeat: no-repeat; background-image: url('<?php echo addslashes($value["row1"]) ?>');"></div>
                  <div class="card-img-overlay d-flex">
                    <h5 class="card-title align-self-center ml-auto mr-auto text-center FoWe_700 FoFa_Mo ">
                      <?php echo $value["row2"] ?>
                    </h5>
                  </div>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
    <div class="BoTo_2Pink"></div>
    <br>
    <div class="container-fluid ">

      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="row MeMaWi992_TeAl_Ce">
            <div class="col-lg-3 Pa_9p5" >
              <img class="" style="width: 110px;" src="<?php echo $data["children"][1]["row2"] ?>" alt="">
            </div>
            <?php foreach ($data["children"][1]["children"] as $key => $value): ?>
              <div class="col-lg-3 Pa_9p5"  >

                <h5  class="FoWe_700 FoFa_Mo Co_DarkGrey" style="font-size: 13px;">
                  <?php echo $value["row1"] ?>
                </h5>
                <div class="FoFa_Ro FoWe_300 Co_BlackTrans30" style="font-size:13px; line-height:25px; padding-bottom: 10px;">
                  <?php foreach ($value["children"] as $key => $value2): ?>
                    <div class="">
                      <?php echo $value2 ?>
                    </div>
                  <?php endforeach; ?>

                  <?php if (isset($value["row2"])): ?>
                    <div class="Co_Pink">
                      <?php echo $value["row2"] ?>
                    </div>
                  <?php endif; ?>

                </div>

              </div>

            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
    <div class="" modals>

      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">

                <div class="col-lg-3 Pa_9p5" >
                  <img class="" style="width: 110px;" src="<?php echo $data["children"][1]["row2"] ?>" alt="">
                </div>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body TeAl_Ce">
              <div class="row MeMaWi992_TeAl_Ce">



                  <div class="col-lg-3 Pa_9p5"  >
                    <div class="FoFa_Ro FoWe_300 Co_BlackTrans30" style="font-size:13px; line-height:25px; padding-bottom: 10px;">
                      <?php foreach ($data["children"][0]["children"] as $key => $value): ?>
                        <div class="">
                          <?php echo $value ?>
                        </div>
                      <?php endforeach; ?>
                      <div class="Co_Pink">
                        <?php echo $data["children"][0]["row3"] ?>
                      </div>
                    </div>
                  </div>
              </div>

              <br>
            </div>
          </div>
        </div>
      </div>
    </div>



  </body>
</html>
