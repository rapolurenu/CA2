function startGame(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var nickname = document.getElementById("nickname").value;
  if (name && name.trim() !== "" && nickname && nickname.trim() !== "") {
    showInstructions();
    setTimeout(function() {
      window.location.href = "game.html";
    }, 10000);
  } else {
    alert("Please enter both your name and nickname to start the game.");
  }
}

function showInstructions() {
  var instructions = document.querySelector(".instructions");
  instructions.style.display = "block";
}
