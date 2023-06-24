import styles from './index.module.css';
import {
    LogoPink,
    Empowered1,
    Empowered2,
    Empowered3,
    Impactful1,
    Impactful2,
    Impactful3,
    Galvanized1,
    Galvanized2,
    Galvanized3,
    CardPattern,
} from '../../assets/icons';

const personaSticker = {
    'Don’t quote me on this': Empowered2,
    'Dude, where’s my COI?': Empowered1,
    'Friends with benefits': Empowered3,
    'What can AI do for you?': Impactful1,
    'De-risky business': Impactful3,
    'Fax intolerant': Impactful2,
    'From ABC to IPO': Galvanized1,
    'Shop local, go public': Galvanized2,
    'Grow forth': Galvanized3,
};
export default function MainCard({ color, image, persona }) {
    const getBackgroundAndTextColor = () => {
        return color?.color
            ? {
                  backgroundColor: color.color,
                  color: color.color === '#f028b8' ? 'white' : '#152023',
              }
            : {
                  backgroundColor: '#f028b8',
                  color: 'white',
              };
    };

    const Sticker = () => {
        if (persona?.subText) {
            const PersonaText = personaSticker[persona?.subText];
            return <PersonaText className={styles.sticker + (color.isBlack ? ' black' : ' white')} />;
        }
        return <Impactful3 className={styles.sticker + (color.isBlack ? ' black' : ' white')} />;
    };

    return (
        <div
            style={{
                background: `${color.isBlack ? '#000' : '#fff'} url(${CardPattern})`,
                borderColor: color.color || '#f028b8',
            }}
            className={styles.cardContainer}
        >
            <div className={styles.cardTitle}>
                <LogoPink />
            </div>
            {/* <div className={styles.pattern}>
        <Pattern2 />
    </div>
    <div className={styles.patternBottom}>
        <Pattern3 />
    </div> */}
            {image ? (
                <div className={styles.repositionedImageContainer} style={{ background: color.color || '#f028b8' }}>
                    <img src={image} alt="" className={styles.repositionedImage} />
                </div>
            ) : (
                <div className={styles.rect} />
            )}
            <div className={styles.persona} style={getBackgroundAndTextColor()}>
                {persona?.persona || 'IMPACTFUL INNOVATOR'}
            </div>
            <Sticker />
            <div className={styles.footerText} style={{ color: color.isBlack ? '#fff' : '#121212' }}>
                <p>New brand,</p>
                <p>same sense of humor</p>
            </div>
        </div>
    );
}
