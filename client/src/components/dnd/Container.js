import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { Card } from "./SortableCard";
const style = {
  width: "80%",
  minWidth: "200px",
};
export const Container = ({ files, setFiles }) => {
  {
    const [remove, setRemove] = useState(-1);
    useEffect(() => {
      if (remove >= 0) {
        if (files.length !== 1) {
          const tempArr = [...files];
          tempArr.splice(remove, 1);
          setFiles(tempArr);
        } else if (files.length === 1) {
          setFiles([]);
        }
      }
    }, [remove]);
    useEffect(() => {
      console.log("Files container");
      console.log(files);
    }, [files]);
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setFiles((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((card, index) => {
      const removeCard = () => {
        setRemove(index);
      };
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          removeCard={removeCard}
        />
      );
    }, []);
    return (
      <>
        <div style={style}>{files.map((card, i) => renderCard(card, i))}</div>
      </>
    );
  }
};
