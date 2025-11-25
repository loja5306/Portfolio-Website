import { useEffect, useState } from "react";

const StarBackground = () => {
  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );
    const newStars = [] as Array<StarProperties>;

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    return newStars;
  };

  const generateMeteors = () => {
    const numberOfMeteors = 3;
    const newMeteors = [] as Array<MeteorProperties>;

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 5,
        animationDuration: Math.random() * 3 + 3,
        angle: 200 + Math.random() * 30,
      });
    }

    return newMeteors;
  };

  const [stars, setStars] = useState<Array<StarProperties>>(() =>
    generateStars()
  );
  const [meteors] = useState<Array<MeteorProperties>>(() => generateMeteors());

  useEffect(() => {
    const handleResize = () => {
      setStars(generateStars());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => {
        return (
          <div
            key={meteor.id}
            className="meteor animate-meteor"
            style={
              {
                width: meteor.size * 50 + "px",
                height: meteor.size + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animationDelay: meteor.delay + "s",
                animationDuration: meteor.animationDuration + "s",
                "--angle": meteor.angle + "deg",
                opacity: 0,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
};

export default StarBackground;
