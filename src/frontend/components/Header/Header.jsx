import React, { useCallback, useEffect, useState } from "react";
//import { IconMoon, IconSun } from "@tabler/icons-react";
//import {ActionIcon} from '@mantine/core';


const Header = () => {
  const storageKey = "theme-preference";

  //Determine initial theme preference
  const getThemePreference = () => {
    if (localStorage.getItem(storageKey)) {
      return localStorage.getItem(storageKey);
    }
    return window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
  };

  //State to manage the theme
  const [theme, setTheme] = useState(getThemePreference());

  //Reflect the theme preference in the DOM
  const reflectPreference = useCallback((newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    const toggleButton = document.querySelector("#theme-toggle");
    if (toggleButton) {
      toggleButton.setAttribute("aria-label", newTheme);
    }
  }, []);

  // Set theme preference in localStorage and update DOM
  const setPreference = useCallback(
    (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      reflectPreference(newTheme);
    },
    [reflectPreference]
  );

  //Toggle the theme
  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setPreference(newTheme);
  };
  //Sync with system changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");
    const handleChange = ({ matches }) => {
      const newTheme = matches ? "dark" : "light";
      setTheme(newTheme);
      setPreference(newTheme);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setPreference]);

  useEffect(() => {
    reflectPreference(theme);
  }, [theme, reflectPreference]);

  return (
    <header className='header'>
      <button id='theme-toggle' className='theme-toggle' title='Toggles light & dark' aria-label={theme} aria-live='polite' onClick={handleToggle}>
        <svg className='sun-and-moon' aria-hidden='true' width='24' height='24' viewBox='0 0 24 24'>
          <circle className='sun' cx='12' cy='12' r='6' mask='url(#moon-mask)' fill='currentColor' />
          <g className='sun-beams' stroke='currentColor'>
            <line x1='12' y1='1' x2='12' y2='3' />
            <line x1='12' y1='21' x2='12' y2='23' />
            <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
            <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
            <line x1='1' y1='12' x2='3' y2='12' />
            <line x1='21' y1='12' x2='23' y2='12' />
            <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
            <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
          </g>
          <mask className='moon' id='moon-mask'>
            <rect x='0' y='0' width='100%' height='100%' fill='white' />
            <circle cx='24' cy='10' r='6' fill='black' />
          </mask>
        </svg>
      </button>
    </header>
  );
};

export default Header;
