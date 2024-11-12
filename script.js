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
         teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
           teeBox.totalYards
         } yards</option>`
      });
      
      document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
}

getAvailableGolfCourses();

let courseSelect = document.getElementById('course-select');

courseSelect.addEventListener('change', () => {
    console.log(getGolfCourseDetails(courseSelect.value));
});


let teeSelect = document.getElementById('tee-box-select');

teeSelect.addEventListener('change', () => {
    console.log(teeSelect.value);
});


