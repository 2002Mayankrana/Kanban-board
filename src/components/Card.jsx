import React from "react";
import { BsExclamationSquareFill } from "react-icons/bs";
import "../styles/Card.css";

const Card = ({ id, title, tags, status }) => {
  return (
    <div className="container">
      <div className="cardHeading2" style={{ justifyContent: "space-between" }}>
        <span style={{ textTransform: "uppercase", color: "darkgrey" }}>
          {id}
        </span>

        <div className="image">
          <p>👨🏻‍💼</p>

          <div className="status"></div>
        </div>
      </div>

      <div className="title">
        <p>{title}</p>
      </div>

      <div className="tags">
        <div className="tag">
          <BsExclamationSquareFill />
        </div>
        {tags?.map((element, index) => {
          return (
            <div key={index} className="tag">
              <span>●</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
