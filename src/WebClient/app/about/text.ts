import { Experience } from '@dotcom/resume';

const AboutText = {
  card: {
    hello: {
      title: 'Hello from Grand Rapids!',
      text: "I'm Victor, your friendly neighborhood developer. Born, raised, and active in West Michigan, I have a passion for technology and the community. If you are local, let's connect and chat about tech, gaming, or anything else over a cup of coffee!",
      action: 'Contact me',
    },
    career: {
      title: 'Developer by day',
      text: (currentJob: Experience, yearsOfExperience: number): string => {
        return `I currently work professionally as a ${currentJob?.title} at ${currentJob?.company?.name}. With ${yearsOfExperience} years of experience, my specialties include web application development with .NET and React, cloud architecture with Azure, and DevOps automation for developer productivity.`;
      },
      action: 'View resume',
    },
    community: {
      title: 'Champion for community',
      text: 'I love the Grand Rapids developer community and am passionate about seeing it and its members grow. I am happy to help through speaking at user groups and conferences, conversing over a cup of coffee, or writing on my blog.',
      action: 'Read blog',
    },
    hobbies: {
      title: 'Gamer by night',
      text: 'Everyone needs playtime! My primary hobby is gaming, where I explore virtual worlds and emotional stories. You may also find me reading, cooking, or adventuring in the great outdoors.',
    },
    family: {
      title: 'Supported by family',
      text: 'I am happily married to my wife, Anna: my best friend, partner in crime, and biggest supporter. Together we have two wild and wonderful dogs, Maya and Gin, who keep our home lively and full of love.',
    },
  },
};

export default AboutText;
