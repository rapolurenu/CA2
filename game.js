const scriptList = [
    {
        word: "elephant",
        hint: "A large mammal with a trunk and tusks, native to Africa and Asia."
    },
    {
        word: "penguin",
        hint: "A flightless aquatic bird with black and white plumage, found in the southern hemisphere."
    },
    {
        word: "crocodile",
        hint: "A large predatory reptile with a long snout and powerful jaws, found in tropical regions."
    },
    {
        word: "cheetah",
        hint: "The fastest land animal, known for its incredible speed and spotted coat."
    },
    {
        word: "koala",
        hint: "A small marsupial native to Australia, known for its eucalyptus diet and tree-dwelling lifestyle."
    },
    {
        word: "hummingbird",
        hint: "A small, colorful bird capable of hovering in mid-air while feeding on nectar."
    },
    {
        word: "salmon",
        hint: "A species of fish that migrates from freshwater to the ocean and back to spawn."
    },
    {
        word: "avocado",
        hint: "A fruit with green, creamy flesh, often used in salads, dips, and sandwiches."
    },
    {
        word: "pineapple",
        hint: "A tropical fruit with a sweet and tangy taste, known for its spiky exterior and juicy flesh."
    },
    {
        word: "shrimp",
        hint: "A small crustacean with a long body and legs, often used as seafood."
    },
    {
        word: "kiwi",
        hint: "A flightless bird native to New Zealand, known for its long beak and nocturnal habits."
    },
    {
        word: "grapefruit",
        hint: "A citrus fruit with a tangy flavor, often eaten for breakfast or in salads."
    },
    {
        word: "lobster",
        hint: "A large marine crustacean with a hard shell and clawed limbs, prized as seafood."
    },
    {
        word: "strawberry",
        hint: "A sweet, red fruit with seeds on the outside, often used in desserts and jams."
    },
    {
        word: "ostrich",
        hint: "A large flightless bird native to Africa, known for its long neck and fast running speed."
    },
    {
        word: "pancake",
        hint: "A flat cake, often thin and round, prepared from a starch-based batter and cooked on a hot surface."
    },
    {
        word: "sushi",
        hint: "A Japanese dish consisting of small balls or rolls of vinegar-flavored cold-cooked rice served with a garnish of raw fish, vegetables, or egg."
    },
    {
        word: "pizza",
        hint: "A savory dish consisting of a round, flattened base of dough topped with cheese, tomatoes, and various other ingredients, baked in an oven."
    },
    {
        word: "california",
        hint: "A state located on the West Coast of the United States, known for its diverse culture, entertainment industry, and Silicon Valley."
    },
    {
        word: "texas",
        hint: "The second-largest state in the United States, known for its vast landscapes, cowboy culture, and barbecue cuisine."
    },
    {
        word: "new york",
        hint: "A state in the northeastern United States, home to New York City, known for its iconic landmarks, Broadway theaters, and diverse population."
    },
    {
        word: "france",
        hint: "A European country known for its rich history, culture, cuisine, and famous landmarks such as the Eiffel Tower and Louvre Museum."
    },
    {
        word: "japan",
        hint: "An island nation in East Asia known for its unique culture, technology, cuisine, and cherry blossoms."
    },
    {
        word: "brazil",
        hint: "The largest country in South America, known for its Amazon rainforest, Carnival festival, and soccer passion."
    },
    {
        word: "spanish",
        hint: "A Romance language originating in the Iberian Peninsula, widely spoken in Spain and Latin America."
    },
    {
        word: "mandarin",
        hint: "The most spoken language in the world, primarily spoken in China and Taiwan, known for its complex characters and tonal system."
    },
    {
        word: "arabic",
        hint: "A Semitic language spoken in the Middle East and North Africa, known for its script and rich literary tradition."
    },
    {
        word: "facebook",
        hint: "A popular social networking platform founded by Mark Zuckerberg, allowing users to connect, share content, and communicate with others."
    },
    {
        word: "instagram",
        hint: "A photo and video-sharing social networking service owned by Facebook, known for its visually appealing content and filters."
    },
    {
        word: "twitter",
        hint: "A microblogging platform where users can post and interact with short messages called 'tweets,' known for its real-time updates and hashtags."
    }
  ];
  
  const dsplayWord = document.querySelector(".word-display");
  const textGuess = document.querySelector(".guess-text b");
  const keyBoard = document.querySelector(".key-board");
  const hangmanImage = document.querySelector(".hangmanbox img");
  const gameModel = document.querySelector(".game-model");
  const playAgain = gameModel.querySelector("button");
  
  let currentWord, correctLetters, wrongGuessCount;
  const maxGuesses = 6;
  
  const gameReset = () => {
      correctLetters = [];
      wrongGuessCount = 0;
      hangmanImage.src = "images/hangman-0.svg";
      textGuess.innerText = `${wrongGuessCount} / ${maxGuesses}`;
      dsplayWord.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
      keyBoard.querySelectorAll("button").forEach(btn => btn.disabled = false);
      gameModel.classList.remove("show");
  }
  
  const randomWord = () => {
      const { word, hint } = scriptList[Math.floor(Math.random() * scriptList.length)];
      currentWord = word;
      document.querySelector(".hint-text b").innerText = hint;
      gameReset();
  }
  
  const gameoVer = (isVictory) => {
      const score = isVictory ? 1 * currentWord.length : 0;
  
      const modalText = isVictory ? 'You found the word:' : 'The correct word was:';
      gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
      gameModel.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
      gameModel.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b><br>Your Score: ${score}`;
      gameModel.classList.add("show");
  }
  
  const gameInit = (button, clickedLetter) => {
      if (currentWord.includes(clickedLetter)) {
          [...currentWord].forEach((letter, index) => {
              if (letter === clickedLetter) {
                  correctLetters.push(letter);
                  dsplayWord.querySelectorAll("li")[index].innerText = letter;
                  dsplayWord.querySelectorAll("li")[index].classList.add("guessed");
              }
          });
      } else {
          wrongGuessCount++;
          hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
      }
      button.disabled = true;
      textGuess.innerText = `${wrongGuessCount} / ${maxGuesses}`;
      
      if (wrongGuessCount === maxGuesses) return gameoVer(false);
      if (correctLetters.length === currentWord.length) return gameoVer(true);
  }
  
  for (let i = 97; i <= 122; i++) {
      const button = document.createElement("button");
      button.innerText = String.fromCharCode(i);
      keyBoard.appendChild(button);
      button.addEventListener("click", function clickHandler(e) {
          gameInit(e.target, String.fromCharCode(i));
          e.target.removeEventListener("click", clickHandler);
      });
  }
  
  randomWord();
  
  playAgain.addEventListener("click", () => {
      window.location.href = "index.html";
  });
  
