function questions() {
  let store = [
    {
      questionId: "1",
      question: "What is the largest country in the world?",
      choices: ["Russia", "China", "USA"],
    },
    {
      questionId: "2",
      question: "Which of these characters holds the highest military rank?",
      choices: [
        "Captain America",
        "Captain Marvel (Carol Danvers)",
        "Major Force",
      ],
    },
    {
      questionId: "3",
      question: "Who are/is the founders of Google?",
      choices: [
        "Kevin Systrom",
        "Bob Miner and Ed Oates",
        "Larry Page and Sergey Brin",
      ],
    },
    {
      questionId: "4",
      question: "What is “Ingenuity”, related to space exploration?",
      choices: ["Meteor", "NASA’s Mars Helicopter", "Satellite module"],
    },
    {
      questionId: "5",
      question:
        "Which country has successfully transplanted a pig`s kidney onto a human?",
      choices: ["India", "USA", "China"],
    },
    {
      questionId: "6",
      question: "Clark Kent is a mild-mannered reporter for what newspaper?",
      choices: ["The Daily Bugle", "The Daily Planet", "The New Frontiersman"],
    },
    {
      questionId: "7",
      question:
        "Who is largely responsible for breaking the German Enigma codes, created a test that provided a foundation for artificial intelligence?",
      choices: ["George Boole", "Charles Babbage", "Alan Turing"],
    },
    {
      questionId: "8",
      question: "Process of globalization began with a single motive such as",
      choices: ["Globalization", "Market expansion", "Modernization"],
    },
    {
      questionId: "9",
      question:
        "Complete this line: “I live my life a ________ at a time. Nothing else matters.”",
      choices: ["quarter mile", "second", "full"],
    },
    {
      questionId: "10",
      question:
        "Where do Dom and Brian stash Braga’s heroin in Fast & Furious?",
      choices: ["in the Toretto house", "in a police auto pound", "in a bank"],
    },
    {
      questionId: "11",
      question: "“I’ll be back.”",
      choices: ["Predator", "The Terminator", "Total Recall"],
    },
    {
      questionId: "12",
      question: "What country does the word mocha come from?",
      choices: ["Yemen", "Tonga", "Saudi Arabia"],
    },
  ];

  return function shuffleAndReturn() {
    return store.sort(() => 0.5 - Math.random());
  };
}

module.exports = { questions };
