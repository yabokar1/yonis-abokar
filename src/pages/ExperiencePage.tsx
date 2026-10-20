import { otherSkills, primarySkills, roles } from "../content";

export default function ExperiencePage() {
  return (
    <article className="experience">
      <header className="study-header">
        <p className="eyebrow">Experience</p>
        <h1>Software engineering, with a contract in between.</h1>
        <p className="lede">
          Lassonde School of Engineering, York University. Honours Bachelor of Software Engineering.
          AWS Certified Cloud Practitioner, 2024. Co-author of the LearnedWMP demo at SIGMOD Companion
          2025.
        </p>
      </header>

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

      <section className="skills">
        <h2>Skills I will whiteboard</h2>
        <ul className="stack">
          {primarySkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <p className="also">
          Also used: {otherSkills.join(", ")}.
        </p>
      </section>

      <section className="publication">
        <h2>Publication</h2>
        <p>
          Shaikh Quader, Ghadeer Abuoda, Yonis Abokar, Marin Litoiu, and Manos Papagelis. “Demo of
          LearnedWMP: Workload Memory Prediction Using Deep Query Template Representations.” SIGMOD
          Companion 2025, Berlin.
        </p>
        <p>
          <a href="https://doi.org/10.1145/3722212.3725096" target="_blank" rel="noreferrer">
            doi.org/10.1145/3722212.3725096
          </a>
        </p>
      </section>
    </article>
  );
}
