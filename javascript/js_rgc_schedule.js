const schedGameList = document.querySelectorAll('.game');
const fileSelector = document.querySelector('.file-selector');
const inputFileName = document.getElementById('input');
const resultsHeading = document.querySelector('.results-heading');
const gameResult = document.querySelector('.game-result');
const orderedList = document.getElementById('ordered-list');
const closeButton = document.querySelector('.close-btn');

let selectedGame = '';
let thisGameDesc = '';
let scheduleFile = '';

// function to sort array objects by property valiue
function compareScores(a, b) {
    // converting to uppercase to have case-insensitive comparison
    const score1 = a.score;
    const score2 = b.score;

    let comparison = 0;

    if (score1 > score2) {
        comparison = 1;
    } else if (score1 < score2) {
        comparison = -1;
    }
    return comparison;
}

function createListItems (thisGolfersName, thisGolfersScore) {                                           
    // create <li> element 
    const li = document.createElement('li');
    li.classList.add('list-item');
    // create name and score span elements
    const spanName = document.createElement('span');
    const spanScore = document.createElement('span');
    // add text content
    spanName.textContent = thisGolfersName;
    spanScore.textContent = thisGolfersScore;

    // add classes, for the styling conformity
    spanName.classList.add('name');
    spanScore.classList.add('score');
    // append the two child elements to the list item, <li>
    li.appendChild(spanName);
    li.appendChild(spanScore);
    // append the new <li> item above to the <ul> list
    orderedList.appendChild(li);
}

function displayGameResult() {
    if (scheduleFile) {
        fileSelector.classList.add('hide-me')
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(scheduleFile);

        fileReader.onload = (e) => {
            let ourData = e.target.result;
            let workbook = XLSX.read(ourData, {type:"binary"});
            //console.log(workbook);
            workbook.SheetNames.forEach((sheet) => {
                if (sheet === 'Sheet1') {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    let stringData = JSON.stringify(rowObject, undefined, 5);
                    //console.log(stringData);
                    let jsonData = JSON.parse(stringData);
                    console.log('jsonData: ',jsonData);

                    let myArrOfObjects = []; // store objects in the array to sort
                    resultsHeading.innerText = selectedGame + ' results';
                    let golferName='';
                    let golferScore=''
                    let rejectCount = 0;
                    for (let i=0; i<jsonData.length; i++) {
                        if (i<2) {
                            rejectCount++;
                            continue;
                        }
                        golferName = jsonData[i].FORMAT;
                        switch(thisGameDesc) {
                            case 'Medal1':
                            {
                                golferScore = jsonData[i].Medal1;
                                break;
                            }
                            case 'Medal2':
                            {
                                golferScore = jsonData[i].Medal2;
                                break;
                            }
                            case 'Medal3':
                            {
                                golferScore = jsonData[i].Medal3;
                                break;
                            }
                            case 'Medal4':
                            {
                                golferScore = jsonData[i].Medal4;
                                break;
                            }
                            case 'Medal5':
                            {
                                golferScore = jsonData[i].Medal5;
                                break;
                            }
                            case 'Medal6':
                            {
                                golferScore = jsonData[i].Medal6;
                                break;
                            }
                            case 'Medal7':
                            {
                                golferScore = jsonData[i].Medal7;
                                break;
                            }
                            case 'Medal8':
                            {
                                golferScore = jsonData[i].Medal8;
                                break;
                            }
                            case 'IPS1':
                            {
                                golferScore = jsonData[i].IPS1;
                                break;
                            }
                            case 'IPS2':
                            {
                                golferScore = jsonData[i].IPS2;
                                break;
                            }
                            case 'IPS3':
                            {
                                golferScore = jsonData[i].IPS3;
                                break;
                            }
                            case 'IPS4':
                            {
                                golferScore = jsonData[i].IPS4;
                                break;
                            }
                            default:
                            {
                                break;
                            }
                        }
                        
                        if (golferScore == 200 || golferScore === 0 ) {
                            rejectCount++;
                            continue;
                        }
                        myArrOfObjects.push({ 'name':golferName, 'score':golferScore});
                    }
                    myArrOfObjects.sort(compareScores);
                    //console.log(myArrOfObjects);
        
                    if (thisGameDesc.slice(0, 3).toUpperCase() === 'MED') {
                        for (let i=0; i<myArrOfObjects.length; i++) {
                            //console.log('Golfer: ', golferName, ' Score: ', golferScore);
                            createListItems(myArrOfObjects[i].name, myArrOfObjects[i].score);
                        }
                    } else {
                        for (let i=myArrOfObjects.length-1; i>=0; i--) {
                            //console.log('Reject count: ', rejectCount, 'Length: ', jsonData.length);
                            createListItems(myArrOfObjects[i].name, myArrOfObjects[i].score)
                        }
                    }
                    // if there is data to show, reveal game result
                    // the -2 is for the other two rows in the xlsx that contain header data
                    if (rejectCount < (jsonData.length - 2)) {
                        gameResult.classList.remove('hide-me');
                    } else {
                        alert('Results for this game may NOT be availbe yet!!!');
                    }
                }
            });
        };  
    }
}

function destroyListItems() {
    const numberOfChildElements = orderedList.childElementCount;
    for (let i=0; i < numberOfChildElements; i++) {
        orderedList.removeChild(orderedList.lastElementChild);
    }
    gameResult.classList.add('hide-me');
}

for (let i=0; i<schedGameList.length; i++) {
    schedGameList[i].addEventListener('click', (event)=> {
        // on selecting a new game destroy previous displayed list items, first
        destroyListItems();
        
        selectedGame = event.target.innerText.trim();
        myArr = selectedGame.split(' ');
        thisGameDesc='';
        for (let j=0;j<myArr.length;j++) {
            thisGameDesc += myArr[j];
        }

        // activate file selector, but if previously selected ignore
        if (!scheduleFile) {
            fileSelector.classList.remove('hide-me');
            alert('select file containing game results');
        } else {
            displayGameResult();
        }
    });
}

inputFileName.addEventListener('change', (event) => {
    scheduleFile = event.target.files[0];
    fileSelector.classList.add('hide-me');
    displayGameResult();
});

closeButton.addEventListener('click', (event) => {
    destroyListItems();
});