import { useState } from "react"

import styles from "./index.module.css"
import { LeftArrowIcon, RightArrowIcon } from "../../assets/icons"

const personaArr = ["Empowered Expert", "Impactful Innovator", "Galvanized Go-Getter"]

const subText = {
  "Empowered Expert": ["Don’t quote me on this", "Dude, where’s my COI?", "Friends with benefits"],
  "Impactful Innovator": ["What can AI do for you?", "De-risky business", "Fax intolerant"],
  "Galvanized Go-Getter": ["From ABC to IPO", "Shop local, go public", "Grow forth"],
}

export default function PickPersona({ handlePersona }) {
  const [persona, setPersona] = useState({ persona: "Empowered Expert", subText: "" })

  const handleInputChange = (e) => {
    const {
      target: { name, value, checked },
    } = e
    setPersona((prevState) => ({
      ...prevState,
      [name]: value,
      [name === "persona" ? "subText" : ""]: "",
    }))
  }

  return (
    <div className={styles.container}>
      <p className={styles.info}>
        First, choose the Newfront differentiator that you relate to the most. Then select a
        accompanying playfull statement.
      </p>
      <div className={styles.personaGroup}>
        {personaArr.map((ele) => (
          <label
            key={ele.replace(" ", "_")}
            htmlFor={`persona_${ele.replace(" ", "_")}`}
            className={styles.personaRadio}
          >
            <input
              id={`persona_${ele.replace(" ", "_")}`}
              name='persona'
              value={ele || ""}
              type='radio'
              checked={ele === persona.persona}
              onChange={handleInputChange}
            />
            {ele}
          </label>
        ))}
      </div>
      <div className={styles.divider} />
      {persona?.persona ? (
        <>
          <div className={styles.subTextGroup}>
            {subText[persona.persona]?.map((ele) => (
              <label
                key={ele.replace(" ", "_")}
                htmlFor={`subText_${ele.replace(" ", "_")}`}
                className={styles.subTextRadio}
              >
                <input
                  id={`subText_${ele.replace(" ", "_")}`}
                  name='subText'
                  value={ele || ""}
                  type='radio'
                  checked={ele === persona.subText}
                  onChange={handleInputChange}
                />
                {ele}
              </label>
            ))}
          </div>
          <button
            className={styles.continue}
            disabled={!(persona.persona && persona.subText) || false}
            onClick={() => handlePersona(persona)}
          >
            Continue <RightArrowIcon />
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  )
}
