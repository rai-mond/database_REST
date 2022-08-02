


$(document).ready(function() {
  $("#getDegreeDetails").click(function() {
    console.log("getDegreeDetails was clicked");
    makeXHRequest();
  });

  $("#getDegreeDetailsByFetch").click(function() {
    makeFetch();
  });
});

// Fetch request
function makeFetch() {
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  let table = $(".educationFetch");

  fetch("data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Netork was not OK");
      } else {
        return response.json();
      }
    })
    .then(data => {
      populateTable(data.degrees, table);
    })
    .catch(error => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      alert("There has been a problem with your fetch operation:", error);
    });
}

//  XMLHttpRequest
function makeXHRequest() {
  
  let httpRequest = new XMLHttpRequest();
  //httpRequest.withCredentials = true;
  let json = JSON.stringify({
    name: "John",
    surname: "Smith"
  });


/*
  // validate that httpRequest object was created successfully
  if (!httpRequest) {
    alert("Problem making request, please try again later");
  }
  let table = $(".educationXHR");
  console.log(httpRequest.readyState);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        let degreeList = JSON.parse(httpRequest.responseText).degrees;
        populateTable(degreeList, table);
      } else {
        // there was an issue
        alert("There was a problem with the request " + httpRequest.status);
      }
    } else {
      console.log("Progress = ", httpRequest.readyState);
    }
  };
*/


    // track upload progress
    httpRequest.upload.onprogress = function(event) {
      console.log(`Uploaded ${event.loaded} of ${event.total}`);
    };
  
    // track completion: both successful or not
    httpRequest.onloadend = function() {
      if (httpRequest.status == 200) {
        console.log("success");
      } else {
        console.log("error " + this.status);
      }
    };

  httpRequest.open('POST', "/data1.json");
  httpRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  httpRequest.send(json);


  /*
  // this is how we fire the function above
  httpRequest.open("GET", "data.json");
  httpRequest.send();
  */
}

function populateTable(degreeList, table) {
  //https://stackoverflow.com/questions/178407/select-all-child-elements-except-the-first
  // $(".educationFetch tr:not(:first-child)").replaceWith("");
  // $(".educationFetch").find("tr:not(:first-child)").replaceWith("");
  table.find("tr:not(:first-child)").replaceWith("");
  // table.replaceWith("");
  // let degreeList = JSON.parse(httpRequest.responseText).degrees;
  console.log("**********************");
  console.log("degreeList ->", degreeList);
  console.log("typeOf(degreeList):" + typeof degreeList);
  /* Table structure
    <tr>
          <th>Degree</th>
          <th>Concentration</th>
          <th>University</th>
          <th>Year</th>
          <th>GPA</th>
          <th>Logo</th>
      </tr>
------------------------------------
      JSON Structure:
        "name": 
        "major":
        "university":
        "link": 
        "year": 
        "gpa": "
        "logo": 

  */
  //if (Array.isArray(degreeList)) {
    console.log("degreeList is an array");
    //for (let degree of degreeList) {
      // degreeList.forEach(degree => {
      //console.log("** " + degree.name);
      let row = "";

      row = `<tr>
                          <td>${degreeList.name}</td>
                          <td>${degreeList.major}</td>
                          <td><a href=${degreeList.link} target="_blank" rel="noreferrer noopener">${degreeList.university}</a></td>
                          <td>${degreeList.year}</td>
                          <td>${degreeList.gpa}</td>
                          <td><img src=${degreeList.logo} alt='${degreeList.university} logo' width="100"></td>
                       </tr>
                      `;
      console.log("****" + row + "****");
      // $("table tr:last-child").replaceWith(row);
      table.append(row);
    //}
    // });
  //} else {
  //  console.log("degreeList is NOT an array, check the JSON file");
  //}
  console.log("**********************");
}

// Different wait options
// https://stackoverflow.com/questions/6921895/synchronous-delay-in-code-execution
//   function wait(ms) {
//     console.log("Sleeping for 20 seconds before next request.");
//     row = `<tr>
//                 <td> </td>
//                 <td><img id="loading-image" src="https://media.giphy.com/media/5AtXMjjrTMwvK/giphy.gif" alt="Loading..." /></td>
//                 <td> </td>
//                 <td> </td>
//                 <td> </td>
//                 <td> </td>
//              </tr>
//             `;
//   table.append(row);
//     var start = Date.now(),
//         now = start;
//     while (now - start < ms) {
//       now = Date.now();
//     }
// }
//             setTimeout(function() {
//               console.log("Sleeping for 20 seconds before next request.");
//               row = `<tr>
//                           <td> </td>
//                           <td><img id="loading-image" src="https://media.giphy.com/media/5AtXMjjrTMwvK/giphy.gif" alt="Loading..." /></td>
//                           <td> </td>
//                           <td> </td>
//                           <td> </td>
//                           <td> </td>
//                        </tr>
//                       `;

//             table.append(row);
//             }, 2000);
// wait(2000);
