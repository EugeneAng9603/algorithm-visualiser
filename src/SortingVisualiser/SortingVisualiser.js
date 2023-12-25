import React, { useState, useEffect, useRef } from "react";
import './SortingVisualiser.css';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSort.js";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#2B1B17';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SortingVisualiser = () => {


    const [array, setArray] = useState([]);

    function resetArray () {
        const tempArr = [];
        for (let i=0; i < NUMBER_OF_ARRAY_BARS; i++) {
            tempArr.push(randomFromIntervals(5, 100))
        }
        //console.log(tempArr);
        setArray(tempArr);
    }

    function randomFromIntervals(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function mergeSort() {
        const animations = getMergeSortAnimations(array);
        
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    function insertionSort() {
        const animations = getInsertionSortAnimations(array);
        console.log(array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange =
                animations[i][0] === "comparison1" ||
                animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName("array-bar");
            if (isColorChange === true) {
                const color = animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                const [, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
            }
    }
     
    function quickSort() {
        // Handles displaying quick sort animations
        const animations = getQuickSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
          const isColorChange =
            animations[i][0] === "comparison1" ||
            animations[i][0] === "comparison2";
          const arrayBars = document.getElementsByClassName("array-bar");
          if (isColorChange === true) {
            const color =
              animations[i][0] === "comparison1"
                ? SECONDARY_COLOR
                : PRIMARY_COLOR;
            const [, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            const [, barIndex, newHeight] = animations[i];
            if (barIndex === -1) {
              continue;
            }
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
              barStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
    
      function bubbleSort() {
        // Handles displaying bubble sort animations
        const animations = getBubbleSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
          const isColorChange =
            animations[i][0] === "comparison1" ||
            animations[i][0] === "comparison2";
          const arrayBars = document.getElementsByClassName("array-bar");
          if (isColorChange) {
            const color =
              animations[i][0] === "comparison1"
                ? SECONDARY_COLOR
                : PRIMARY_COLOR;
            const [, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            const [, barIndex, newHeight] = animations[i];
            if (barIndex === -1) {
              continue;
            }
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
              barStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    useEffect( () => {
        resetArray();
    }, [])
    
    return (
        <div className="array-container">
            <button onClick={resetArray} className="button array-button">Get New Array here!</button>
            <br/>
            <button onClick={mergeSort} className="button">Run Merge Sort</button>
            <button onClick={insertionSort} className="button">Run Insertion Sort</button>
            <button onClick={quickSort} className="button">Run Quick Sort</button>
            <button onClick={bubbleSort} className="button">Run Bubble Sort</button>

            <div>

                <br/>
            </div>
            {array.map((value, idx) => (
            <div
                className="array-bar" 
                key={idx}
                style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                }}
            >
            </div>
            ))
        }
        </div>
    )
}

export default SortingVisualiser;