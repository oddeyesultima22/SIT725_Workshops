function appendValue(val) {
    const display = document.getElementById("display");
    display.value += val;
  }
  
  function clearDisplay() {
    document.getElementById("display").value = "";
  }
  
  function calculate() {
    const display = document.getElementById("display");
    try {
      // Evaluate the expression safely
      display.value = eval(display.value) || "";
    } catch (e) {
      display.value = "Error";
    }
  }
  