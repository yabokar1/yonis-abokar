import { roles } from "../content"

const skills = [
  "TypeScript",
  "JavaScript",
  "Python",
  "C#",
  "React",
  "React Native",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
  "Docker",
  "AWS",
]

export default function ExperiencePage() {
  return (
    <div className="page narrow">
      <p className="kicker">Experience</p>
      <h1>Software Engineering</h1>
      <p className="lede">
        Honours Bachelor of Software Engineering, York University. AWS Certified Cloud
        Practitioner, 2024.
      </p>
      <ol className="timeline">
        {roles.map((role) => (
          <li key={`${role.org}-${role.period}`}>
            <p className="when">{role.period}</p>
            <div>
              <h2>{role.title}</h2>
              <p className="where">
                {role.org} · {role.place}
              </p>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <h2>Skills</h2>
      <ul className="skill-row">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}
