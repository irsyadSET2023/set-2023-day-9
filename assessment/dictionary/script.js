console.log("hello");

let arrays;
let inputDom = document.querySelector(".screen");
let definitionsDom = document.querySelector(".definitions");

function searchDefinition() {
  let findWord = inputDom.value;
  console.log(inputDom.value);
  clearDefinitionsPart();
  fetchDefinition(findWord)
    .then(function (response) {
      let arrayFirstLayer = extractFirstLayerResponse(response);
      let arraySecondLayer = extractSecondLayerResponse(arrayFirstLayer);
      let arrayThirdLayer = extractThirdLayerResponse(arraySecondLayer);
      let definitionParts = fillDefinition(arrayThirdLayer);
      renderHTMLTemplate(definitionParts);
    })
    .catch(function (error) {
      console.log(error);

      let message = `<div class="definition">
      <h1>Words Not Found</h1>
        </div>`;

      definitionsDom.insertAdjacentHTML("beforeend", message);
    });
}

async function fetchDefinition(word) {
  let definitionApi = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!definitionApi.ok) throw new Error("Invalid Request");
  let definitionObject = await definitionApi.json();
  return definitionObject;
}

function extractArray(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    let newWordObject = {};
    newWordObject["partofSpeech"] = arr[index].meanings[0]["partOfSpeech"];
    newWordObject["definitions"] = arr[index].meanings[0]["definitions"];
    newArr.push(newWordObject);
  }

  return newArr;
}

function extractFirstLayerResponse(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    let newWordObject = {};
    newWordObject["word"] = arr[index].word;
    newWordObject["meanings"] = arr[index].meanings;
    newArr.push(newWordObject);
  }
  return newArr;
}

function extractSecondLayerResponse(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    let newWordObject = {};
    newWordObject["word"] = arr[index].word;
    for (let j = 0; j < arr[index].meanings.length; j++) {
      newWordObject["partOfSpeech"] = arr[index].meanings[j].partOfSpeech;
    }
    for (let j = 0; j < arr[index].meanings.length; j++) {
      newWordObject["definitions"] = arr[index].meanings[j].definitions;
    }
    newArr.push(newWordObject);
  }
  return newArr;
}

function extractThirdLayerResponse(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    let newWordObject = {};
    newWordObject["word"] = arr[index].word;
    newWordObject["partOfSpeech"] = arr[index].partOfSpeech;
    let definitionArrays = [];
    for (let j = 0; j < arr[index]["definitions"].length; j++) {
      let definition = arr[index]["definitions"][j].definition;
      definitionArrays.push(definition);
    }
    newWordObject["definitions"] = definitionArrays;
    newArr.push(newWordObject);
  }
  return newArr;
}

function fillDefinition(arr) {
  let arrDefinitionDomParagraph = [];

  for (let index = 0; index < arr.length; index++) {
    let arrDefinition = [];
    for (let j = 0; j < arr[index]["definitions"].length; j++) {
      let definition = arr[index]["definitions"][j];
      let paragraphDefinition = `<p>${j + 1}.${definition}</p>`;
      arrDefinition.push(paragraphDefinition);
    }

    let paragraphPart = arrDefinition.join("");

    let word = arr[index]["word"];

    let partOfSpeech = arr[index]["partOfSpeech"];

    let definitionText = `<div class="definition">
          <div class="part-of-speech">
            <h3>${word} (${partOfSpeech})</h3>
            ${paragraphPart}
          </div>
        </div>`;

    arrDefinitionDomParagraph.push(definitionText);
  }

  let definitionParts = arrDefinitionDomParagraph.join("");

  return definitionParts;
}

function renderHTMLTemplate(definition) {
  definitionsDom.insertAdjacentHTML("beforeend", definition);
}

function clearDefinitionsPart() {
  definitionsDom.innerHTML = "";
}
