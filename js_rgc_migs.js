const golferImageContainer = document.querySelector('.golfer-img');
const golferStoryContainer = document.querySelector('.golfer-details-story');
const golferList = document.querySelector('.golfer-list ul');
const golferImage = document.querySelector('.golfer-img-1 img');
const golferName = document.querySelector('.golfer-details-1 #name');
const golferProfession = document.querySelector('.golfer-details-1 #profession');
const golferCellphone = document.querySelector('.golfer-details-1 #cellphone');
const golferEmail = document.querySelector('.golfer-details-1 #email');
const golferHome = document.querySelector('.golfer-details-1 #home');
const golferStory = document.querySelector('.golfer-story');



let golferData;
let prevEvent;
// function to sort array objects by property valiue
function sortByFirstName(a, b) {
    // converting to uppercase to have case-insensitive comparison
    const name1 = a.fname;
    const name2 = b.fname;

    let comparison = 0;

    if (name1 > name2) {
        comparison = 1;
    } else if (name1 < name2) {
        comparison = -1;
    }
    return comparison;
}

function renderHTMLData (index) {    
    golferImage.src = "./images/" + golferData[index].photo;
    golferName.innerText = golferData[index].fname + ' ' + golferData[index].lname;
    golferProfession.innerText = golferData[index].profession;
    golferCellphone.innerText = golferData[index].cellphone;
    golferEmail.innerText = golferData[index].email;
    golferHome.innerText = golferData[index].home;
    golferStory.innerText = golferData[index].mystory;
}

function searchForGolfer(subjectFullname) {
    const arrNameSurname = subjectFullname.split(' ');
    const subjectFirstName = arrNameSurname[0];
    const subjectSurname = arrNameSurname[1];

    for (let j=0; j<golferData.length; j++)  {
        if ( subjectFirstName.toLowerCase() === golferData[j].fname.toLowerCase() && 
             subjectSurname.toLowerCase() === golferData[j].lname.toLowerCase()) {
            /*
            console.log('\nMatched: ', subjectFullname);
            console.log('Index  : ', j);
            */
            return j;
        }
    }   
    alert(`This golfer is NOT in the list of MIGS : ${subjectFullname}`);   
    return -1;  /* if no match if found */
}

// determine the golfer selected ...
golferList.addEventListener('click', (event) => { 
    const golferListNames = document.querySelectorAll('.name');    
    golferListNames.forEach ((element) => {
        // reset highlight on all name elements, mainly the previously selected golfer
        element.style.color = "black";
        element.style.textDecoration = "none";
    });
    // highlight the selected golfer
    event.target.style.color = "blue";
    event.target.style.textDecoration = "underline";

    // search for the index of this golfer from the list of available golfers
    const subjectName = event.target.innerText;
    golferIndex = searchForGolfer(subjectName);
    if (golferIndex < 0) {
        return;
    }
    // display golfer details on the MIGS page
    renderHTMLData(golferIndex);
    golferImageContainer.classList.remove('hide-me');
    golferStoryContainer.classList.remove('hide-me');
});

// load the list of MIGS from the provided data file
async function getMemberGolferData(file) {
    let golferFileContent = await (fetch(file));
    let golferDataString = await golferFileContent.text();
    golferData = JSON.parse(golferDataString);

    // sort the golfers by name
    let myArrOfGolferObjects = [];
    for (let i=0; i<golferData.length; i++) {
        myArrOfGolferObjects.push({'fname':golferData[i].fname, 'lname': golferData[i].lname});
    }
    myArrOfGolferObjects.sort(sortByFirstName);
    /* console.log('POST-SORT:\n', myArrOfGolferObjects);*/

    for (let i=0; i<myArrOfGolferObjects.length; i++) {
        const li = document.createElement('li');
        const spanGolferName = document.createElement('span');
        spanGolferName.textContent = myArrOfGolferObjects[i].fname + ' ' + myArrOfGolferObjects[i].lname;
        spanGolferName.classList.add('name');

        // append the golfer name span element to the list item, <li>
        li.appendChild(spanGolferName);

        // append the new <li> item above to the <ul> golfer list
        golferList.appendChild(li);
    }

    // add a dummy entry to test for not found 
    for (let k=0; k < 1; k++) {   
        const li = document.createElement('li');
        const spanGolferName = document.createElement('span');
        spanGolferName.textContent = 'My man Gucci Mane';
        spanGolferName.classList.add('name');

        // append the golfer name span element to the list item, <li>
        li.appendChild(spanGolferName);

        // append the new <li> item above to the <ul> golfer list
        golferList.appendChild(li);
    }
}

// read member data from json file 
const member_golfer_data_file = './files/golfer_data.json';
getMemberGolferData(member_golfer_data_file);

// do not show the image and golfer data blocks 
golferImageContainer.classList.add('hide-me');
golferStoryContainer.classList.add('hide-me');
