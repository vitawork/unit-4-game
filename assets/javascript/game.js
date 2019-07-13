$(document).ready(function() {
  var attacknumbers = 0;
  var yourch = {};
  var defenderch = {};
  var audio = new Audio(
    "https://ia801309.us.archive.org/28/items/HarryPotter-hedwigTheme/Harry_Potter_Theme_Song_Hedwigs_Theme.mp3"
  );
  audio.play();

  var characters = [
    {
      name: "Harry",
      srcrt: "assets/images/1.png",
      hpoints: 200,
      apower: 10,
      capower: 25
    },
    {
      name: "Hermione",
      srcrt: "assets/images/2.png",
      hpoints: 180,
      apower: 8,
      capower: 17
    },
    {
      name: "Roy",
      srcrt: "assets/images/3.png",
      hpoints: 150,
      apower: 6,
      capower: 16
    },
    {
      name: "Snape",
      srcrt: "assets/images/4.png",
      hpoints: 190,
      apower: 8,
      capower: 20
    },
    {
      name: "Voldemort",
      srcrt: "assets/images/5.png",
      hpoints: 210,
      apower: 9,
      capower: 22
    },
    {
      name: "Dumbledore",
      srcrt: "assets/images/6.png",
      hpoints: 190,
      apower: 8,
      capower: 25
    }
  ];

  function reset() {
    attacknumbers = 0;
    yourch = {
      name: "",
      srcrt: "",
      hpoints: 0,
      apower: 0,
      capower: 0
    };
    defenderch = {
      name: "",
      srcrt: "",
      hpoints: 0,
      apower: 0,
      capower: 0
    };

    $("#you").empty();
    $("#you").html("<h5>");
    $("#you h5").text("Choose a character");
    $("#you h5").css("margin-top", "45%");

    $("#defender").empty();

    creating_characters(); /////creating characters

    ///////clicking characters
    var chdiv = $("#characters div");
    for (let h = 0; h < chdiv.length; h++) {
      $(chdiv[h]).on("click", function(e) {
        if (yourch.name === "") {
          $(this).remove();
          yourch = Object.assign({}, characters[h]);
          $("#you").empty();
          creating_a_character(yourch, "#you");
          $("#you img").css("width", "65%");
          $("#you p").text("Health: " + yourch.hpoints);
          $("#defender").empty();
          $("#defender").html("<h5>");
          $("#defender h5").text("Choose another character");
          $("#defender h5").css("margin-top", "45%");
        } else {
          if (defenderch.name === "") {
            $(this).remove();
            defenderch = Object.assign({}, characters[h]);
            $("#defender").empty();
            creating_a_character(defenderch, "#defender");
            $("#defender img").css("width", "65%");
            $("#defender p").text("Health: " + defenderch.hpoints);
          }
        }
      });
    }
  }
  reset(); ////reseating to star

  /////creating dinamicaly a character
  function creating_a_character(character, divid) {
    var pict = $("<img>");
    pict.attr("src", character.srcrt);
    pict.attr("class", "cpict");
    var p = $("<p style='margin: 0'>");
    p.text(character.hpoints);

    var div = $("<div >");
    div.attr("id", character.name);
    div.append(pict);
    div.append(p);

    $(divid).append(div);
  }

  ////creating all characters available
  function creating_characters() {
    $("#characters").empty();
    for (let i = 0; i < characters.length; i++) {
      creating_a_character(characters[i], "#characters");
      $("#" + characters[i].name).css({
        width: "30%",
        margin: "5px",
        float: "left"
      });
    }
  }

  //////button attack
  $("button").on("click", function() {
    if (yourch.hpoints > 0 && defenderch.hpoints > 0) {
      /////Attacking
      attacknumbers++;

      yourch.hpoints -= defenderch.capower;
      if (yourch.hpoints > 0) {
        $("#you  p").text("Health: " + yourch.hpoints);
      } else {
        $("#you  p").text("Health: 0");
      }

      defenderch.hpoints -= yourch.apower * attacknumbers;
      if (defenderch.hpoints > 0) {
        $("#defender  p").text("Health: " + defenderch.hpoints);
      } else {
        $("#defender  p").text("Health: 0");
      }

      //////checking if loose, won or tie
      if (yourch.hpoints <= 0) {
        if (defenderch.hpoints <= 0) {
          ////////tie, restarting game
          $("#divcentral div").hide();
          $("#divcentral").css("min-height", "500px");
          $("#divcentral").append("<h1>Tie</h1>");
        } else {
          /////loss, restarting game
          $("#divcentral div").hide();
          $("#divcentral").css("min-height", "500px");
          $("#divcentral").append("<h1>You Lost</h1>");
        }

        setTimeout(function() {
          $("#divcentral h1").remove();
          $("#divcentral div").show();
          reset();
        }, 3000);
      } else {
        if (defenderch.hpoints <= 0) {
          if ($("#characters div").length === 0) {
            /////Win Win Win
            $("#divcentral div").hide();
            $("#divcentral").css("min-height", "500px");
            $("#divcentral").append("<h1>You WIN</h1>");
            setTimeout(function() {
              $("#divcentral h1").remove();
              $("#divcentral div").show();
              reset();
            }, 3000);
          } else {
            /////// defeated, next

            $("#defender").html("<h4>DEFEATED</h4>");
            $("#defender h4").css("margin-top", "25%");
            $("#defender").append("<h6>");
            $("#defender h6").text("Choose another character");
            defenderch = {
              name: "",
              srcrt: "",
              hpoints: 0,
              apower: 0,
              capower: 0
            };
          }
        }
      }
    }
  });

  console.log();
});
