import { ITEMS_WITH_RECIPES } from "./items-with-recipes.js";

console.log("ggn ITEMS_WITH_RECIPES > angled_grip_i", ITEMS_WITH_RECIPES);
// Greatest Common Divisor
function gcd(a, b) {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

// Least Common Multiple
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

// k_min calculation
function kMin(inputs) {
  return inputs.map(({ I, S }) => S / gcd(I, S)).reduce((a, b) => lcm(a, b));
}

function checkInputIsValidItemCount(inputId) {
  const inputNode = document.getElementById(inputId);
  if (!inputNode) {
    console.error("Cannot find input with id ", inputId);
    return false;
  }

  const { value } = inputNode;
  const isValid =
    /^\d+$/.test(value) &&
    parseInt(value, 10) > 0 &&
    parseInt(value, 10) <= 100;
  if (isValid) {
    inputNode.classList.remove("invalid");
  } else {
    inputNode.classList.add("invalid");
  }
  return isValid;
}

function calcK() {
  const shouldUseItemB = document.getElementById("useItemB");
  const shouldUseItemC = document.getElementById("useItemC");

  const inputs = [{ I: +Ia.value, S: +Sa.value }];
  if (shouldUseItemB.checked) inputs.push({ I: +Ib.value, S: +Sb.value });
  if (shouldUseItemC.checked) inputs.push({ I: +Ic.value, S: +Sc.value });

  // { I: +Ib.value, S: +Sb.value },
  console.log("calcK", inputs);
  const kMinResult = kMin(inputs);
  kResult.textContent = kMinResult;

  //
  //
  // Calc and output result for each input item's slots used
  //
  let totalInputSlotsUsed = 0;
  const slotsUsedInputValueA = document.getElementById(
    "slots-used-input-value-a"
  );
  const slotsUsedInputValueB = document.getElementById(
    "slots-used-input-value-b"
  );
  const slotsUsedInputValueC = document.getElementById(
    "slots-used-input-value-c"
  );

  // Always calculate and output result for Item A
  const inputSlotsUsedResultA = calcInputSlots({
    k: kMinResult,
    I: +Ia.value,
    S: +Sa.value,
  });

  slotsUsedInputValueA.textContent = inputSlotsUsedResultA;
  totalInputSlotsUsed += inputSlotsUsedResultA;

  if (shouldUseItemB.checked) {
    const inputSlotsUsedResultB = calcInputSlots({
      k: kMinResult,
      I: +Ib.value,
      S: +Sb.value,
    });

    slotsUsedInputValueB.textContent = inputSlotsUsedResultB;
    totalInputSlotsUsed += inputSlotsUsedResultB;
  } else {
    slotsUsedInputValueB.textContent = "-";
  }

  if (shouldUseItemC.checked) {
    const inputSlotsUsedResultC = calcInputSlots({
      k: kMinResult,
      I: +Ic.value,
      S: +Sc.value,
    });
    slotsUsedInputValueC.textContent = inputSlotsUsedResultC;
    totalInputSlotsUsed += inputSlotsUsedResultC;
  } else {
    slotsUsedInputValueC.textContent = "-";
  }

  //
  //
  // Calc and display total input and output slots used
  //
  inputSlotsUsedResult.textContent = totalInputSlotsUsed;

  const outputSlotsUsed = calcOutputSlots({
    k: kMinResult,
    Y: +YOutput.value,
    SY: +SYOutput.value,
  });
  outputSlotsUsedResult.textContent = outputSlotsUsed;

  const compRatio = Number(totalInputSlotsUsed / outputSlotsUsed);
  compresionRatioResult.textContent = compRatio.toPrecision(5);
  compresionRatioResult.setAttribute("class", "");

  if (compRatio > 1) compresionRatioResult.classList.add("good");
  else if (compRatio < 1) compresionRatioResult.classList.add("bad");
  else compresionRatioResult.classList.add("neutral");
}

function calcInputSlots({ k, I, S }) {
  // const k = +kInput.value;
  // const I = +IInput.value;
  // const S = +SInput.value;
  return (k * I) / S;
}

function calcOutputSlots({ k, Y, SY }) {
  // const k = +kOutput.value;
  // const Y = +YOutput.value;
  // const SY = +SYOutput.value;
  return Math.ceil((k * Y) / SY);
}

function handleUseItemChange(inputEl) {
  const parentFieldset = inputEl.closest("fieldset");

  parentFieldset
    .querySelectorAll('input[type="number"]')
    .forEach((inp) => (inp.disabled = !inputEl.checked));
}

// const IDEAL_STRUCT = {
//   looting_mk3_survivor: {
//     id: "looting_mk3_survivor",
//     name: "Looting Mk. 3 (Survivor)",
//     type: "Augment",
//     rarity: "Epic",
//     stackSize: 1,
//     type: "Augment",
//     isWeapon: false,
//     craftBench: "equipment_bench",
//     recipe: {
//       advanced_mechanical_components: 2,
//       processor: 2,
//     },
//   },
//   shield_recharger: {
//     id: "shield_recharger",
//     name: "Shield Recharger",
//     type: "Quick Use",
//     rarity: "Uncommon",
//     stackSize: 5,
//     isWeapon: false,
//     craftBench: ["workbench", "med_station", "in_raid"],
//     recipe: {
//       arc_powercell: 1,
//       rubber_parts: 5,
//     },
//   },
// };

function handleSelectItemChange() {
  const selectItemEl = document.getElementById("select-output-item");
  const selectedItemKey = selectItemEl.value;
  const outputItemDetails = ITEMS_WITH_RECIPES[selectedItemKey];
  const { recipe } = outputItemDetails;
  console.log("selectItemEl changed 3 > ", selectedItemKey, recipe);
  // const outputItemStackSize = outputItemDetails.stackSize;
  // look up the stackSize value for each item in recipe
  const inputItemsDetails = Object.keys(recipe).map((inputItemKey) => {
    console.log(
      "recipe loop 1 >",
      inputItemKey,
      ITEMS_WITH_RECIPES[inputItemKey]
    );
    const inputItem = ITEMS_WITH_RECIPES[inputItemKey];

    return {
      id: inputItem.id,
      name: inputItem.name,
      stackSize: inputItem.stackSize,
      requiredInRecipe: recipe[inputItemKey],
    };
  });

  console.log("handleSelectItemChange >", {
    inputItemsDetails,
    outputItemDetails,
  });

  const SYOutput = document.getElementById("SYOutput");
  SYOutput.value = outputItemDetails.stackSize;

  const useItemB = document.getElementById("useItemB");
  const useItemC = document.getElementById("useItemC");
  useItemB.checked = false;
  useItemC.checked = false;

  const itemTitleA = document.getElementById('input-item-title-a');
  const itemTitleB = document.getElementById('input-item-title-b');
  const itemTitleC = document.getElementById('input-item-title-c');

  inputItemsDetails.forEach((recipeItem, index) => {
    if (index === 0) {
      const inputIA = document.getElementById("Ia");
      const inputSA = document.getElementById("Sa");
      inputIA.value = recipeItem.requiredInRecipe;
      inputSA.value = recipeItem.stackSize;
      itemTitleA.textContent = recipeItem.name;
    }

    if (index === 1) {
      if (!useItemB.checked) {
        useItemB.click();
      }
      const inputIB = document.getElementById("Ib");
      const inputSB = document.getElementById("Sb");
      inputIB.value = recipeItem.requiredInRecipe;
      inputSB.value = recipeItem.stackSize;
      itemTitleB.textContent = recipeItem.name;
    }

    if (index === 2) {
      if (!useItemC.checked) {
        useItemC.click();
      }
      const inputIC = document.getElementById("Ic");
      const inputSC = document.getElementById("Sc");
      inputIC.value = recipeItem.requiredInRecipe;
      inputSC.value = recipeItem.stackSize;
      itemTitleC.textContent = recipeItem.name;
    }
  });

  calcK();
}

function initSelectItem() {
  const selectItemEl = document.getElementById("select-output-item");

  Object.keys(ITEMS_WITH_RECIPES).forEach((key) => {
    const details = ITEMS_WITH_RECIPES[key];
    if (!details.recipe) {
      return;
    }
    const optionEl = document.createElement("option");
    optionEl.value = key;
    optionEl.textContent = `${details.name}`;
    selectItemEl.appendChild(optionEl);
  });
}

export const init = () => {
  initSelectItem();

  const btnCalcK = document.getElementById("btnCalcK");
  const selectOutputItem = document.getElementById("select-output-item");
  const itemInputCheckboxB = document.getElementById("useItemB");
  const itemInputCheckboxC = document.getElementById("useItemC");

  itemInputCheckboxB.addEventListener("change", () =>
    handleUseItemChange(itemInputCheckboxB)
  );

  itemInputCheckboxC.addEventListener("change", () =>
    handleUseItemChange(itemInputCheckboxC)
  );

  selectOutputItem.addEventListener("change", handleSelectItemChange);

  btnCalcK.addEventListener("click", () => {
    calcK();
  });
};
