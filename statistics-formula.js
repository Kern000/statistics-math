
// 1st parameter expects an array of object
// 2nd parameter expects a string matching object key in array of object

function mergeSort(arrayOfObjects, propertyToSortBy){

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

    if(arrayOfObjects.length <= 1){
        return arrayOfObjects;
    }                              // breaks the recursive eventually

    let middleIndex = Math.floor(array.length/2);
    let left = mergeSort(arrayOfObjects.slice(0,middleIndex));
    let right = mergeSort(arrayOfObjects.slice(middleIndex));

    let sortedValues = [];

    let leftIndexSlider = 0; 
    let rightIndexSlider = 0;

    while (leftIndexSlider < left.length && rightIndexSlider < right.length){
        if(left[leftIndexSlider].propertyToSortBy < right[rightIndexSlider].propertyToSortBy){
            sortedValues.push(left[leftIndexSlider]);
            leftIndexSlider ++;
        }
        



    }

}