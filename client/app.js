function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var beds = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price"; // Adjust as needed

    $.ajax({
        url: "http://127.0.0.1:5000/predict_home_price",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            area: parseFloat(sqft.value),
            location: location.value,
            beds: beds,
            bath: bathrooms
        }),
        success: function(data) {
            console.log(data.estimated_price);
            estPrice.innerHTML = "<h2>" + data.estimated_price + " Taka</h2>";
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
            estPrice.innerHTML = "<h2>Error: " + (xhr.responseJSON ? xhr.responseJSON.error : 'Unknown error') + "</h2>";
        }
    });

}



function onPageLoad() {
  console.log( "document loaded" );
  // var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;
