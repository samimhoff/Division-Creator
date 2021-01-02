//Faction Selector:
let factionSelector = document.getElementById('faction');
let axisNationalitySelector = document.getElementById('axisNationalityClass');
let alliesNationalitySelector = document.getElementById('alliesNationalityClass');

factionSelector.addEventListener('change', function(){
    if(factionSelector.value === 'axis'){
        axisNationalitySelector.style.display = 'block';
        alliesNationalitySelector.style.display = 'none';
    } else if(factionSelector.value === 'allies'){
        alliesNationalitySelector.style.display = 'block';
        axisNationalitySelector.style.display = 'none'; 
    } else {
        alliesNationalitySelector.style.display = 'none';
        axisNationalitySelector.style.display = 'none';
    }
})


//Best Nationalities:
let bestNationalityYes = document.getElementById('bestNationalityYes');
let bestNationalityNo = document.getElementById('bestNationalityNo');
let worstNationalities = document.getElementsByClassName('worstNationalities');

bestNationalityYes.addEventListener('change', function(){
    if(this.checked){   
        for(let i = 0; i < worstNationalities.length; i++){
            let worsty = worstNationalities[i];
            worsty.style.display = 'none';
        } 
    }
})
bestNationalityNo.addEventListener('change', function(){
    if(this.checked){
        for(let i = 0; i < worstNationalities.length; i++){
            let worsty = worstNationalities[i];
            worsty.style.display = 'inline';
        }
    }
});

//Does it make more sense to make classes for each unit type, then add countries?
//Yes, make stacked object with unit types

let masterUnitTypes = {
    infantry: {
        ider: 'infantry',
        allCountries: true,
        countriesList: {
            'germany': 'divisiooon',
            'sovietUnion': 'Pup', 
            'italy': 'Male',
            'france': 'fish'
        },
        standardInfantry: {
            light: {

            },
            standard: {

            },
            heavy: {

            }
        },
        mobileInfantry: {
            allCountries: false,
            ider: 'Mobile Infantry',
            countriesList: {
                'germany': 'Motor',
                'sovietUnion': 'Pup', 
                'italy': 'Male',
                'france': 'fish'
            },
            motorized: {

            },
            mechanized: {

            }
        },
        mountainInfantry: {

        },
        airborneInfantry: {

        },
        securityInfantry: {

        },
        politicalUnitInfantry: {

        },
        otherInfantry: {

        }
    },
    antiAircraft: {
        ider: 'antiAircraft',

    },
    artillery: {
        ider: 'artillery',

    },
    cavalry: {
        ider: 'cavalry',

    },
    tank: {
        ider: 'tank',

    },
    other: {
        ider: 'other',

    }
}

//Sketching out compatibility function:

let firstUnitOptions = function compatibility(country, obj){
    let availUnitTypes = {};
    for(let key in obj){
        let doggy = obj[key];
        let horsePup = doggy[ider];
        let doggyDoggy = doggy[countriesList];
        let translatedName = doggyDoggy[country];
        let countriesArray = Object.keys(doggyDoggy)
        if(countriesArray.includes(country)){
            availUnitTypes[horsePup] = translatedName;
        }
    }
    return availUnitTypes;
}
//FIRST PICK:
//compatibility after user picks country (rerun once changed) and then the return value is saved to firstUnitOptions
//based on these names, an object is has to be sent to HTML through DOM, 
//could make a function that automatically creates the innerHTML content for the select options
//      would do arr.forEach for each of the array items and output `<option value='${arr[i]}'>${arr[i].toUpperCase()}</option>` 
//   OPTION 2 (BEST OPTION)
//Based on array chosen by firstUnitOptions, already created <option value='dog'>${Dog}</option>'s in the html are selected
//to be changed from display = 'none' -> to display = 'inline'.

let select1 = 1; //This will be selected through DOM obviously
//SECOND PICK:
//Then we need to do the same thing in the smaller object, now using the select1, the object, and the country


let secondUnitOptions = function compatibility(country, obj, select1){
    let availUnitTypes = [];
    let newObj = obj[select1];
    for(let key in obj){
        let doggy = newObj;
        let horsePup = doggy[ider];
        if(doggy[countriesList].includes(country)){
            availUnitTypes.push(horsePup);
            //translation object could be referenced here if going that route for translation
        }
    }
    return availUnitTypes;
}

