const POSSIBLECHARACTERS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const createId = ():string => {

  let outputId: string = "";

  for (let i = 0; i < 16; i++) {

    const selectCharacterNumber = Math.floor(Math.random() * 62);

    outputId += POSSIBLECHARACTERS[selectCharacterNumber];

  }

  return outputId;

};