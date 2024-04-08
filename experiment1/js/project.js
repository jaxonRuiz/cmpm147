// project.js - purpose and description here
// Author: Jaxon Ruiz
// Date: 4/7/24

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    const fillers = {
      faction_surname: ["Kingdom of ", "The Peoples Faction of ", "The Nation of ", "The Hegemonic Collective of "],
      faction_name: ["Ixtakia", "Novania", "Tri-Acticon", "Noxus", "Super Earth", "Piltover", "Eldia"],
      faction_subname: [": of the Risen", ": Reborn", "", " Enterprise", " and Co", " Incorperated"],
      governing_structure: ["Authoritarian", "Democratic", "Illiberal Democracy", "Egalitarian", "Republic", "Corperate", "Dictatorship", "Parlimentarian", "Communal", "Fascist"],
      economic_structure: ["Agricultural", "Militaristic", "Plunder based", "Trade", "Socialist", "Laissez faire open economy", "Planned economy", "Capitalistic Hellscape"],
      foreign_stance: ["Open", "Distrustful", "Militaristic", "Xenophobic", "Cooperative", "Exterminationist", "Friendly", "Domineering"],
      main_inhabitants: ["Humans", "Robots", "Subterranian", "Anthropomorphic", "Alien", "Rat people", "Lizard people", "The undead", "Wizards"],
      quirks: ["Doomsday cult", "Are a slave state", "Post apocalyptic", "Eats children", "Has a deep crime underbelly", "National animal is a pidgeon", "At the will of the Great God Cthulu", "Sinister secretary secrety subverts status s-quo"],      
    };
    
    const template = `
    $faction_surname $faction_name $faction_subname
    
    Governing structure: $governing_structure
    Inhabited by: $main_inhabitants
    Economic Structure: $economic_structure
    Opening Foreign Stance: $foreign_stance
    Inhabitated by: $main_inhabitants

    Extra Quirks: $quirks
    `;
    
    
    // STUDENTS: You don't need to edit code below this line.
    
    const slotPattern = /\$(\w+)/;
    
    function replacer(match, name) {
      let options = fillers[name];
      if (options) {
        return options[Math.floor(Math.random() * options.length)];
      } else {
        return `<UNKNOWN:${name}>`;
      }
    }
    
    function generate() {
      let story = template;
      while (story.match(slotPattern)) {
        story = story.replace(slotPattern, replacer);
      }
    
      /* global box */
      //box.innerText = story; glitch.com line changed to jquery
      $("#box").text(story);
    }
    
    /* global clicker */
    // clicker.onclick = generate; glitch.com line changed to jquery
    $("#clicker").click(generate);
    
    generate();    
  }
}

function main() {
  // create an instance of the class
  let myInstance = new MyProjectClass("value1", "value2");

  // call a method on the instance
  myInstance.myMethod();
}

// let's get this party started - uncomment me
main();