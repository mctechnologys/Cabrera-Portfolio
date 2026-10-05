# Updating the portfolio

Open `assets/js/content.js` in GitHub and click the pencil icon to edit it. Save your changes with **Commit changes**.

You can also ask me to update the site. For example: “Add my new job at [company]” or “Mark CompTIA A+ completed on [date].” Include the details you want displayed.

## Add a job

Copy an existing entry in the `experience` list. Add the new entry first, with a comma between entries.

```js
{
  "role": "Job title",
  "company": "Company name",
  "period": "Oct 2026 — Present",
  "location": "City, State",
  "points": [
    "Your first responsibility.",
    "Your second responsibility."
  ]
}
```

When you leave a job, change its period from “Present” to the month and year it ended. If your current job changes, update the introduction in `index.html` too.

## Complete a certificate

Find the certificate in `certifications`. Change its status to `"Completed"`, add the month and year, and add a credential link if you have one:

```js
{
  "name": "CompTIA A+",
  "issuer": "CompTIA",
  "status": "Completed",
  "progress": 100,
  "completedDate": "October 2026",
  "credentialUrl": ""
}
```

Completed certificates automatically display 100%. For an unfinished certificate, use `"In Progress"` and update `progress` from 0 to 100. Use `"Planned"` for something you have not started.

## Add a project

Copy an entry in `projects`, then change the title, description, technologies, image, status, and link. Put images in `assets/images/` and use a path such as `"./assets/images/my-project.png"`.

Use `imageAlt` to describe a new image. Use `linkLabel` to change the link text, for example `"View source"`. Leave `url` empty if there is no link yet.

## Other changes

- Introduction, skills, and contact links: `index.html`.
- Colors and layouts: `assets/css/styles.css`.
- Education: the `education` list in `assets/js/content.js`.

Open `index.html` in a browser to check your edits. Keep quotation marks around text and commas between list entries.
