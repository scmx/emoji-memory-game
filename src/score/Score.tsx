import React from "react";
import { getScore } from ".";
import { useSelector } from "../store";
import styles from "./Score.module.css";

export const Score: React.FC = () => {
  const score = useSelector(getScore);
  return <div className={styles.score}>{score}</div>;
};