//THIRD PICK:
//Repeat last step!!


//SPECIFIC NAME SOLUTION:
//Specific names actually need to be provided earlier. It would probably worthwhile to provide them the
//genre of the unit (artillery, light infantry) in addition to the translation. This needs to be in the above object.
//The translations could either be written into the main object, or in a new one to be referenced. Probably former is better.








//EXAMPLE
//https://www.axishistory.com/books/151-germany-luftwaffe/luftwaffe-ground-units/5674-1-fallschirmjaeger-division

let fallschirmjaeger1 = {
    name: '1st Fallschirmjaeger',
    faction: 'Axis',
    nationality: 'German',
    size: 'Division',
    type: 'Airborne Infantry',
    coTitle: 'General der Fallschirmtruppe',
    co: 'Richard Heidrich',
    staff: {
        parent: 'fallschirmjaeger1',
        name: 'Fallschirmjaeger HQ',
        size: 'HQ',
        platoon: {
            type: 'Motorcycle',
            size: 'Platoon'
        }
    },
    regiment1: {
        number: 3,
        names: ['1st Fallschirmjaeger Regiment', '3rd Fallschirmjaeger Regiment', '4th Fallschirmjaeger Regiment'],
        parent: 'fallschirmjaeger1',
        size: 'regiment',
        staff: true,
        type: 'infantry',
        battalion1: {
            number: 3,
            type: 'infantry',
            platoon1: {
                type: 'Signals',
                size: 'Platoon'
            },
            platoon2: {
                type: 'Bicycle',
                size: 'Platoon'
            },
            platoon3: {
                type: 'Pioneer',
                size: 'Platoon'
            },
            company1: {
                number: 3,
                type: 'Infantry'
            },
            company2: {
                type: 'Heavy Infantry'
            }
        }
    },
    company1: {
        name: '13th Fallschirmjaeger Nebelwerfer Company',
        size: 'Company',
        type: 'Artillery',
        specialType: 'Chemical'
    },
    company2: {
        name: '14th Fallschirmjaeger Panzerjaeger Company',
        type: 'Infantry',
        specialType: 'Anti-Tank'
    },
    regiment2: {
        name: '11th Fallschirmjäger Artillery Regiment',
        type: 'Artillery',
        staff: true,
        size: 'Regiment',
        platoon1: {
            type: 'Signals',
            size: 'Platoon'
        },
        Special1: {
            number: 3,
            names: false,
            name: 'Battery',
            type: 'Artillery'
        },
        Special2: {
            name: 'Supply Column',
            type: 'Supply'
        }
    },
    Battalion1: {
        name: ' 1st Fallschirmjäger Pioneer Battalion',
        staff: true,
        platoon1: {
            name: 'Signals',
            type: 'Signal'
        },   
    }

}

//Make a way to convert an array into the object



//Work on how to ask        




//PROBLEM: how does the application know that able company is attached to 2nd infantry battallion thats attached to 1st infantry brigade?
    //SOLUTION: each child object has a key: value pair of -- 'attached to': '2nd infantry battallion'. 
//PROBLEM: how to get the app to know how big and the hierarchy between division, brigade, battlion, company, etc.?
    //SOLUTION: make an external object that corresponds to whether the unit is a division, brigade... etc. and also maybe the type of unit.
//PROBLEM: how to deal with leadership beyond the commanding officer? Include option to include highest ranking sergeant? Staff officers?

//
//What the app should achieve:
//-Provide a TREE of nodes that shows the structure
//-If you select a company or platoon, it will show you the parents.
//-ULTIMATE GOAL - Be able to create a division with HTML form.
//-(Advanced) - Automatically populate a regiment with battalions and companies if no more detail is provided.
//-(Advanced) - give NATO markings for the relevant types of units.


//LATER PROBLEMS:
//PROBLEM: how to deal with leadership beyond the commanding officer? Include option to include highest ranking sergeant? Staff officers?
//PROBLEM: how to detach and reattach different units to form Kampfgruppen?