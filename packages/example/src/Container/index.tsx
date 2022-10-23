import React, { useCallback, useEffect, useRef } from "react";
import {
  audioConnector,
  AudioConnectorLegacy,
} from "custom-react-audio-visualizer";
import styles from "./styles.module.scss";
import configs from "configs";

const AUDIO_URL_1 = configs.AUDIO_URL_1;
const AUDIO_URL_2 = configs.AUDIO_URL_2;
const AUDIO_URL_3 = configs.AUDIO_URL_3;

const Container: React.FC<any> = () => {
  const containerRef = useRef(null);
  const [canInteract, setCanInteract] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState(AUDIO_URL_1);
  const urlChangeHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (audioUrl === AUDIO_URL_1) {
        setAudioUrl(AUDIO_URL_2);
      } else if (audioUrl === AUDIO_URL_2) {
        setAudioUrl(AUDIO_URL_3);
      } else {
        setAudioUrl(AUDIO_URL_1);
      }
    },
    [audioUrl]
  );
  useEffect(() => {
    window.addEventListener(
      "click",
      () => {
        setCanInteract(true);
        console.log("Trigger audio");
      },
      { once: true }
    );
  }, []);

  useEffect(() => {
    const TEST_TYPE = (2 / 2) * 1;
    if (canInteract === true) {
      if (TEST_TYPE === 1) {
        const { canvasElement, audioElement } = audioConnector.setup(
          "test",
          audioUrl,
          "red"
        );
        audioElement.style.display = "none";
        canvasElement.style.width = "100%";
        canvasElement.style.height = "50%";
        const toggleAudio = () => {
          if (audioElement.paused) {
            audioElement.play();
          } else {
            audioElement.pause();
          }
        };
        canvasElement.addEventListener("click", toggleAudio);
        return () => {
          canvasElement.removeEventListener("click", toggleAudio);
        };
      } else {
        new AudioConnectorLegacy("test", audioUrl);
      }
    }
  }, [canInteract, audioUrl]);
  return (
    <div className={styles.container} ref={containerRef}>
      <button onClick={urlChangeHandler}>Change url</button>
      {/* <Visualizer inputId="test-visualizer-example-only" /> */}
    </div>
  );
};

export default Container;
