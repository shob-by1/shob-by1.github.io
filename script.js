fetch("data.json")
  .then(response => response.json())
  .then(data => {
    // Fill Home Page if elements exist
    if (document.getElementById("name")) {
      document.getElementById("name").innerText = data.profile.name;
      document.getElementById("title").innerText = data.profile.title;
      document.getElementById("intro").innerText = data.profile.intro;
      
      let contacts = data.profile.emails.map(email => `<a href="mailto:${email}">${email}</a>`).join(" | ");
      contacts += `<br><a href="${data.profile.linkedin}">LinkedIn</a> | <a href="${data.profile.github}">GitHub</a>`;
      document.getElementById("contacts").innerHTML = contacts;

      data.experience.forEach(exp => {
        document.getElementById("experience").innerHTML += `
          <div class="item">
            <strong>${exp.role}</strong> at ${exp.organization} (${exp.duration})
            <p>${exp.details}</p>
          </div>`;
      });
    }

    // Fill Projects Table if elements exist
    const tableBody = document.getElementById("projectsTable");
    if (tableBody) {
      data.projects.forEach(p => {
        tableBody.innerHTML += `
          <tr>
            <td>${p.domain}</td>
            <td>${p.name}</td>
            <td>${p.description}</td>
            <td><a href="${p.github}" target="_blank">GitHub</a></td>
            <td>${p.status}</td>
          </tr>`;
      });
    }
  });