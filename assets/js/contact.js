/**
 * Quote form: builds a ready-to-send message and hands it to WhatsApp or the
 * visitor's email app. No backend needed. The WhatsApp number and email address
 * come from data-whatsapp / data-email on #quote-form in index.html.
 */
(function () {
  "use strict";

  var form = document.getElementById("quote-form");
  if (!form) return;

  var status = form.querySelector(".form-status");

  function value(name) {
    var field = form.elements[name];
    return field ? field.value.trim() : "";
  }

  function buildMessage() {
    var lines = [
      "Hello Startech Communications, I would like a quote.",
      "",
      "Name: " + value("name")
    ];
    if (value("company")) lines.push("Company: " + value("company"));
    lines.push("Phone: " + value("phone"));
    if (value("email")) lines.push("Email: " + value("email"));
    lines.push("Service: " + value("service"));
    lines.push("", value("message"));
    return lines.join("\n");
  }

  // Open a URL from a click, which keeps popup blockers happy.
  function open(url, newTab) {
    var a = document.createElement("a");
    a.href = url;
    if (newTab) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function send(channel) {
    if (!form.checkValidity()) {
      status.textContent = "Please fill in your name, phone, the service you need and a short message.";
      form.reportValidity();
      return;
    }

    var text = buildMessage();

    if (channel === "email") {
      var subject = "Quote request: " + value("service");
      status.textContent = "Opening your email app…";
      open("mailto:" + form.dataset.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(text), false);
    } else {
      status.textContent = "Opening WhatsApp…";
      open("https://wa.me/" + form.dataset.whatsapp + "?text=" + encodeURIComponent(text), true);
    }
  }

  form.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-channel]");
    if (btn) send(btn.getAttribute("data-channel"));
  });

  // Pressing Enter in a field should not reload the page; treat it as WhatsApp.
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    send("whatsapp");
  });
})();
