$(document).ready(function() {
  var attacknumbers = 0;
  // var available = [];
  var yourch = {};
  var defenderch = {};

  // $("#characters").empty(); /////limpier characters

  var characters = [
    {
      name: "Harry",
      srcrt: "assets/images/1.jpg",
      hpoints: 130,
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
    // available = [];
    // for (let i = 0; i < characters.length; i++) {
    //   available[i] = true;
    // }
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
  }
  reset(); ////reseating to star

  /////creating dinamicaly characters
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
      // if (available[i] === true) {
      creating_a_character(characters[i], "#characters");
      $("#" + characters[i].name).css({
        width: "30%",
        margin: "5px",
        float: "left"
      });
      // }
    }
  }
  creating_characters(); /////creating characters to star

  ///////clicking characters
  var ch = $("#characters div");
  for (let h = 0; h < ch.length; h++) {
    $(ch[h]).on("click", function(e) {
      if (yourch.name === "") {
        $(this).hide();
        yourch = characters[h];
        creating_a_character(yourch, "#you");
      } else {
        if (defenderch.name === "") {
          $(this).hide();
          defenderch = characters[h];
          creating_a_character(defenderch, "#defender");
        }
      }
    });
  }

  //////button attack

  console.log();
});
