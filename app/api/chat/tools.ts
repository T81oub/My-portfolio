import { tool } from "ai";
import { z } from "zod";

export const getWorkExperiences = tool({
  description: 'Shows a list of my work experiences',
  parameters: z.object({}),  // empty object as no input needed
  execute: async () => {
     console.log('[Tool] getWorkExperiences called');
    return "Here are all the work experiences ! Don't hesitate to ask me more about them!";
    
  },
});

export const getProjects = tool({

  description: 'This tool will show a list of all projects',
  parameters: z.object({}),
  execute: async () => {
     console.log('[Tool] getProjects called');
    return "Here are all the projects ! Don't hesitate to ask me more about them!  ";
   
  },
});

export const getSkills = tool({
  description: 'This tool will show a list of all skills',
  parameters: z.object({}),
  execute: async () => {
     console.log('[Tool] getSkills called');
    return "Here are all the skills ! Don't hesitate to ask me more about them!";
    
  },
});


export const getEducation = tool({
  description: 'This tool will show a list of all education',
  parameters: z.object({}),
  execute: async () => {
     console.log('[Tool] getEducation called');
    return "Here are all the education ! Don't hesitate to ask me more about them!";
    
  },
});

export const getCV = tool({
  description: 'This tool will show my CV or Resume',
  parameters: z.object({}),
  execute: async () => {
     console.log('[Tool] getCV called');
    return "Here is my CV ! Don't hesitate to ask me more about it!";
    
  },
});

export const getAboutMe = tool({
  description: 'This tool will show a brief introduction about me',
  parameters: z.object({}),
  execute: async () => {
     console.log('[Tool] getAboutMe called');
    return "Here is a brief introduction about me ! Don't hesitate to ask me more about it!";
    
  },
});



export const getContact = tool({
  description: 'This tool will show my contact information',
  parameters: z.object({}),
  execute: async () => {
     console.log('[Tool] getContact called');
    return "Here is my contact information ! Don't hesitate to ask me more about it!";
    
  },
});

export const getHelp = tool({
  description: 'This tool will show a brief introduction about this portfolio',
  parameters: z.object({}),
  execute: async () => {
     console.log('[Tool] getHelp called');
    return "This is my portfolio. Feel free to ask me anything you'd like to know!";
    
  },
});




