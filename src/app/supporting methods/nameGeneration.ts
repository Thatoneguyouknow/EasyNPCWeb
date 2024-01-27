import { nameScheme, npcRace, npcSubrace, raceNameScheme } from '../models';
const HALFELFID = 8;

export function generateName(
  selectedRace: npcRace,
  availableNames: raceNameScheme[],
  selectedSubrace?: npcSubrace
): string {
  // If there is a subrace, use associated name scheme

  // Dwarf: First of clan Last [Sub]
  // Elf: First Last (Add functionality for children later)
  // Halfling: First (Nick?) Last
  // Human: First Last [Sub]
  // Dragonborn: First, clan Last (child names)
  // Gnome: First (Nick | First x 1-4) Last
  // Half Elf: 50/50 Elf or Human name
  // Half-Orc: Name
  // Tiefling: Infernal Name | Virtue Name

  // Half-elf does not have a name type, since they can either have human or elf names
  if (selectedRace.raceId == HALFELFID) {
    // decide between elf or human name
    let options: number[] = [1, 3];
    let index = Math.floor(Math.random() * 2);
    selectedRace.nameType = options[index];
  }

  let fullName: string = '';
  let raceScheme: raceNameScheme | undefined;

  switch (selectedRace.nameType) {
    case 0: //Dwarf
      raceScheme = availableNames.find(
        (name) => name.id == selectedRace.nameType
      );
      if (raceScheme) {
        fullName = FirstLast(raceScheme, selectedSubrace?.nameScheme);
      }
      let reformatName: string[] = fullName.split(' ');
      fullName = reformatName[0] + ' of clan ' + reformatName[1];
      break;
    case 1: // Elf
      raceScheme = availableNames.find(
        (name) => name.id == selectedRace.nameType
      );
      if (raceScheme) {
        fullName = FirstLast(raceScheme);
      }
      break;
    case 2: //Halfling
      raceScheme = availableNames.find(
        (name) => name.id == selectedRace.nameType
      );
      if (raceScheme) {
        fullName = FirstLast(raceScheme);
      }
      break;
    case 3: // Human
      raceScheme = availableNames.find(
        (name) => name.id == selectedRace.nameType
      );
      if (raceScheme) {
        fullName = FirstLast(raceScheme, selectedSubrace?.nameScheme);
      }
      break;
    case 4: // Dragonborn
      raceScheme = availableNames.find(
        (name) => name.id == selectedRace.nameType
      );
      if (raceScheme) {
        fullName = FirstLast(raceScheme);
      }
      let formatName: string[] = fullName.split(' ');
      fullName = formatName[0] + ' clan ' + formatName[1];
      break;
    case 5: // Gnome
      raceScheme = availableNames.find(
        (name) => name.id == selectedRace.nameType
      );
      if (raceScheme) {
        fullName = GnomeName(raceScheme);
      }
      break;
    case 6: // Half Orc
      raceScheme = availableNames.find(
        (name) => name.id == selectedRace.nameType
      );
      if (raceScheme) {
        fullName = FirstLast(raceScheme);
      }
      break;
    case 7: // Tiefling
      raceScheme = availableNames.find(
        (name) => name.id == selectedRace.nameType
      );
      if (raceScheme) {
        fullName = TieflingName(raceScheme);
      }
      break;
  }

  return fullName;
}

export function FirstLast(
  scheme: raceNameScheme,
  subraceScheme?: number | null
): string {
  let firstName = '';
  let lastName = '';

  if (scheme.firstNames.length > 0) {
    let firstNameScheme: nameScheme;
    if (
      subraceScheme &&
      scheme.firstNames.find((val) => val.id == subraceScheme)
    ) {
      firstNameScheme =
        scheme.firstNames[
          scheme.firstNames.findIndex((val) => val.id == subraceScheme)
        ];
    } else {
      firstNameScheme = scheme.firstNames[0];
    }
    firstName =
      firstNameScheme.firstHalf[
        Math.floor(Math.random() * firstNameScheme.firstHalf.length)
      ] +
      firstNameScheme.secondHalf[
        Math.floor(Math.random() * firstNameScheme.secondHalf.length)
      ];
  }
  if (scheme.lastNames.length > 0) {
    let lastNameScheme: nameScheme;
    if (
      subraceScheme &&
      scheme.lastNames.find((val) => val.id == subraceScheme)
    ) {
      lastNameScheme =
        scheme.lastNames[
          scheme.lastNames.findIndex((val) => val.id == subraceScheme)
        ];
    } else {
      lastNameScheme = scheme.lastNames[0];
    }

    lastName =
      lastNameScheme.firstHalf[
        Math.floor(Math.random() * lastNameScheme.firstHalf.length)
      ] +
      lastNameScheme.secondHalf[
        Math.floor(Math.random() * lastNameScheme.secondHalf.length)
      ];
  }
  return firstName + ' ' + lastName;
}

export function GnomeName(scheme: raceNameScheme): string {
  let fullName = '';
  let firstName = '';
  let lastName = '';

  let firstNameScheme: nameScheme = scheme.firstNames[0];
  firstName =
    firstNameScheme.firstHalf[
      Math.floor(Math.random() * firstNameScheme.firstHalf.length)
    ] +
    firstNameScheme.secondHalf[
      Math.floor(Math.random() * firstNameScheme.secondHalf.length)
    ];

  fullName = fullName + firstName;

  let numMiddleNames = Math.floor(Math.random() * 4) + 1;
  let middleNameScheme: nameScheme;
  let middleName = '';
  while (numMiddleNames > 0) {
    middleNameScheme = scheme.firstNames[Math.floor(Math.random() * 2)];
    middleName =
      middleNameScheme.firstHalf[
        Math.floor(Math.random() * middleNameScheme.firstHalf.length)
      ] +
      middleNameScheme.secondHalf[
        Math.floor(Math.random() * middleNameScheme.secondHalf.length)
      ];
    fullName = fullName + ' ' + middleName;
    numMiddleNames = numMiddleNames - 1;
  }

  let lastNameScheme: nameScheme = scheme.lastNames[0];
  lastName =
    lastNameScheme.firstHalf[
      Math.floor(Math.random() * lastNameScheme.firstHalf.length)
    ] +
    lastNameScheme.secondHalf[
      Math.floor(Math.random() * lastNameScheme.secondHalf.length)
    ];

  fullName = fullName + ' ' + lastName;
  return fullName;
}

export function TieflingName(scheme: raceNameScheme): string {
  let name: string = '';
  let firstNameScheme: nameScheme =
    scheme.firstNames[Math.floor(Math.random() * 2)];
  name =
    firstNameScheme.firstHalf[
      Math.floor(Math.random() * firstNameScheme.firstHalf.length)
    ] +
    firstNameScheme.secondHalf[
      Math.floor(Math.random() * firstNameScheme.secondHalf.length)
    ];
  return name;
}
