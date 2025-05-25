function convertTime() {
  const input = document.getElementById("inputTime").value;
  const direction = document.getElementById("direction").value;
  const season = document.getElementById("season").value;

  const [hour, minute] = input.split(":").map(Number);

  const berlinOffset = season === "summer" ? 2 : 1;
  const miamiOffset = season === "summer" ? -4 : -5;
  let result;

  // Umrechnung der Uhrzeit
  if (direction === "de2us") {
      const utcHour = (hour - berlinOffset + 24) % 24;
      const miamiHour = (utcHour + miamiOffset + 24) % 24;
      result = `${String(miamiHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  } else {

      // Uhrzeit in UTC umrechnen
      const utcHour = (hour - miamiOffset + 24) % 24;
      const berlinHour = (utcHour + berlinOffset + 24) % 24;
      result = `${String(berlinHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  
  document.getElementById("convertedResult").textContent = result;
}


function updateLiveTimes() {

  const now = new Date();
  const season = document.getElementById("season").value;


  const berlinOffset = season === "summer" ? 2 : 1;
  const miamiOffset = season === "summer" ? -4 : -5;


  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const utcSeconds = now.getUTCSeconds();
  
  // Deutschland-Zeit berechnen
  const germanyHours = (utcHours + berlinOffset + 24) % 24;
  const germanyTime = `${String(germanyHours).padStart(2, "0")}:${String(utcMinutes).padStart(2, "0")}:${String(utcSeconds).padStart(2, "0")}`;
  document.getElementById("germanyTime").textContent = germanyTime;
  
  // Miami-Zeit berechnen
  const miamiHours = (utcHours + miamiOffset + 24) % 24;
  const miamiTime = `${String(miamiHours).padStart(2, "0")}:${String(utcMinutes).padStart(2, "0")}:${String(utcSeconds).padStart(2, "0")}`;


  document.getElementById("miamiTime").textContent = miamiTime;

  // Zeitunterschied berechnen und anzeigen
  const diff = Math.abs(berlinOffset - miamiOffset);
  document.getElementById("diff").textContent = `${diff} Stunden`;
}

setInterval(updateLiveTimes, 1000);

updateLiveTimes();