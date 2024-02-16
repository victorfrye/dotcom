'use client';

import '@dotcom/styles/globals.css';
import About from "@dotcom/components/home/about";
import Connect from "@dotcom/components/home/connect";
import { Divider } from '@fluentui/react-components';

export default function Home() {
  return (
    <>
      <About />

      <Divider appearance='subtle' inset/>

      <Connect />
    </>
  );
}
