// console.log("Promise");

// try {
//   let order = orderMakanan(true);
//   console.log(order);
// } catch (error) {
//   console.log(error);
// }

console.log("Pergi Restoran");

// orderMakanan(true).then((response) => console.log(response));

fetchDefinition()
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

orderMakanan(true)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

console.log("Sembang");

console.log("Main Phone");

async function orderMakanan(bahan) {
  return new Promise(function (resolve, reject) {
    if (bahan) {
      setTimeout(function () {
        resolve("makanan siap");
      }, 2000);
    } else {
      reject("tak boleh masak");
    }
  });
}

async function fetchDefinition() {
  let data = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/fly");

  if (!data.ok) throw new Error("Invalid Request");
  let data2 = await data.json();
  console.log(data2);
  return data2;
}
