let userInput = document.getElementById('userInput')
    $('#btn').click(function () {
        
        search()
    })
function search() {
  const KEY = '0dfd77cf23ff4e86a2b0a2b599e3574b';
  let city = userInput.value;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}&lang=sv`
  fetch(url).then(
    function (response) {
      // console.log(response);
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      else {
        throw 'error';
      }
    }
  ).then(
    function (data) {
      setMessage(" ")
      console.log(data);
      const { city_name, country_code } = data;
      const { temp, wind_spd, rh } = data.data[0];
      const { description, icon } = data.data[0].weather
      $('.city-name').html('stad: ' + city_name + ' ' + country_code);
      $('.temperature').html('Tempratur: ' + Math.floor(temp) + " C°");
      $('.description').html(description);
      $('.wind-speed').html('Vindhastighet: ' + wind_spd);
      $('.wind-humidity').html('Luftfuktighet : ' + rh + '%');
      $('.weather-icon-image').attr("src", `https://www.weatherbit.io/static/img/icons/${icon}.png`);
      clearDiv()
      for (let i = 1; i < 5; i++) {
        const { datetime, temp } = data.data[i];
        const { description, icon } = data.data[i].weather
        const days = $("<div></div>");
        let description5 = $("<p></p>").html(description);
        let img5 = $("<img></img>").attr("src", `https://www.weatherbit.io/static/img/icons/${icon}.png`)
        let temperature5 = $("<p></p>").html(Math.floor(temp) + " C°");
        let date = $("<p></p>").html(datetime);
        $(days).append(description5, img5, temperature5, date);
        $('#five-days').append(days);
      }
    }
  ).catch(
    function (error) {
      setMessage("Ingen stad hittades!!")
    }
  );
}
function clearDiv() {
  const divEl = $('#five-days *')
  for (let el of divEl) { el.remove() };
}

function setMessage(message) {
  $("#message").html(message);
}