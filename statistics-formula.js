
// 1st parameter expects an array of object
// 2nd parameter expects a string matching object key in array of object


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

function mergeSort(arrayOfObjects, propertyToSortBy){

    if(arrayOfObjects.length <= 1){
        return arrayOfObjects;
    }                              // breaks the recursion eventually

    let targetProperty = propertyToSortBy;

    let middleIndex = Math.floor(arrayOfObjects.length / 2);
    let left = mergeSort(arrayOfObjects.slice(0,middleIndex), targetProperty);
    let right = mergeSort(arrayOfObjects.slice(middleIndex), targetProperty);

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

let test1 = [
                {"id":1, "meow3": 3997, "meow1": 500, "meow2": 1000},
                {"id":2, "meow3": 4001, "meow1": 500, "meow2": 1000},
                {"id":3, "meow3": 3998, "meow1": 500, "meow2": 1000},
                {"id":4, "meow3": 3996, "meow1": 500, "meow2": 1000},
                {"id":5, "meow3": 4000, "meow1": 500, "meow2": 1000},           
                {"id":6, "meow3": 3999, "meow1": 500, "meow2": 1000},
            ]

// let test2 = [
//     {"meow3": 3997, "meow1": 500, "meow2": 1000},
//     {"meow3": 4001, "meow1": 500, "meow2": 1000},
//     {"meow3": 3998, "meow1": 500, "meow2": 1000},
//     {"meow3": 3996, "meow1": 500, "meow2": 1000},
//     {"meow3": 4000, "meow1": 500, "meow2": 1000},           
//     {"meow3": 3999, "meow1": 500},
// ]

// checkProperty(test2, "meow1");
// checkProperty(test1, "meow3");

let sortedArray = mergeSort(test1, "meow3")

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

// rankByPropertySmallestFirst(sortedArray, "meow3", 2);

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

rankByPropertyBiggestFirst(sortedArray, "meow3", 2);