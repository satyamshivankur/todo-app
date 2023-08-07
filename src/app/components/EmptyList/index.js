import React from "react";

import Lottie from "react-lottie-player";
import emptyListLottie from "@/assets/lottie/empty-list-lottie.json";

import styles from './emptyList.module.css'

const EmptyList = () => {
  return (
    <div className={styles.emptyListContainer}>
      <Lottie
        loop
        animationData={emptyListLottie}
        play
        className={styles.emptyListLottie}
      />
      <div className={styles.emptyListMessage}>Seems like the list is empty. Add some tasks from above.</div>
    </div>
  );
};

export default EmptyList;
