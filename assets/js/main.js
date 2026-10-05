// Work history, education, certificates, and projects are in content.js.
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function externalLink(url, label, className) {
  // Only allow web links in editable content.
  try {
    const address = new URL(url, window.location.href);
    if (!["https:", "http:"].includes(address.protocol)) return null;
    const link = element("a", className, label);
    link.href = address.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  } catch {
    return null;
  }
}

function renderTimeline(targetId, entries, education = false) {
  const list = document.getElementById(targetId);
  list.replaceChildren();
  for (const entry of entries) {
    const card = element("li", "panel timeline-entry");
    const heading = element("div", "entry-header");
    heading.append(
      element("h4", "", education ? entry.program : entry.role),
      element("span", "period", entry.period)
    );
    const organization = education ? entry.school : entry.company;
    card.append(heading, element("p", "muted small",
      organization + (entry.location ? " · " + entry.location : "")
    ));
    if (entry.points.length) {
      const points = element("ul", "entry-points");
      entry.points.forEach(point => points.append(element("li", "", point)));
      card.append(points);
    }
    list.append(card);
  }
}

const cardColors = ["red", "orange", "gold"];

function renderCertificates(certificates) {
  const list = document.getElementById("certificate-list");
  list.replaceChildren();
  certificates.forEach((certificate, index) => {
    const item = element("li");
    const card = element("article", "color-card " + cardColors[index % 3] + " certification-card");
    const top = element("div", "card-top");
    top.append(element("span", "", "Certificate"), element("span", "status", certificate.status));
    const details = element("div");
    details.append(element("h3", "", certificate.name), element("p", "small", certificate.issuer));
    if (certificate.status === "Completed" && certificate.completedDate) {
      details.append(element("p", "small", "Completed " + certificate.completedDate));
    }
    const progress = certificate.status === "Completed" ? 100 :
      Math.max(0, Math.min(100, Number(certificate.progress) || 0));
    const progressArea = element("div", "certification-progress");
    const label = element("label", "", "Progress ");
    label.htmlFor = "cert-" + index;
    label.append(element("span", "", progress + "%"));
    const bar = element("progress");
    bar.id = label.htmlFor;
    bar.max = 100;
    bar.value = progress;
    bar.textContent = progress + "%";
    progressArea.append(label, bar);
    const credential = externalLink(certificate.credentialUrl, "View certificate", "project-link");
    if (certificate.credentialUrl && credential) progressArea.append(credential);
    card.append(top, details, progressArea);
    item.append(card);
    list.append(item);
  });
}

function renderProjects(projects) {
  const list = document.getElementById("project-list");
  list.replaceChildren();
  projects.forEach((project, index) => {
    const item = element("li");
    const card = element("article", "color-card " + cardColors[index % 3] + " project-card");
    const preview = element("div", "project-preview");
    const image = element("img");
    image.src = project.image;
    image.alt = project.imageAlt || project.title + " concept illustration";
    image.width = 640;
    image.height = 480;
    image.loading = "lazy";
    preview.append(image, element("span", "status", project.status));
    const details = element("div", "project-details");
    details.append(
      element("p", "project-type", project.type),
      element("h3", "", project.title),
      element("p", "small", project.description)
    );
    const tags = element("ul", "tags");
    project.tech.forEach(technology => tags.append(element("li", "", technology)));
    details.append(tags);
    if (project.url) {
      const link = externalLink(project.url, project.linkLabel || "View project", "project-link");
      if (link) details.append(link);
    }
    card.append(preview, details);
    item.append(card);
    list.append(item);
  });
}

renderTimeline("work-history", portfolioContent.experience);
renderTimeline("education-list", portfolioContent.education, true);
renderCertificates(portfolioContent.certifications);
renderProjects(portfolioContent.projects);

document.getElementById("year").textContent = new Date().getFullYear();
