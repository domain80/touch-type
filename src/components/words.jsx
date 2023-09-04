const Words = (props) => {
  return (
    <p className={`words  ${props.class}`}>
      {props.words.split(" ").map((word, index) => {
        if (word.length > 0) {
          if (!word.indexOf("/*0*/")) {
            return (
              <span key={Math.random()*10 + index + new Date().getTime().toString()} className="word wrong">
                {word.replace("/*0*/", "")}
              </span>
            );
          }
          return (
            <span key={Math.random()*10 + index + new Date().getTime().toString()} className="word">
              {word}
            </span>
          );
        } else {
          return <span key={new Date().getTime().toString()}></span>;
        }
      })}
    </p>
  );
};

export default Words;
