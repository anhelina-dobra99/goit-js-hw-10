import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector(".form").addEventListener("submit", function (event) {
  event.preventDefault(); 

    const delayInput = this.elements.delay;
    const delay = Number(delayInput.value);
    const state = this.elements.state.value;
    
    if (delay < 0) {
    iziToast.warning({
      title: "Warning",
      message: "⏳ Delay cannot be negative!",
      position: "topRight",
    });
        delayInput.value = "";
        this.querySelectorAll('input[name="state"]').forEach((radio) => {
        radio.checked = false;
      });
        return;
    }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

    promise
        .then((delay) => {
            iziToast.success({
                title: "Success",
                message: `✅ Fulfilled after ${delay}ms`,
                position: "topRight",
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: "Error",
                message: `❌ Rejected after ${delay}ms`,
                position: "topRight",
            });
        })
        .finally(() => {
            delayInput.value = "";
            this.querySelectorAll('input[name="state"]').forEach((radio) => {
                radio.checked = false;
      });
        });
});

