"use strict";

const squareBody = document.querySelector(".square-body");
const btnShuffle = document.querySelector(".btn-shuffle");
const initialBlocks = Array.from(document.querySelectorAll(".block"));

let blocks = [];

const shuffleBlocks = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const shuffleAndRenderBlocks = () => {
  blocks = Array.from(document.querySelectorAll(".block"));
  const shuffledBlocks = shuffleBlocks(blocks);

  squareBody.innerHTML = "";
  shuffledBlocks.forEach((block) => {
    squareBody.appendChild(block);
  });

  blocks = shuffledBlocks;
};

const swapBlocks = (e) => {
  const arrow = e.target.closest(".arrow");
  const currentBlock = e.target.closest(".block");
  const currentBlockIndex = blocks.indexOf(currentBlock);

  let targetBlockIndex;

  if (!arrow) return;

  if (arrow.classList.contains("left")) {
    targetBlockIndex = currentBlockIndex - 1;
  }

  if (arrow.classList.contains("right")) {
    targetBlockIndex = currentBlockIndex + 1;
  }

  if (arrow.classList.contains("top")) {
    targetBlockIndex = currentBlockIndex - 5;
  }

  if (arrow.classList.contains("bottom")) {
    targetBlockIndex = currentBlockIndex + 5;
  }

  if (targetBlockIndex >= 0 && targetBlockIndex < blocks.length) {
    const targetBlock = blocks[targetBlockIndex];

    const tempElem = document.createElement("div");
    currentBlock.before(tempElem);
    targetBlock.before(currentBlock);
    tempElem.before(targetBlock);
    tempElem.remove();

    blocks[currentBlockIndex] = targetBlock;
    blocks[targetBlockIndex] = currentBlock;
  }
};

shuffleAndRenderBlocks();
squareBody.addEventListener("click", swapBlocks);
btnShuffle.addEventListener("click", shuffleAndRenderBlocks);
