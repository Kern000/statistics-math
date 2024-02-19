
function checkProperty (arrayOfObjects, propertyToSortBy){

    let errorCatchingIndex;
    for (let object of arrayOfObjects){
        
        if (object.hasOwnProperty(propertyToSortBy)){
            continue;
        } else {
            errorCatchingIndex = arrayOfObjects.indexOf(object);
            console.error(`Object found without property at index ${errorCatchingIndex}`)
            return;
        }
    }
    console.log("successfully passed check for existence of property in all objects in array");
}

function mergeSortByProperty(arrayOfObjects, propertyToSortBy){

    if(arrayOfObjects.length <= 1){
        return arrayOfObjects;
    }                              // breaks the recursion eventually

    let targetProperty = propertyToSortBy;

    let middleIndex = Math.floor(arrayOfObjects.length / 2);
    let left = mergeSortByProperty(arrayOfObjects.slice(0,middleIndex), targetProperty);
    let right = mergeSortByProperty(arrayOfObjects.slice(middleIndex), targetProperty);

    let sortedValues = [];

    let leftIndexSlider = 0; 
    let rightIndexSlider = 0;

    while (leftIndexSlider < left.length && rightIndexSlider < right.length){

        if(left[leftIndexSlider][targetProperty] < right[rightIndexSlider][targetProperty]){
            // console.log(`left value here ${left[leftIndexSlider][targetProperty]} vs right value here ${right[rightIndexSlider][targetProperty]}`)
            sortedValues.push(left[leftIndexSlider]);
            leftIndexSlider ++;
        } else {
            // console.log(`left value here ${left[leftIndexSlider][targetProperty]} vs right value here ${right[rightIndexSlider][targetProperty]}`)
            sortedValues.push(right[rightIndexSlider]);
            rightIndexSlider ++;
        }
    }

    sortedValues.push(...left.slice(leftIndexSlider));
    sortedValues.push(...right.slice(rightIndexSlider)); //push remainder item not pushed after comparison

    return sortedValues;
}

function rankByPropertySmallestFirst(sortedArrayOfObjects, propertyToRankBy, idOfObjectRecevingRank){

    let targetProperty = propertyToRankBy;
    let foundIndex;

    for (let object of sortedArrayOfObjects){
        if (object.id == idOfObjectRecevingRank){
            foundIndex = sortedArrayOfObjects.indexOf(object);
        }
    }

    let rank;
    if (foundIndex){
        rank = foundIndex + 1;
        console.log(`Rank of object with id${idOfObjectRecevingRank} is rank ${rank} smallest out of ${sortedArrayOfObjects.length} peers based on criteria of ${targetProperty}`);
    } else {
        console.log("Id of object is not found");
        return;
    }
}

function rankByPropertyBiggestFirst(sortedArrayOfObjects, propertyToRankBy, idOfObjectRecevingRank){

    let targetProperty = propertyToRankBy;
    let foundIndex;

    for (let object of sortedArrayOfObjects){
        if (object.id == idOfObjectRecevingRank){
            foundIndex = sortedArrayOfObjects.indexOf(object);
        }
    }

    let rank;
    if (foundIndex){
        let arrayLength = sortedArrayOfObjects.length;

        rank = arrayLength - foundIndex;

        console.log(`Rank of object with id${idOfObjectRecevingRank} is: rank ${rank} largest out of ${sortedArrayOfObjects.length} peers based on criteria of ${targetProperty}`);
    } else {
        console.log("Id of object is not found");
        return;
    }
}

// expects an int for percentile between 0-100;
// 65th percentile can be defined as the lowest score that is greater than 65% of the scores (sorted smallest to biggest is just nice)

function retrieveIndexByPercentile(unsortedArrayOfObjects, percentile, propertyToSortBy){

    let targetArray = unsortedArrayOfObjects;
    let targetProperty = propertyToSortBy;
    mergeSortByProperty(targetArray, targetProperty);

    let targetPercentile = percentile;
    let arrayLength = targetArray.length;

    if (arrayLength === 0){
        console.log("Dataset is empty, please enter valid array");
        return;
    }
    if (targetPercentile <= 0 || targetPercentile > 100){
        console.log("target percentile needs be greater than 0 and smaller/equal to 100");
    }

    let index = Math.ceil((percentile / 100) * (arrayLength - 1)); // we will not use arrayLength + 1 because index starts from 0
    
    console.log(`The index at ${percentile} percentile is index ${index}`);
    console.log(`THe value at the ${percentile} percentile is ${targetArray[index][targetProperty]}`);

    return index;
}

function retrieveDataByPercentile(unsortedArrayOfObjects, percentile, propertyToSortBy){

    let targetArray = unsortedArrayOfObjects;
    let targetProperty = propertyToSortBy;
    let targetPercentile = percentile;

    let targetIndex = retrieveIndexByPercentile(targetArray, targetPercentile, targetProperty);

    let arrangedArray = mergeSortByProperty(unsortedArrayOfObjects, targetProperty);
    
    let itemsInPercentile = arrangedArray.slice(targetIndex);
    console.log(itemsInPercentile);

    return itemsInPercentile;
}

// expects array where elements arranged in chronological order with latest at the end of array.
// expects time between each element to be 1 unit
// will slice the last few units when applying a 5 year or 5 unit latest trend
function linearRegressionOneUnitTimeDistance(timeSeriesArray){

    let targetArray = timeSeriesArray;

    let xSum;
    let timeContainer = [];
    for (let i=1; i <= targetArray.length; i++){
        xSum += i;
        timeContainer.push(i);
    }
    let xAverage = xSum / targetArray.length;

    let ySum = targetArray.reduce((accumulator, currentValue)=> accumulator + currentValue, 0);
    let yAverage = ySum / targetArray.length;

    let aggregateTop;
    let aggregateDenominator;

    for (let i=0; i < targetArray.length; i++){

        let xDifference = timeContainer[i] - xAverage;
        let xDifferenceSquared = (timeContainer[i] - xAverage)**2;
        let yDifference = targetArray[i] - yAverage;
        let topCalc = xDifference * yDifference
        aggregateTop += topCalc;
        aggregateDenominator += xDifferenceSquared;
    }

    let slope = aggregateTop / aggregateDenominator;
    console.log(`Average rate of change in last ${targetArray.length} time units is ${slope}`)
    return slope;
}


let meow = [1,5,7,3,4,7,8,10,11,13,3]




