import styles from "./AcademyCourseMarquee.module.css";

const splitIntoRows = (courses, rowCount) => (
  Array.from({ length: rowCount }, (_, rowIndex) => courses.filter((_, index) => index % rowCount === rowIndex))
);

export default function AcademyCourseMarquee({ courses }) {
  const rows = splitIntoRows(courses, 3);

  return (
    <section className={styles.section} aria-labelledby="academy-courses-title">
      <div className={styles.heading}>
        <h2 id="academy-courses-title">Where Beauty Becomes Your Art</h2>
      </div>

      <ul className={styles.accessibleList}>
        {courses.map((course) => <li key={course}>{course}</li>)}
      </ul>

      <div className={styles.rows} aria-hidden="true">
        {rows.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            <div className={`${styles.track} ${rowIndex % 2 === 1 ? styles.reverse : ""}`}>
              {[0, 1].map((copyIndex) => (
                <div className={styles.group} key={copyIndex}>
                  {row.map((course) => (
                    <span className={styles.course} key={`${copyIndex}-${course}`}>
                      {course}
                      <i aria-hidden="true" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
