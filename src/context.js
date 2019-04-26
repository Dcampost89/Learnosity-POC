import React from 'react';

export const QuestionsContext = React.createContext({
  questions: [],
  item: null,
  acitivity: null,
  onSave: () => {}
});