'use client';

import About from "@dotcom/components/home/about";
import { Divider, SelectTabData, SelectTabEvent, Tab, TabList, TabValue, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Apps32Regular, Briefcase32Filled, Briefcase32Regular, CodeBlock32Regular, DocumentSearch32Filled, DocumentSearch32Regular, Mail32Filled, Mail32Regular, Person32Filled, Person32Regular } from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalL),
  },
  divider: {
    ...shorthands.margin(tokens.spacingVerticalXXL, tokens.spacingHorizontalNone),
  }
});

export default function Home() {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = useState<TabValue>('about');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value); 
  };

  return (
    <main className={styles.main}>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect} selectTabOnFocus appearance='transparent' size='large'>
        <Tab id="About" icon={<Person32Regular/>} value="about">
          About
        </Tab>
        <Tab id="Resume" icon={<Briefcase32Regular />} value="resume" >
          Resume
        </Tab>
        <Tab id="Projects" icon={<Apps32Regular />} value="projects" disabled>
          Projects
        </Tab>
        <Tab id="Contact" icon={<Mail32Regular />} value="contact" disabled>
          Contact
        </Tab>
      </TabList>
      <div>
        {selectedValue === 'about' && <About />}
        {/* {selectedValue === 'resume' && <Resume />}
        {selectedValue === 'projects' && <Projects />} */}
      </div>

      {/* <Card id="about" appearance="subtle" className={styles.container}>
        <CardHeader className={styles.header}
          image={<Person32Regular />}
          header={<Text as="h2" className={styles.header}>About</Text>}
        />
        <About />
        </Card> */}

      <Divider appearance='subtle' inset className={styles.divider} />
    </main>
  );
}
