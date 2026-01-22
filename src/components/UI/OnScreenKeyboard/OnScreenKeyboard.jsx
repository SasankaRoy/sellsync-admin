import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export const OnScreenKeyboard = ({Change, inputValue, layoutName = "default"}) => {
  const keyboardRef = useRef(null);

  // Sync keyboard input with physical keyboard input
  useEffect(() => {
    if (keyboardRef.current) {
      keyboardRef.current.setInput(inputValue);
    }
  }, [inputValue]);

  // Custom layouts for numeric input
  const numericLayout = {
    default: [
      "7 8 9",
      "4 5 6",
      "1 2 3",
      ". 0 {bksp}"
    ]
  };

  const display = {
    "{bksp}": "⌫",
    "{enter}": "Enter",
    "{space}": "Space",
    "{tab}": "Tab",
    "{lock}": "Caps Lock",
    "{shift}": "^ Shift",
  };

  // Determine which props to pass based on layout
  const keyboardProps = layoutName === "numeric" 
    ? {
        layout: numericLayout,
        layoutName: "default",
        display: display,
        buttonTheme: [
          {
            class: "hg-numeric-button",
            buttons: "0 1 2 3 4 5 6 7 8 9 ."
          },
          {
            class: "hg-delete-button",
            buttons: "{bksp}"
          }
        ]
      }
    : {
        layoutName: "default",
        display: display
      };

      const handleonChange = (e)=>{
        console.log(e)
      }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
        className="fixed bottom-0 left-0 w-full p-4 bg-(--secondary-color) backdrop-blur-3xl z-[999]"
      >
        <Keyboard
          key={layoutName} // Force remount when layout changes
          keyboardRef={(r) => (keyboardRef.current = r)}
          onChange={Change}
          // onKeyPress={handleonChange}
          // onKeyPress={Change}
          {...keyboardProps}
          theme={"hg-theme-default myTheme1"}
        />
      </motion.div>
    </>
  );
};
