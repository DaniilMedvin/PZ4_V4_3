function render(targetId, item) {
  document.getElementById(targetId).innerHTML =
    "<p>Назва: " + item.name + "</p>" +
    "<p>Годин: " + item.hours + "</p>" +
    "<p>Викладач: " + item.teacher + "</p>";
}

function maxByHours(items) {
  return items.reduce((a, b) => (b.hours > a.hours ? b : a));
}

async function loadXml() {
  const text = await (await fetch("disciplines.xml")).text();
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const items = Array.from(doc.getElementsByTagName("discipline")).map((d) => ({
    name: d.getElementsByTagName("name")[0].textContent,
    hours: Number(d.getElementsByTagName("hours")[0].textContent),
    teacher: d.getElementsByTagName("teacher")[0].textContent,
  }));
  render("xml-result", maxByHours(items));
}

async function loadJson() {
  const data = await (await fetch("disciplines.json")).json();
  render("json-result", maxByHours(data.disciplines));
}

loadXml();
loadJson();
