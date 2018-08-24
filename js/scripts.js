let trainedNet;

// Converts each character in the string to a value between 0 and 1 by dividing by 255
function encode(arg) {
  return arg.split("").map(x => x.charCodeAt(0) / 255);
}

// encodes the data from the training data file to 1s and 0s
function processTrainingData(data) {
  return data.map(d => {
    return {
      input: encode(d.input),
      output: d.output
    };
  });
}

function train(data) {
  let net = new brain.NeuralNetwork();
  net.train(processTrainingData(data));
  // Trains and saves the net as a glbal variable
  trainedNet = net.toFunction();
  console.log("Finished training...");
}

function execute(input) {
  let results = trainedNet(encode(input));
  console.log(results);
  let output;
  results.trump > results.kardashian
    ? (output = "Trump")
    : (output = "Kardashian");
  return output;
}

// trains the network with the training data
train(trainingData);

//calls the function to determine tweet likelyhood
console.log(
  execute(
    "Powder Contour Single in Contour #9 and Crème Contour & Highlight Sets in Light and Medium are SOLD OUT! Shop @kkwbeauty contour now at http://KKWBEAUTY.COM "
  )
);
