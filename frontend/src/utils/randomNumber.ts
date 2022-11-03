const randomNumber = ({ max, min }: { max: number, min: number }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default randomNumber