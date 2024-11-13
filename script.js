async function getAvailableGolfCourses() {
    const url = "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      const json = await response.json();
  
      objectSize = Object.keys(json).length;

      let courses = [];
      for (let i = 0; i < objectSize; i++) {
        courses.push(json[i]);
      }

      let courseOptionsHtml = '';

      courses.forEach((course) => {
        courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
      });

      document.getElementById('course-select').innerHTML = courseOptionsHtml;

    } catch (error) {
      console.error(error.message);
    }
}


async function getGolfCourseDetails(golfCourseId) {
    const url = `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      let teeBoxesArray = [];
      let teeBoxesSize = Object.keys(json.holes[0].teeBoxes).length;

      console.log(teeBoxesSize);

      for (let i = 0; i < teeBoxesSize; i++) {
        teeBoxesArray.push(json.holes[0].teeBoxes[i]);
      } 
      

      console.log(`This is the teeBox Array: ${teeBoxesArray}`);

      

      console.log(json.holes[0].teeBoxes[0].teeType);

      let index = 0;
      let teeBoxSelectHtml = ''
      teeBoxesArray.forEach(function (teeBox, index) {
         teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}</option>`
      });
      
      document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
}

getAvailableGolfCourses();

let courseSelect = document.getElementById('course-select');
let teeSelect = document.getElementById('tee-box-select');
let firstNineTotalYardsBox = document.getElementById('y-firstnine-out');
let firstNineTotalParBox = document.getElementById('p-firstnine-out');
let firstNineTotalHandicapBox = document.getElementById('h-firstnine-out');
let backNineTotalYardsBox = document.getElementById('y-backnine-out');
let backNineTotalParBox = document.getElementById('p-backnine-out');
let backNineTotalHandicapBox = document.getElementById('h-backnine-out');

test = getAvailableGolfCourses(courseSelect.value);

courseSelect.addEventListener('change', () => {
    getGolfCourseDetails(courseSelect.value).then(result => {
      console.log(result);
      let totalYards = 0;
      let totalPar = 0;
      let totalHandicap = 0;
      let firstNineYards = 0;
      let firstNinePar = 0;
      let firstNineHandicap = 0;

      for (let i = 0; i < 18; i++) {
        let yardId = `y-${i}`;
        let parId = `p-${i}`;
        let handicapId = `h-${i}`;
        let box = document.getElementById(yardId);
        let par = document.getElementById(parId);
        let handicap = document.getElementById(handicapId);
        totalYards += result.holes[i].teeBoxes[teeSelect.value].yards;
        totalPar += result.holes[i].teeBoxes[teeSelect.value].par;
        totalHandicap += result.holes[i].teeBoxes[teeSelect.value].hcp;
        if (i === 8) {
          firstNineYards = totalYards;
          firstNinePar = totalPar;
          firstNineHandicap = totalHandicap;
        }
        box.innerHTML = result.holes[i].teeBoxes[teeSelect.value].yards;
        par.innerHTML = result.holes[i].teeBoxes[teeSelect.value].par;
        handicap.innerHTML = result.holes[i].teeBoxes[teeSelect.value].hcp;
      }
      firstNineTotalYardsBox.innerHTML = firstNineYards;
      firstNineTotalParBox.innerHTML = firstNinePar;
      firstNineTotalHandicapBox.innerHTML = firstNineHandicap;
      backNineTotalYardsBox.innerHTML = totalYards;
      backNineTotalParBox.innerHTML = totalPar;
      backNineTotalHandicapBox.innerHTML = totalHandicap;

      teeSelect.addEventListener('change', () => {
          console.log(`This is my teeBoxIndex: ${teeSelect.value}`);
          totalYards = 0;
          for (let j = 0; j < 9; j++) {
            let yardId = `y-${j}`;
            let parId = `p-${j}`;
            let handicapId = `h-${j}`;
            let box = document.getElementById(yardId);
            let par = document.getElementById(parId);
            let handicap = document.getElementById(handicapId);
            totalYards += result.holes[j].teeBoxes[teeSelect.value].yards;
            totalPar += result.holes[j].teeBoxes[teeSelect.value].par;
            totalHandicap += result.holes[j].teeBoxes[teeSelect.value].hcp;
            if (j === 8) {
              firstNineYards = totalYards;
              firstNinePar = totalPar;
              firstNineHandicap = totalHandicap;
            }
            box.innerHTML = result.holes[j].teeBoxes[teeSelect.value].yards;
            par.innerHTML = result.holes[j].teeBoxes[teeSelect.value].par;
            handicap.innerHTML = result.holes[j].teeBoxes[teeSelect.value].hcp;
          }
          firstNineTotalYardsBox.innerHTML = firstNineYards;
          firstNineTotalParBox.innerHTML = firstNinePar;
          firstNineTotalHandicapBox.innerHTML = firstNineHandicap;
          backNineTotalYardsBox.innerHTML = totalYards;
          backNineTotalParBox.innerHTML = totalPar;
          backNineTotalHandicapBox.innerHTML = totalHandicap;
      });
    });
});






