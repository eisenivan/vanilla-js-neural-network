// This is the formula we are using to build our training set
// and also the answer
const formula = x => x * 0.34 * 2

// When we want our network to give us an answer we simply
// multiply the input by the weight
const guess = (weight, point) => point * weight

// This function calculates our weight
const train = (startingWeight = 0.5, trainingSet) => {
  let weight = startingWeight

  // The learning rate helps keep our model from over correcting.
  // If we were training a driving network, the learning rate
  // would dictate how far we turn the wheel. Large turns work
  // quickly, but can cause the car to swerve back and forth.
  // Small turns might take too long to cause meaningful change.
  const learningRate = 0.0001
  
  // Our training set is an array of inputs / answers
  trainingSet.forEach(({ point, answer }) => {
    // For each one we have the network guess using its
    // more recent weight.
    const guessResult = guess(weight, point)
    // We get the error by subtracting the guess result
    // from the actual answer
    const error = answer - guessResult
    // We set the weight to the old weight plus the
    // most recent error, multiplied by the
    // learning weight
    weight = weight + (error * learningRate)
  })

  // Log the weight after we have trained the network
  console.log(`weight: ${weight}`)

  // Run some tests. I'm using these 4 hard coded numbers
  // to get an idea of how the network is performing.
  // Figuring out if the network is working is actually
  // pretty hard. It's important to guage
  const tests = [5, 42, 88, 91]
  tests.forEach((x) => {
    console.log(`point: ${x}`, `guess: ${guess(weight, x).toFixed(2)}`, `answer: ${formula(x).toFixed(2)}`)
  })
}

// This isn't part of our network really, it's just a
// function to dynamically build a training set.
// It's nice to not need to hard code the training set.
// Plus each time we train we get a new set.
const generateTrainingSet = () => {
  let i = 0;
  let min = 1
  let max = 100
  let result = []

  // Let's build an array with 9 million items. Each item
  // will have a point and an answer. We get the answer
  // but using our formula variable from above.
  while (i < 9000000){
    const point = Math.floor(Math.random() * (max - min + 1)) + min
    // console.log(point)
    result.push({
      point,
      answer: formula(point)
    })

    i++
  }

  return result
}

// When we run `node ./single-layer.js` this function will run.
train(0, generateTrainingSet())
