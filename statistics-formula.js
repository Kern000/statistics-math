
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

    function simpleArrayMergeSort(simpleArray){

        let currentArray = simpleArray;
        if (currentArray.length <= 1){
            return currentArray;
        }

        let middleIndex = Math.floor(currentArray.length / 2); 
        let left = simpleArrayMergeSort(currentArray.slice(0, middleIndex));
        let right = simpleArrayMergeSort(currentArray.slice(middleIndex));
        
        let sortedValues = [];

        let leftIndexSlider = 0;
        let rightIndexSlider = 0;

        while (leftIndexSlider < left.length && rightIndexSlider < right.length ){
            if (left[leftIndexSlider] < right[rightIndexSlider]){
                sortedValues.push(left[leftIndexSlider]);
                leftIndexSlider++;
            } else {
                sortedValues.push(right[rightIndexSlider]);
                rightIndexSlider++;
            }
        }

        sortedValues.push(...left.slice(leftIndexSlider));
        sortedValues.push(...right.slice(rightIndexSlider));

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

        let xSum = 0;
        let timeContainer = [];
        for (let i=1; i <= targetArray.length; i++){
            xSum += i;
            timeContainer.push(i);
        }
        let xAverage = xSum / targetArray.length;

        let ySum = targetArray.reduce((accumulator, currentValue)=> accumulator + currentValue, 0);
        let yAverage = ySum / targetArray.length;

        let aggregateTop=0;
        let aggregateDenominator=0;

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

    function sumOfArray(arrayOfData){
        let targetArray =  arrayOfData;        
        let sum = targetArray.reduce((total, num)=> total + num, 0)
        console.log("sum here", sum)
        return sum;
    }

    function mean (arrayOfData){
        
        let targetArray = arrayOfData;
        let sum = sumOfArray(targetArray);
        let mean = sum/ targetArray.length;
        console.log("mean", mean)
        return mean;
    }

    function median (arrayOfData){

        let targetArray = arrayOfData;
        let median;
        if (targetArray.length % 2 === 0){
            let leftMedianIndex = (targetArray.length / 2) - 1;
            let rightMedianIndex = (targetArray.length / 2);
            median = (targetArray[leftMedianIndex] + targetArray[rightMedianIndex]) / 2;
            return median;
        } else {
            let medianIndex = Math.floor(targetArray.length / 2);
            median = targetArray[medianIndex];
            return median;
        }
    }


    function mode (arrayOfData){
        let targetArray = arrayOfData;
        let counting = {};
        for (let element of arrayOfData){
            if (counting[element]){
                counting[element] += 1; 
            } else {
                counting[element] = 1;
            }
        }
        console.log(counting);

        let mode = [];
        let currentLargestValue=0;
        let currentLargestKey;
        for (let [key, value] of Object.entries(counting)){
            if (value > currentLargestValue){
                currentLargestValue = value;
                currentLargestKey = key;
            }   else {
                continue;
            }
        }
        mode.push(currentLargestKey);

        for (let [key,value] of Object.entries(counting)){
            if (key !== currentLargestKey && value === currentLargestValue){
                mode.push(key);
            }
        }
        console.log("mode here =>", mode)
        return mode;
    }

    function standardDeviationPopulation(arrayOfData){

        let popMean = mean(arrayOfData);
        let accumulator = 0;
        for (let item of arrayOfData){
            let itemToSum = (item - popMean)**2;
            accumulator += itemToSum;
        }
        let standardDeviationPopulation = Math.sqrt(accumulator/arrayOfData.length);
        return standardDeviationPopulation;
    }




    function rangeOfArrayOfObjects(arrayOfObjects, property){

        let sortedArray = mergeSortByProperty(arrayOfObjects, property);
        const largestValue = sortedArray[sortedArray.length-1][property];
        const smallestValue = sortedArray[0][property];
        let range = largestValue - smallestValue;
        console.log(range);
        return range;
    }

    function simpleRange(unSortedArray){
        let sortedArray = simpleArrayMergeSort(unSortedArray);
        const largestValue = sortedArray[sortedArray.length -1];
        const smallestValue = sortedArray[0];
        let range = largestValue - smallestValue;
        console.log(range);
        return range;
    }

    // function dissectingAFunction(unsortedArray1, unsortedArray2){
    //     console.log("arguments.callee", arguments.callee);
    //     console.log("arguments.callee.name", arguments.callee.name);
    //     console.log("arguments.callee.arguments", arguments.callee.arguments);
    // }


    // Need to test and also refactor ---> got alot of wasted codes, need to create output
    function simpleTwoNominalCategoryBoxPlot(unsortedArray1, unsortedArray2){

        let array1 = unsortedArray1;
        let array2 = unsortedArray2;

        let sortedArray1 = simpleArrayMergeSort(array1);
        let sortedArray2 = simpleArrayMergeSort(array2);

        let arrayLength1 = sortedArray1.length;
        let arrayLength2 = sortedArray2.length;

        let indexOf25PercentileForFirst = Math.ceil((25 / 100) * (arrayLength1 - 1));
        let indexOf50PercentileForFirst = Math.ceil((50 / 100) * (arrayLength1 - 1));
        let indexOf75PercentileForFirst = Math.ceil((75 / 100) * (arrayLength1 - 1));

        let median1 = median(sortedArray1);
        let median2 = median(sortedArray2);
        
        // for first array 
        let dataSet1 = {};
        dataSet1[upperHinge] = sortedArray1[indexOf75PercentileForFirst];
        dataSet1[lowerHinge] = sortedArray1[indexOf25PercentileForFirst];
        dataSet1[hspread] = dataSet1[upperHinge1] - dataSet1[lowerHinge1];
        dataSet1[step] = 1.5 * dataSet1[hspread];
        dataSet1[upperInnerFence] = dataSet1[upperHinge] + dataSet1[step];
        dataSet1[upperOuterFence] = dataSet1[upperHinge] + (dataSet1[step] * 2)
        dataSet1[lowerInnerFence] = dataSet1[lowerHinge] - (dataSet1[step])
        dataSet1[lowerOuterFence] = dataSet1[lowerHinge] - (dataSet1[step] * 2)
        
        let processedDataHolder = [];
        let valueFinder = (sortedArray, dataSet) => {
            let arrayToModify = sortedArray;
            arrayToModify.push(dataSet[upperInnerFence]);
            arrayToModify.push(dataSet[lowerInnerFence]);
            arrayToModify.push(dataSet[upperOuterFence]);
            arrayToModify.push(dataSet[lowerOuterFence]);

            let sortedModifiedArray = simpleArrayMergeSort(arrayToModify);
            let indexOfUpperAdj = sortedModifiedArray.indexOf(dataSet[upperInnerFence]) - 1;
            let indexOfLowerAdj = sortedModifiedArray.indexOf(dataSet[lowerInnerFence]) + 1;

            let indexOfUpperOuterFence = sortedModifiedArray.indexOf(dataSet[upperOuterFence]);
            let indexOfLowerOuterFence = sortedModifiedArray.indexOf(dataSet[lowerOuterFence]);
            
            let outsideUpperValues = sortedModifiedArray.slice(indexOfUpperAdj + 2, indexOfUpperOuterFence);
            let outsideLowerValues = sortedModifiedArray.slice(indexOfLowerOuterFence, indexOfLowerAdj - 1);

            let farOutUpperValues = null;
            if (indexOfUpperOuterFence !== sortedModifiedArray.length - 1){
                farOutUpperValues = sortedModifiedArray.slice(indexOfUpperOuterFence + 1)
            }

            let farOutLowerValues = null;
            if (indexOfLowerOuterFence !== 0){
                farOutLowerValues = sortedModifiedArray.slice(0, indexOfLowerOuterFence)
            }

            dataSet[upperAdj] = sortedModifiedArray[indexOfUpperAdj];
            dataSet[lowerAdj] = sortedModifiedArray[indexOfLowerAdj];
            dataSet[outsideUpperValues] = sortedModifiedArray[outsideUpperValues];
            dataSet[outsideLowerValues] = sortedModifiedArray[outsideLowerValues];
            dataSet[farOutUpperValues] = farOutUpperValues;
            dataSet[farOutLowerValues] = farOutLowerValues;

            processedDataHolder.push(dataSet);
        }

        

        // for second array



    }




module.exports={
    checkProperty,
    mergeSortByProperty,
    simpleArrayMergeSort,
    rankByPropertySmallestFirst,
    rankByPropertyBiggestFirst,
    retrieveDataByPercentile,
    retrieveIndexByPercentile,
    sumOfArray,
    mean,
    median,
    mode,
    standardDeviationPopulation,
    rangeOfArrayOfObjects,
    simpleRange,
    
}

const sampleArray = [
    { "first": 10, "second": 20, "third": 30, "fourth": 40 },
    { "first": 15, "second": 25, "third": 35, "fourth": 45 },
    { "first": 12, "second": 22, "third": 32, "fourth": 42 },
    { "first": 18, "second": 28, "third": 38, "fourth": 48 }
    ];

    const simpleSampleArray = [
        47, 82, 15, 33, 69,
        28, 91, 56, 10, 72,
        39, 23, 58, 41, 79,
        64, 12, 53, 86, 97
    ];

    dissectingAFunction(sampleArray, simpleSampleArray);
