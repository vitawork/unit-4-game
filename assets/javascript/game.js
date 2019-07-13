$(document).ready(function() {
  var attacknumbers = 0;
  var yourch = {};
  var defenderch = {};

  var characters = [
    {
      name: "Harry",
      srcrt: "assets/images/1.jpg",
      hpoints: 140,
      apower: 10,
      capower: 30
    },
    {
      name: "Hermione",
      srcrt: "assets/images/2.jpg",
      hpoints: 110,
      apower: 8,
      capower: 22
    },
    {
      name: "Malfoy",
      srcrt: "assets/images/3.jpg",
      hpoints: 110,
      apower: 6,
      capower: 20
    },
    {
      name: "Snape",
      srcrt: "assets/images/4.jpg",
      hpoints: 100,
      apower: 8,
      capower: 24
    },
    {
      name: "Voldemort",
      srcrt: "assets/images/5.jpg",
      hpoints: 150,
      apower: 9,
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
    $("#you").html("<p>");
    $("#you p").text("Choose a character");

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
          $("#you p").text("Health: " + yourch.hpoints);
          $("#defender").empty();
          $("#defender").html("<p>");
          $("#defender p").text("Choose another character");
        } else {
          if (defenderch.name === "") {
            $(this).remove();
            defenderch = Object.assign({}, characters[h]);
            $("#defender").empty();
            creating_a_character(defenderch, "#defender");
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
    $("#" + character.name).css({
      height: "100%",
      background: "rgba(173, 169, 169, 0.61)"
    });
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
          $("#colleft  p").text("Health:0 TIED Both Died");
        } else {
          /////loss, restarting game
          $("#you  p").text("Health: 0 YOU LOOSE");
        }

        setTimeout(function() {
          reset();
        }, 2000);
      } else {
        if (defenderch.hpoints <= 0) {
          if ($("#characters div").length === 0) {
            /////Win Win Win
            $("#you  p").text("WIN WIN WIN");
            setTimeout(function() {
              reset();
            }, 2500);
          } else {
            /////// defeated, next
            setTimeout(function() {
              $("#defender").empty();
              $("#defender").html("<p>");
              $("#defender p").text("Choose another character");
              defenderch = {
                name: "",
                srcrt: "",
                hpoints: 0,
                apower: 0,
                capower: 0
              };
            }, 2000);
          }

          $("#defender  p").text("Health: 0 DEFEATED");
        }
      } ////////
    }
  });

  console.log();
});
